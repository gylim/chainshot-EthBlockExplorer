import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import useInterval from 'use-interval';
import {Navbar, Nav, NavDropdown, Form, Row, Col, Button, Badge} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import axios from 'axios';

function App() {
  const [network, setNetwork] = useState("Mainnet");
  const [gasPrice, setGasPrice] = useState(0);
  const [input, setInput] = useState('');
  const server = "http://localhost:3042";
  let navigate = useNavigate();

  async function useMainnet() {
    const res = await axios.post(`${server}/mainnet`);
  }
  async function useGoerli() {
    const res = await axios.post(`${server}/goerli`);
  }
  async function useRinkeby() {
    const res = await axios.post(`${server}/rinkeby`);
  }
  function networkChange(e) {
    setNetwork(e);
  }

  async function estGasPrice() {
    const res = await axios.get(`${server}/blockWtxn`);
    const txns = res.data.blockTxn.transactions;
    console.log(txns[0].gasPrice.hex);
    const avgGas = txns.reduce((acc, curr) => acc + parseInt(curr.gasPrice.hex, 16),0) / txns.length
    setGasPrice(Math.trunc(avgGas/10**9));
  }

  function search(input) {
    if (input.substr(0,2) === "0x") {
      if (input.length > 42) {
        navigate('/tx/' + input);
      } else {
        navigate('/address/' + input);
      }
    } else {
      navigate('/block/' + input);
    }
  }

  useInterval(() => {
    estGasPrice();
  }, 15000)

  return (
    <div className="App">
      <Nav variant="pills" defaultActiveKey="home" bg="light">
        <Navbar.Brand>Ethereum Explorer</Navbar.Brand>
        <LinkContainer to="/">
          <Nav.Link eventKey="home">Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/block">
          <Nav.Link eventKey="block">Blocks</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/tx">
          <Nav.Link eventKey="txn">Transactions</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/address">
          <Nav.Link eventKey="address">Addresses</Nav.Link>
        </LinkContainer>
        <NavDropdown title={network} id="basic-nav-dropdown" onSelect={networkChange}>
          <NavDropdown.Item eventKey="Mainnet" onClick={useMainnet}>Mainnet</NavDropdown.Item>
          <NavDropdown.Item eventKey="Goerli" onClick={useGoerli}>Goerli</NavDropdown.Item>
          <NavDropdown.Item eventKey="Rinkeby" onClick={useRinkeby}>Rinkeby</NavDropdown.Item>
        </NavDropdown>
        <Navbar.Brand> Gas: <Badge bg='secondary'>{gasPrice} gwei</Badge>{' '}</Navbar.Brand>
      </Nav>
      <Form className='search-bar'>
        <Form.Group as={Row} className="mb-3" controlId='search-field'>
          <Form.Label column xs="auto">Search</Form.Label>
          <Col sm={6}>
            <Form.Control type="text" placeholder="by Address/Txn Hash/Block"
              onChange={e => setInput(e.target.value)}>
            </Form.Control>
          </Col>
          <Col sm={2}>
            <Button variant="outline-primary" type="button" onClick={() => search(input)}
            >Search</Button>
          </Col>
        </Form.Group>
      </Form>
      <Outlet />
    </div>
  );
}

export default App;
