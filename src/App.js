import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import ParseExcel from './Components/ParseExcel';
import { Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useContext } from 'react';
import { Store } from './Store';

function App() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  return (
    <div>

    <header>
    <Navbar bg='dark' variant='dark' >
      <Container>
        <LinkContainer to='/'>
        <Navbar.Brand>Rhino parse excel</Navbar.Brand>
        </LinkContainer>

        {userInfo ? (
          <div className='phone-header'>{userInfo.phone}</div>
        ): (
          <div>Sign in</div>
        )}

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
