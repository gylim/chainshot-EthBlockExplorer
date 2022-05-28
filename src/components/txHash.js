import React, {useState} from 'react';
import {Table, Spinner} from 'react-bootstrap';
import { ethers } from 'ethers';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function TxHash() {
    let params = useParams();
    const [details, setDetails] = useState(null);
    const server = "http://localhost:3042";

    async function getTxn(txn) {
        const res = await axios.get(`${server}/tx/${txn}`);
        setDetails(res.data.txn);
    }
    getTxn(params.txHash);

    return(
    <div>
        {details ? 
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <td>Transaction Hash:</td>
                    <td>{details.hash}</td>
                </tr>
                <tr>
                    <td>Status:</td>
                    <td>{details.blockNumber ? "Success" : "Pending"}</td>
                </tr>
                <tr>
                    <td>Block:</td>
                    <td>{details.blockNumber} with {details.confirmations} Block Confirmations</td>
                </tr>
                <tr>
                    <td>From:</td>
                    <td>{details.from}</td>
                </tr>
                <tr>
                    <td>To:</td>
                    <td>{details.to === null ? `Contract ${details.creates} created` : details.to}</td>
                </tr>
                <tr>
                    <td>Value:</td>
                    <td>{ethers.utils.formatEther(details.value.hex).toString() + " Ether"}</td>
                </tr>
                <tr>
                    <td>Gas Price:</td>
                    <td>{ethers.utils.formatEther(details.gasPrice.hex).toString() + " Ether"}</td>
                </tr>
                </tbody>
            </Table> : <div><Spinner animation="border" /><span>...Loading</span></div>}
    </div>
    )
}