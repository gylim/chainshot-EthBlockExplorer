import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Transaction() {
    return (
        <div>
            <h1>Transaction Details</h1>
            <Outlet />
        </div>
    )
}