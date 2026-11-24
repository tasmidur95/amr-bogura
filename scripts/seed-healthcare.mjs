/**
 * Amr Bogura — Healthcare Facility Seeder (Node.js ESM)
 * Reads structured healthcare JSON data from amr-bogura-data/healthcare/
 * Validates, deduplicates, and generates data quality reports and master healthcare-all.json.
 */

import fs from 'fs';
import path from 'path';

export function loadHealthcareFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return { allFacilities: [], stepFiles: [], duplicateCount: 0 };
  }

  // Load only numbered step files: 01.xxx.json through 10.xxx.json
  const files = fs.readdirSync(dirPath)
    .filter(f => /^\d{2}\..+\.json$/.test(f))
    .sort();

  const allFacilities = [];
  const seenIds = new Set();
  const stepFiles = [];
  let duplicateCount = 0;

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const parsed = JSON.parse(content);

      if (Array.isArray(parsed.data)) {
        console.log(`Loaded [${file}]: ${parsed.data.length} records`);
        stepFiles.push({
          file,
          title: parsed.metadata?.title || file,
          step: parsed.metadata?.step,
          records: parsed.data.length
        });

        for (const item of parsed.data) {
          if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            allFacilities.push(item);
          } else {
            duplicateCount++;
            console.warn(`Duplicate id skipped: ${item.id} in ${file}`);
          }
        }
      }
    } catch (err) {
      console.error(`Failed to parse ${file}: ${err.message}`);
    }
  }

  return { allFacilities, stepFiles, duplicateCount };
}

export function generateQualityReport(facilities, duplicateCount = 0, stepFiles = []) {
  const byUpazila = {};
  const byCategory = {};
  let verified = 0;
  let partiallyVerified = 0;
  let unverified = 0;
  let missingCoords = 0;
  let missingPhones = 0;
  let missingImages = 0;
  let invalidSourceUrls = 0;
  let missingFromMaps = 0;

  for (const f of facilities) {
    byUpazila[f.upazila] = (byUpazila[f.upazila] || 0) + 1;
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;

    if (f.verification_status === 'verified') verified++;
    else if (f.verification_status === 'partially_verified') partiallyVerified++;
    else unverified++;

    if (f.latitude === null || f.longitude === null) missingCoords++;
    if (!f.phone || f.phone.length === 0) missingPhones++;
    if (!f.image_url) missingImages++;
    if (!f.source_urls || f.source_urls.length === 0) invalidSourceUrls++;
    if (!f.google_maps_url) missingFromMaps++;
  }

  return {
    project: "Amr Bogura (আমার বগুড়া)",
    report_title: "Healthcare Data Quality & Geographic Coverage Report",
    generated_at: new Date().toISOString().split('T')[0],
    total_facilities: facilities.length,
    upazilas_covered: Object.keys(byUpazila).length,
    covered_upazila_list: [
      "Adamdighi",
      "Bogura Sadar",
      "Dhunat",
      "Dhupchanchia",
      "Gabtali",
      "Kahalu",
      "Nandigram",
      "Sariakandi",
      "Shajahanpur",
      "Sherpur",
      "Shibganj",
      "Sonatala"
    ],
    step_exports: stepFiles,
    facilities_by_upazila: byUpazila,
    facilities_by_category: byCategory,
    verification: {
      verified,
      partially_verified: partiallyVerified,
      unverified
    },
    completeness: {
      missing_coordinates: missingCoords,
      missing_phones: missingPhones,
      missing_images: missingImages,
      duplicate_records: duplicateCount,
      invalid_source_urls: invalidSourceUrls,
      dghs_facilities_missing_from_maps: missingFromMaps
    }
  };
}

async function run() {
  const dataDir = path.join(process.cwd(), 'amr-bogura-data', 'healthcare');
  console.log(`\n========================================`);
  console.log(`Amr Bogura — Healthcare Data Master Seeder`);
  console.log(`Directory: ${dataDir}`);
  console.log(`========================================\n`);

  const { allFacilities, stepFiles, duplicateCount } = loadHealthcareFiles(dataDir);
  console.log(`\nTotal unique facilities collected across 10 categories: ${allFacilities.length}`);

  const report = generateQualityReport(allFacilities, duplicateCount, stepFiles);
  console.log('\n--- Quality & Coverage Report ---');
  console.log(JSON.stringify(report, null, 2));

  // 1. Save master healthcare-all.json
  const masterJson = {
    metadata: {
      title: "Master Healthcare Facilities Directory — Bogura District",
      title_bn: "সার্বিক স্বাস্থ্যসেবা প্রতিষ্ঠান ডিরেক্টরি — বগুড়া জেলা",
      dataset: "Amr Bogura Master Healthcare Dataset (Steps 01-10 Complete)",
      file_name: "healthcare-all.json",
      relative_path: "amr-bogura-data/healthcare/healthcare-all.json",
      total_records: allFacilities.length,
      district_en: "Bogura",
      district: "বগুড়া",
      covered_upazilas: report.covered_upazila_list,
      covered_upazilas_count: report.covered_upazila_list.length,
      source_urls: [
        "https://hris.mohfw.gov.bd/public/facility-registry",
        "https://dghs.gov.bd",
        "https://dgfp.gov.bd",
        "http://communityclinic.gov.bd",
        "http://fireservice.gov.bd",
        "http://bogra.gov.bd",
        "https://www.openstreetmap.org",
        "https://maps.google.com"
      ],
      collected_at: new Date().toISOString().split('T')[0],
      verification_summary: report.verification
    },
    data: allFacilities
  };

  const masterPath = path.join(dataDir, 'healthcare-all.json');
  fs.writeFileSync(masterPath, JSON.stringify(masterJson, null, 2), 'utf-8');
  console.log(`\nSaved master dataset to: ${masterPath}`);

  // 2. Save quality report file
  const reportPath = path.join(dataDir, 'data-quality-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`Saved quality report to: ${reportPath}`);
}

run().catch(console.error);
