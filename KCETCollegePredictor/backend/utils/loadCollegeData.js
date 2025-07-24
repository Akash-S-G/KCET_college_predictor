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