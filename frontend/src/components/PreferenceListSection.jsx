import React from 'react';
import Section from './Section';
import ResultsTable from './ResultsTable';

function PreferenceListSection({ preferenceResults }) {
  return (
    <Section title="Option Entry / Preference List">
      <ResultsTable data={preferenceResults} columns={['Branch', 'College', 'Location', 'CETCode', 'Cutoff']} />
    </Section>
  );
}

export default PreferenceListSection; 