import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Block() {
  return (
    <div>
      <h1>Block Details</h1>
      <Outlet />
    </div>
  );
}