// GeoJSON FeatureCollection for Bogura District's 12 Upazilas
// Simplified polygon boundaries based on administrative maps & OpenStreetMap data
// Coordinates: [longitude, latitude] (GeoJSON standard)

export interface UpazilaGeoFeature {
  type: 'Feature';
  properties: {
    id: string;
    index: number;
    name: string;
    name_en: string;
    serial_bn: string;
    color: string;
    area_sqkm: number;
  };
  geometry: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}

export interface UpazilaGeoCollection {
  type: 'FeatureCollection';
  features: UpazilaGeoFeature[];
}

// Color palette for each upazila (dark-theme optimized, like the reference screenshot)
const UPAZILA_COLORS = [
  '#4f7cac', // Bogura Sadar - muted blue
  '#6b5b95', // Shibganj - purple
  '#44749d', // Sherpur - steel blue
  '#7d8c6e', // Sonatala - olive green
  '#5d7599', // Sariakandi - slate blue
  '#4a7c6f', // Gabtali - teal
  '#8b6f47', // Dhunat - brown
  '#5e8c61', // Nandigram - forest green
  '#7c6b5d', // Kahaloo - warm brown
  '#6e7b8b', // Dupchanchia - blue gray
  '#5a7d7c', // Adamdighi - dark teal
  '#7a6e5d', // Shajahanpur - sandy brown
];

