/**
 * Amr Bogura — Healthcare Facility Seeder (Node.js ESM)
 * Reads structured healthcare JSON data from amr-bogura-data/healthcare/
 * Validates, deduplicates, and generates data quality reports.
 */

import fs from 'fs';
import path from 'path';

export function loadHealthcareFiles(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.error(`Directory not found: ${dirPath}`);
    return [];
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.json') && !f.includes('report') && !f.includes('reference'));
  const allFacilities = [];
  const seenIds = new Set();

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    try {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const parsed = JSON.parse(content);

      if (Array.isArray(parsed.data)) {
        console.log(`Loaded [${file}]: ${parsed.data.length} records`);
        for (const item of parsed.data) {
          if (!seenIds.has(item.id)) {
            seenIds.add(item.id);
            allFacilities.push(item);
          } else {
            console.warn(`Duplicate id skipped: ${item.id} in ${file}`);
          }
        }
      }
    } catch (err) {
      console.error(`Failed to parse ${file}: ${err.message}`);
    }
  }

  return allFacilities;
}

export function generateQualityReport(facilities) {
  const byUpazila = {};
  const byCategory = {};
  let verified = 0;
  let partiallyVerified = 0;
  let unverified = 0;
  let missingCoords = 0;
  let missingPhones = 0;
  let missingImages = 0;

  for (const f of facilities) {
    byUpazila[f.upazila] = (byUpazila[f.upazila] || 0) + 1;
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;

    if (f.verification_status === 'verified') verified++;
    else if (f.verification_status === 'partially_verified') partiallyVerified++;
    else unverified++;

    if (f.latitude === null || f.longitude === null) missingCoords++;
    if (!f.phone || f.phone.length === 0) missingPhones++;
    if (!f.image_url) missingImages++;
  }

  return {
    total_facilities: facilities.length,
    upazilas_covered: Object.keys(byUpazila).length,
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
      missing_images: missingImages
    }
  };
}

async function run() {
  const dataDir = path.join(process.cwd(), 'amr-bogura-data', 'healthcare');
  console.log(`\n========================================`);
  console.log(`Amr Bogura — Healthcare Data Seeder`);
  console.log(`Directory: ${dataDir}`);
  console.log(`========================================\n`);

  const facilities = loadHealthcareFiles(dataDir);
  console.log(`\nTotal unique facilities collected: ${facilities.length}`);

  const report = generateQualityReport(facilities);
  console.log('\n--- Quality & Coverage Report ---');
  console.log(JSON.stringify(report, null, 2));

  // Save quality report file
  const reportPath = path.join(dataDir, 'data-quality-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\nSaved quality report to: ${reportPath}`);
}

run().catch(console.error);

