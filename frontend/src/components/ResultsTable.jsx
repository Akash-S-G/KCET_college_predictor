import React from 'react';

function ResultsTable({ data, columns }) {
  if (!data || data.length === 0) return <div style={{color:'#888'}}>No results to display.</div>;
  return (
    <table className="results-table">
      <thead>
        <tr>
          {columns.map(col => <th key={col}>{col}</th>)}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {columns.map(col => <td key={col}>{row[col]}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ResultsTable; 