import React, {useState} from 'react';
import useInterval from 'use-interval';
import {Card, Spinner} from 'react-bootstrap';
import axios from 'axios';

export default function Home() {
    const [blocks, setBlocks] = useState([]);
    const server = "http://localhost:3042";

    async function getlatestBlock() {
        const res = await axios.get(`${server}/block`);
        if (blocks[0] === res.data.block) {
            return;
        } else if (blocks.length >= 0 && blocks.length < 10) {
            setBlocks(prevBlocks => ([res.data.block, ...prevBlocks]));
        } else if (blocks.length === 10) {
            setBlocks(prevBlocks => {
            prevBlocks.pop();
            return [res.data.block, ...prevBlocks]
            });
        }
    }

    useInterval(() => {
      getlatestBlock();
    }, 15000)

    let blockArr = blocks.length ? blocks.map((block, idx) => (
        <Card 
        bg={idx === 0 ? 'primary' : 'light'} 
        text={idx === 0 ? 'light' : 'dark'} 
        className='mb-2'>
          <Card.Header># {block.number}</Card.Header>
          <Card.Body>
            <Card.Title>Miner {block.miner}</Card.Title>
            <Card.Text>{(() => {
                    let s = new Date(block.timestamp*1000);
                    s = Date.now() - s;
                    return Math.floor(s / 1000);
                    })()} seconds ago</Card.Text>
            <Card.Text>{block.transactions.length} txns</Card.Text>
          </Card.Body>
        </Card>
      )) : <div><Spinner animation="border" /><span>...Loading</span></div>

    return(
        <div>
            <h1>Latest Blocks</h1>
            {blockArr}
        </div>
    )
}