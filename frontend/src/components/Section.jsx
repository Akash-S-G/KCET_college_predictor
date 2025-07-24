import React from 'react';

function Section({ title, children }) {
  return (
    <div className="kcet-section">
      <div className="kcet-section-header">{title}</div>
      <div className="kcet-dots" />
      {children}
    </div>
  );
}

export default Section; 