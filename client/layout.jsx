import React from 'react';

export const layout = ({content, footer}) => (
  <div className="layout">
    <main>
      {content}
      {footer}
    </main>
  </div>
)
