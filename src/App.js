import React, {useState} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {Navbar, Nav, NavDropdown, Form, Row, Col, Button} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import axios from 'axios';

function App() {
  const [network, setNetwork] = useState("Mainnet");
  const [input, setInput] = useState('');
  const server = "http://localhost:3042";
  let navigate = useNavigate();

  async function useMainnet() {
    const res = await axios.post(`${server}/mainnet`);
    console.log(res);
  }
  async function useGoerli() {
    const res = await axios.post(`${server}/goerli`);
    console.log(res);
  }
  async function useRinkeby() {
    const res = await axios.post(`${server}/rinkeby`);
    console.log(res);
  }
  function networkChange(e) {
    setNetwork(e);
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

  return (
    <div className="App">
      <Nav fill variant="pills" defaultActiveKey="/" bg="light">
        <Navbar.Brand>Ethereum Explorer</Navbar.Brand>
        <LinkContainer to="/">
          <Nav.Link>Home</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/block">
          <Nav.Link>Blocks</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/tx">
          <Nav.Link>Transactions</Nav.Link>
        </LinkContainer>
        <LinkContainer to="/address">
          <Nav.Link>Addresses</Nav.Link>
        </LinkContainer>
        <NavDropdown title={network} id="basic-nav-dropdown" onSelect={networkChange}>
          <NavDropdown.Item eventKey="Mainnet" onClick={useMainnet}>Mainnet</NavDropdown.Item>
          <NavDropdown.Item eventKey="Goerli" onClick={useGoerli}>Goerli</NavDropdown.Item>
          <NavDropdown.Item eventKey="Rinkeby" onClick={useRinkeby}>Rinkeby</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Form>
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
