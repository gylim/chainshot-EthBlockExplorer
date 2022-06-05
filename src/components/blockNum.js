import React, {useState} from 'react';
import {Table, Spinner, ListGroup} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import { useParams, generatePath } from 'react-router-dom';
import axios from 'axios';

export default function BlockNum() {
    let params = useParams();
    const [block, setBlock] = useState(null);
    const server = "http://localhost:3042";

    async function getBlock(blockNum) {
        const res = await axios.get(`${server}/block/${blockNum}`);
        setBlock(res.data.block);
    }
    getBlock(params.blockNum);

    const txnLinks = block ? block.transactions.map((txn) => (
            <LinkContainer to={generatePath("/tx/*", {"*": txn})}>
                <ListGroup.Item action variant="light" eventKey="txn">{txn}</ListGroup.Item>
            </LinkContainer>
    )) : <span><Spinner animation="border" /><p>...Loading</p></span>;

    return(
        <div>
            {block ? <Table striped bordered hover>
                <tbody>
                <tr>
                    <td>Block Number:</td>
                    <td>{block.number}</td>
                </tr>
                <tr>
                    <td>Timestamp:</td>
                    <td>{(() => {
                    let s = new Date(block.timestamp*1000);
                    return s.toUTCString();
                    })()}</td>
                </tr>
                <tr>
                    <td>Mined by:</td>
                    <td>{block.miner}</td>
                </tr>
                <tr>
                    <td>Difficulty:</td>
                    <td>{parseInt(block._difficulty.hex, 16)}</td>
                </tr>
                <tr>
                    <td>Hash:</td>
                    <td>{block.hash}</td>
                </tr>
                <tr>
                    <td>Gas Limit:</td>
                    <td>{parseInt(block.gasLimit.hex, 16)}</td>
                </tr>
                <tr>
                    <td>Gas Used:</td>
                    <td>{parseInt(block.gasUsed.hex, 16)}</td>
                </tr>
                <tr>
                    <td>Transaction Count:</td>
                    <td>{block.transactions.length}</td>
                </tr>
                <tr>
                    <td>Transactions:</td>
                    <td><ListGroup>{txnLinks}</ListGroup></td>
                </tr>
                </tbody>
            </Table> : <div><Spinner animation="border" /><span>...Loading</span></div>}
        </div>     
    )
}