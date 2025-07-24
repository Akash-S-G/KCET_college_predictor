// Import required packages
import express from 'express';
import cors from 'cors';
import { getColleges } from './controllers/collegesController.js';
import { predictColleges } from './controllers/predictController.js';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.get('/colleges', getColleges);
app.post('/predict', predictColleges);
// TODO: Add chances and preference-list controllers

app.listen(PORT, () => {
  console.log(`KCET College Predictor backend running on port ${PORT}`);
}); 