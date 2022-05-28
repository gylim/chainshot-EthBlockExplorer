import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Address () {
    return (
        <div>
            <h1>Address Details</h1>
            <Outlet />
        </div>
    )
}