import React, {useState} from 'react';
import {Table, Spinner} from 'react-bootstrap';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function AddHash() {
    let params = useParams();
    const [account, setAccount] = useState(null);
    const server = "http://localhost:3042";

    async function getAccount(address) {
        const res = await axios.get(`${server}/address/${address}`);
        setAccount(res.data);
    }
    getAccount(params.addHash);

    return(
        <div>
            <h1>Address Details</h1>
            {account ? <Table striped bordered hover>
                <tbody>
                <tr>
                    <td>Balance:</td>
                    <td>{ethers.utils.formatEther(account.balance.hex).toString() + " ETH"}</td>
                </tr>
                <tr>
                    <td>Account Type:</td>
                    <td>{account.type === "0x" ? "Externally Owned Account" : "Smart Contract"}</td>
                </tr>
                <tr>
                    <td>Outgoing Transaction Count:</td>
                    <td>{account.txCt}</td>
                </tr>
                <tr>
                    <td>ENS Name:</td>
                    <td>{account.ens ? account.ens : "No ENS Name"}</td>
                </tr>
                </tbody>
            </Table> : <div><Spinner animation="border" /><span>...Loading</span></div>}
        </div>     
    )
}