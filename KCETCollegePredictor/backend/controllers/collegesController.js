import { loadCollegeData } from '../utils/loadCollegeData.js';

export async function getColleges(req, res) {
  try {
    const data = await loadCollegeData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to load college data' });
  }
} 