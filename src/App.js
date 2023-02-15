import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ParseExcel from './Components/ParseExcel';
import { Container, Navbar } from 'react-bootstrap';

function App() {
  return (
    <div>

    <header>
    <Navbar bg='dark' variant='dark' >
      <Container>
        <Navbar.Brand>Rhino</Navbar.Brand>
      </Container>
      </Navbar>
  </header>
    <main>
      <Container>
    <Routes>
      <Route path='/' element={ <Home /> } /> 
      <Route path='/parse-excel' element={ <ParseExcel /> } /> 

    </Routes>
    </Container>
    </main>

    </div>
    
  );
}

export default App;
