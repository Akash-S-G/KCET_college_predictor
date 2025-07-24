import React from 'react';

function ChancesSection({ chancesResults }) {
  if (!chancesResults || chancesResults.length === 0) return null;
  return (
    <div className="kcet-section">
      <div className="kcet-section-header">Check your chances of getting into the preferred colleges:</div>
      <div className="kcet-dots" />
      {chancesResults.map((college, idx) => (
        <div key={college.college} style={{marginBottom: 24}}>
          <h3 style={{marginTop: 16, marginBottom: 8}}>{college.college}</h3>
          <table className="results-table">
            <thead>
              <tr>
                <th>Branch</th>
                <th>Status</th>
                <th>Cutoff</th>
                <th>Chances</th>
                <th>Difference</th>
              </tr>
            </thead>
            <tbody>
              {college.branches.map((b, i) => (
                <tr key={i}>
                  <td>{b.Branch}</td>
                  <td>{b.status === 'ok' ? 'Available' : b.status.replace(/_/g, ' ')}</td>
                  <td>{b.Cutoff || '-'}</td>
                  <td>{b.Chances || '-'}</td>
                  <td>{b.Difference !== undefined ? b.Difference : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ChancesSection; 