export const boguraUpazilasGeoJson: UpazilaGeoCollection = {
  type: 'FeatureCollection',
  features: [
    // 0: Bogura Sadar (Center)
    {
      type: 'Feature',
      properties: {
        id: 'bogura-sadar',
        index: 0,
        name: 'বগুড়া সদর',
        name_en: 'Bogura Sadar',
        serial_bn: '০১',
        color: UPAZILA_COLORS[0],
        area_sqkm: 176.58,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.3100, 24.9050],
          [89.3600, 24.9100],
          [89.4100, 24.9000],
          [89.4350, 24.8700],
          [89.4300, 24.8300],
          [89.4100, 24.8000],
          [89.3800, 24.7800],
          [89.3400, 24.7850],
          [89.3100, 24.8000],
          [89.2900, 24.8300],
          [89.2850, 24.8600],
          [89.2950, 24.8900],
          [89.3100, 24.9050],
        ]],
      },
    },
    // 1: Shibganj (North)
    {
      type: 'Feature',
      properties: {
        id: 'shibganj',
        index: 1,
        name: 'শিবগঞ্জ',
        name_en: 'Shibganj',
        serial_bn: '০২',
        color: UPAZILA_COLORS[1],
        area_sqkm: 315.33,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.2500, 24.9800],
          [89.3000, 25.0100],
          [89.3600, 25.0200],
          [89.4100, 25.0100],
          [89.4350, 24.9800],
          [89.4350, 24.9400],
          [89.4100, 24.9000],
          [89.3600, 24.9100],
          [89.3100, 24.9050],
          [89.2800, 24.9200],
          [89.2500, 24.9500],
          [89.2500, 24.9800],
        ]],
      },
    },
    // 2: Sherpur (South of Sadar)
    {
      type: 'Feature',
      properties: {
        id: 'sherpur',
        index: 2,
        name: 'শেরপুর',
        name_en: 'Sherpur',
        serial_bn: '০৩',
        color: UPAZILA_COLORS[2],
        area_sqkm: 296.27,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.3100, 24.8000],
          [89.3800, 24.7800],
          [89.4100, 24.7600],
          [89.4000, 24.7200],
          [89.3800, 24.6800],
          [89.3400, 24.6600],
          [89.3000, 24.6600],
          [89.2600, 24.6800],
          [89.2400, 24.7100],
          [89.2500, 24.7400],
          [89.2700, 24.7700],
          [89.2900, 24.7900],
          [89.3100, 24.8000],
        ]],
      },
    },
    // 3: Sonatala (North-East)
    {
      type: 'Feature',
      properties: {
        id: 'sonatala',
        index: 3,
        name: 'সোনাতলা',
        name_en: 'Sonatala',
        serial_bn: '০৪',
        color: UPAZILA_COLORS[3],
        area_sqkm: 156.75,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.4350, 24.9800],
          [89.4800, 25.0000],
          [89.5300, 24.9900],
          [89.5500, 24.9600],
          [89.5400, 24.9200],
          [89.5100, 24.9000],
          [89.4700, 24.9000],
          [89.4350, 24.9400],
          [89.4350, 24.9800],
        ]],
      },
    },
    // 4: Sariakandi (East - Jamuna riverbank, largest by area)
    {
      type: 'Feature',
      properties: {
        id: 'sariakandi',
        index: 4,
        name: 'সারিয়াকান্দি',
        name_en: 'Sariakandi',
        serial_bn: '০৫',
        color: UPAZILA_COLORS[4],
        area_sqkm: 408.50,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.5100, 24.9000],
          [89.5400, 24.9200],
          [89.5500, 24.9600],
          [89.5800, 24.9500],
          [89.6200, 24.9200],
          [89.6400, 24.8800],
          [89.6300, 24.8300],
          [89.6100, 24.7900],
          [89.5800, 24.7600],
          [89.5500, 24.7500],
          [89.5200, 24.7700],
          [89.5000, 24.8000],
          [89.4800, 24.8400],
          [89.4700, 24.8700],
          [89.4700, 24.9000],
          [89.5100, 24.9000],
        ]],
      },
    },
    // 5: Gabtali (East-Central, between Shibganj/Sadar and Sariakandi)
    {
      type: 'Feature',
      properties: {
        id: 'gabtali',
        index: 5,
        name: 'গাবতলী',
        name_en: 'Gabtali',
        serial_bn: '০৬',
        color: UPAZILA_COLORS[5],
        area_sqkm: 239.60,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.4100, 24.9000],
          [89.4350, 24.9400],
          [89.4700, 24.9000],
          [89.5100, 24.9000],
          [89.5000, 24.8700],
          [89.4800, 24.8400],
          [89.4600, 24.8200],
          [89.4300, 24.8300],
          [89.4100, 24.8500],
          [89.4100, 24.9000],
        ]],
      },
    },
    // 6: Dhunat (South-East, Jamuna bank)
    {
      type: 'Feature',
      properties: {
        id: 'dhunat',
        index: 6,
        name: 'ধুনট',
        name_en: 'Dhunat',
        serial_bn: '০৭',
        color: UPAZILA_COLORS[6],
        area_sqkm: 247.73,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.4100, 24.8000],
          [89.4300, 24.8300],
          [89.4600, 24.8200],
          [89.4800, 24.8400],
          [89.5000, 24.8000],
          [89.5200, 24.7700],
          [89.5500, 24.7500],
          [89.5400, 24.7100],
          [89.5100, 24.6800],
          [89.4800, 24.6700],
          [89.4500, 24.6800],
          [89.4200, 24.7100],
          [89.4100, 24.7400],
          [89.4100, 24.7600],
          [89.4100, 24.8000],
        ]],
      },
    },
    // 7: Nandigram (South-West)
    {
      type: 'Feature',
      properties: {
        id: 'nandigram',
        index: 7,
        name: 'নন্দীগ্রাম',
        name_en: 'Nandigram',
        serial_bn: '০৮',
        color: UPAZILA_COLORS[7],
        area_sqkm: 265.47,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.1500, 24.7700],
          [89.1900, 24.7800],
          [89.2200, 24.7800],
          [89.2500, 24.7400],
          [89.2400, 24.7100],
          [89.2300, 24.6700],
          [89.2100, 24.6400],
          [89.1800, 24.6300],
          [89.1500, 24.6400],
          [89.1200, 24.6600],
          [89.1100, 24.6900],
          [89.1100, 24.7200],
          [89.1200, 24.7500],
          [89.1500, 24.7700],
        ]],
      },
    },
    // 8: Kahaloo (West-Central)
    {
      type: 'Feature',
      properties: {
        id: 'kahaloo',
        index: 8,
        name: 'কাহালু',
        name_en: 'Kahaloo',
        serial_bn: '০৯',
        color: UPAZILA_COLORS[8],
        area_sqkm: 240.42,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.1900, 24.8700],
          [89.2200, 24.8800],
          [89.2500, 24.8800],
          [89.2850, 24.8600],
          [89.2900, 24.8300],
          [89.2700, 24.7900],
          [89.2500, 24.7700],
          [89.2200, 24.7800],
          [89.1900, 24.7800],
          [89.1700, 24.8000],
          [89.1600, 24.8300],
          [89.1700, 24.8600],
          [89.1900, 24.8700],
        ]],
      },
    },
    // 9: Dupchanchia (North-West)
    {
      type: 'Feature',
      properties: {
        id: 'dupchanchia',
        index: 9,
        name: 'দুপচাঁচিয়া',
        name_en: 'Dupchanchia',
        serial_bn: '১০',
        color: UPAZILA_COLORS[9],
        area_sqkm: 162.45,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.1700, 24.9400],
          [89.2100, 24.9500],
          [89.2500, 24.9500],
          [89.2800, 24.9200],
          [89.2850, 24.8900],
          [89.2500, 24.8800],
          [89.2200, 24.8800],
          [89.1900, 24.8700],
          [89.1600, 24.8800],
          [89.1500, 24.9100],
          [89.1700, 24.9400],
        ]],
      },
    },
    // 10: Adamdighi (Far West)
    {
      type: 'Feature',
      properties: {
        id: 'adamdighi',
        index: 10,
        name: 'আদমদীঘি',
        name_en: 'Adamdighi',
        serial_bn: '১১',
        color: UPAZILA_COLORS[10],
        area_sqkm: 168.83,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.0600, 24.8800],
          [89.0900, 24.9000],
          [89.1200, 24.9100],
          [89.1500, 24.9100],
          [89.1600, 24.8800],
          [89.1700, 24.8600],
          [89.1600, 24.8300],
          [89.1500, 24.8000],
          [89.1200, 24.7900],
          [89.0900, 24.7900],
          [89.0600, 24.8100],
          [89.0500, 24.8400],
          [89.0600, 24.8800],
        ]],
      },
    },
    // 11: Shajahanpur (Central-South, between Sadar and Sherpur)
    {
      type: 'Feature',
      properties: {
        id: 'shajahanpur',
        index: 11,
        name: 'শাজাহানপুর',
        name_en: 'Shajahanpur',
        serial_bn: '১২',
        color: UPAZILA_COLORS[11],
        area_sqkm: 221.69,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [89.2900, 24.8300],
          [89.3400, 24.7850],
          [89.3800, 24.7800],
          [89.4100, 24.8000],
          [89.4100, 24.7600],
          [89.4000, 24.7200],
          [89.3800, 24.6800],
          [89.3400, 24.6600],
          [89.3000, 24.6600],
          [89.2600, 24.6800],
          [89.2500, 24.7100],
          [89.2500, 24.7400],
          [89.2700, 24.7700],
          [89.2700, 24.7900],
          [89.2900, 24.8300],
        ]],
      },
    },
  ],
};

// Utility: Get the centroid of a polygon for label positioning
export function getPolygonCentroid(coordinates: number[][]): [number, number] {
  let latSum = 0;
  let lngSum = 0;
  const n = coordinates.length - 1; // Exclude closing point
  for (let i = 0; i < n; i++) {
    lngSum += coordinates[i][0];
    latSum += coordinates[i][1];
  }
  return [latSum / n, lngSum / n];
}
