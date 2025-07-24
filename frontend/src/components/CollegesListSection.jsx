import React from 'react';
import Section from './Section';
import ResultsTable from './ResultsTable';

function CollegesListSection({ predictResults }) {
  return (
    <Section title="List of Colleges in which you can expect a seat:">
      <ResultsTable data={predictResults} columns={['Branch', 'College', 'Location', 'CETCode', 'Cutoff']} />
    </Section>
  );
}

export default CollegesListSection; 