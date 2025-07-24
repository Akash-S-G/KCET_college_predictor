import React from 'react';
import Select from 'react-select';

function SidebarForm({
  rank, setRank,
  branches, setBranches, branchOptions,
  category, setCategory, categoryOptions,
  districts, setDistricts, districtOptions,
  colleges, setColleges, collegeOptions,
  loading, error, onSubmit
}) {
  return (
    <aside className="kcet-sidebar">
      <h2 className="kcet-sidebar-title">Enter the details here <span role="img" aria-label="point-down">👇</span></h2>
      <form onSubmit={onSubmit} className="kcet-form">
        <label>
          Enter your Rank*:
          <input type="number" value={rank} onChange={e => setRank(e.target.value)} required min={0} className="kcet-input" />
        </label>
        <label>
          Select preferred branch/branches:
          <Select
            isMulti
            options={branchOptions}
            value={branches}
            onChange={setBranches}
            classNamePrefix="kcet-select"
            placeholder="Select branches..."
            menuPlacement="bottom"
          />
        </label>
        <hr className="kcet-divider" />
        <label>
          Select Category:*
          <select value={category} onChange={e => setCategory(e.target.value)} required className="kcet-input" style={{ width: '100%' }}>
            {categoryOptions.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label>
          Select to filter by District:
          <Select
            isMulti
            options={districtOptions}
            value={districts}
            onChange={setDistricts}
            classNamePrefix="kcet-select"
            placeholder="Select districts..."
            menuPlacement="bottom"
          />
        </label>
        <label>
          Select Preferred College/Colleges:
          <Select
            isMulti
            options={collegeOptions}
            value={colleges}
            onChange={setColleges}
            classNamePrefix="kcet-select"
            placeholder="Select colleges..."
            menuPlacement="bottom"
          />
        </label>
        <button type="submit" className="kcet-btn-red" disabled={loading}>{loading ? 'Loading...' : 'Generate Option Entry / Preference List'}</button>
      </form>
      {error && <div style={{color: 'red', marginTop: 16}}>{error}</div>}
    </aside>
  );
}

export default SidebarForm; 