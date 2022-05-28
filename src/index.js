import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Home from "./components/home";
import Block from "./components/block";
import BlockNum from "./components/blockNum";
import Address from "./components/address";
import AddHash from "./components/addHash";
import Transaction from './components/transaction';
import TxHash from './components/txHash';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />}>
                <Route index element={<Home />} />
                <Route path="block" element={<Block />}>
                    <Route path=":blockNum" element={<BlockNum />} />
                </Route>
                <Route path="tx" element={<Transaction />}>
                    <Route path=":txHash" element={<TxHash />} />
                </Route>
                <Route path="address" element={<Address />}>
                    <Route path=":addHash" element={<AddHash />} />
                </Route>
                <Route path="*" element={
                    <div style={{ padding: "1rem" }}>
                        <p>No Block/Address/Transaction matching your search!</p>
                    </div>}
                />
            </Route>
        </Routes>
    </Router>
);
