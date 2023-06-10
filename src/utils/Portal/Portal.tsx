import React from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.body;

export function Portal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    portalRoot,
  );
}
