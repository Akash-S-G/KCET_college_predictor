import React, { useState, useEffect } from 'react';
import SidebarForm from './components/SidebarForm';
import CollegesListSection from './components/CollegesListSection';
import ChancesSection from './components/ChancesSection';
import PreferenceListSection from './components/PreferenceListSection';
import { BRANCHES, CATEGORIES, DISTRICTS } from './assets/constants';
import './App.css';

function App() {
  // State for all form fields and results
  const [rank, setRank] = useState('');
  const [branches, setBranches] = useState([]);
  const [category, setCategory] = useState('GM');
  const [districts, setDistricts] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [collegeOptions, setCollegeOptions] = useState([]);

  // State for results and loading/error
  const [predictResults, setPredictResults] = useState([]);
  const [chancesResults, setChancesResults] = useState([]);
  const [preferenceResults, setPreferenceResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all college names for the Preferred Colleges dropdown
  useEffect(() => {
    fetch('http://localhost:8000/colleges')
      .then(res => res.json())
      .then(data => {
        // Get unique college names and sort them
        const names = Array.from(new Set(data.map(row => row.College))).sort();
        setCollegeOptions(names);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setPredictResults([]);
    setChancesResults([]);
    setPreferenceResults([]);
    try {
      // 1. Get list of colleges where you can expect a seat
      const predictRes = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rank: Number(rank),
          branches: branches.map(b => b.value),
          category,
          districts: districts.map(d => d.value)
        })
      });
      const predictData = await predictRes.json();
      setPredictResults(predictData);

      // 2. Get chances for preferred colleges (if any selected)
      if (colleges.length > 0) {
        const chancesRes = await fetch('http://localhost:8000/chances', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            rank: Number(rank),
            branches: branches.map(b => b.value),
            category,
            colleges: colleges.map(c => c.value)
          })
        });
        const chancesData = await chancesRes.json();
        setChancesResults(chancesData);
      }

      // 3. Get the option entry/preference list
      const prefRes = await fetch('http://localhost:8000/preference-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          branches: branches.map(b => b.value),
          category,
          districts: districts.map(d => d.value)
        })
      });
      const prefData = await prefRes.json();
      setPreferenceResults(prefData);
    } catch (err) {
      setError('Failed to fetch results. Please check your backend connection.');
    }
    setLoading(false);
  };

  // Prepare options for react-select
  const branchOptions = BRANCHES.map(b => ({ value: b, label: b }));
  const districtOptions = DISTRICTS.map(d => ({ value: d, label: d }));
  const collegeSelectOptions = collegeOptions.map(c => ({ value: c, label: c }));

  return (
    <div className="kcet-root-layout">
      {loading && <div className="loading-overlay">Loading...</div>}
      <SidebarForm
        rank={rank} setRank={setRank}
        branches={branches} setBranches={setBranches} branchOptions={branchOptions}
        category={category} setCategory={setCategory} categoryOptions={CATEGORIES}
        districts={districts} setDistricts={setDistricts} districtOptions={districtOptions}
        colleges={colleges} setColleges={setColleges} collegeOptions={collegeSelectOptions}
        loading={loading} error={error} onSubmit={handleSubmit}
      />
      <main className="kcet-main-content">
        <h1 className="kcet-main-title">KCET College Predictor</h1>
        <CollegesListSection predictResults={predictResults} />
        <ChancesSection chancesResults={chancesResults} />
        <PreferenceListSection preferenceResults={preferenceResults} />
      </main>
    </div>
  );
}

export default App; 