import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const csvFilePath = path.resolve('../CET_Database_Final2020.csv');

export function loadCollegeData() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

function safeInt(val) {
  const n = parseInt(val, 10);
  return isNaN(n) ? 0 : n;
}

export async function predictColleges(req, res) {
  const { rank, branches, category, districts } = req.body;
  if (!rank || !branches || !category) {
    return res.status(400).json({ error: 'rank, branches, and category are required' });
  }
  try {
    const data = await loadCollegeData();
    const results = [];
    for (const branch of branches) {
      const filtered = data.filter(row =>
        row.Branch === branch &&
        safeInt(row[category]) !== 0 &&
        safeInt(rank) < safeInt(row[category]) &&
        (!districts || districts.length === 0 || districts.some(d => row.Location && row.Location.includes(d)))
      );
      for (const row of filtered) {
        results.push({
          Branch: row.Branch,
          College: row.College,
          Location: row.Location,
          CETCode: row.CETCode,
          Cutoff: safeInt(row[category])
        });
      }
    }
    results.sort((a, b) => a.Cutoff - b.Cutoff);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: 'Failed to process prediction' });
  }
} 