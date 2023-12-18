import React from 'react';
import { Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      {/* I am a sidebar */}
      <div className="sidebar-links">
        {/* <Container>
          <LinkContainer to="/get-documents">
            <p>get document is here</p>
          </LinkContainer>
        </Container> */}
        <div className="link">
          <Link to="/reports">Звіти</Link>
        </div>
        <div className="link">
          <Link to="/get-documents">Отримати дані по документу</Link>
        </div>
        <div className="link">
          <Link to="/add-documents">Загрузити дані з документу</Link>
        </div>
        <div className="link">
          <Link to="/get-last-documents">
            Отримати останні дані по документу
          </Link>
        </div>
        <div className="link">
          <Link to="/get-route-sheet">Отримати дані по маршрутному листу</Link>
        </div>
        <div className="link">
          <Link to="/add-route-sheet">Загрузити дані по маршрутному листу</Link>
        </div>
        <div className="link">
          <Link to="/get-last-route-sheet">Отримати останні дані по листу</Link>
        </div>
        <div className="link">
          <Link to="/allparts">Get all parts</Link>
        </div>

        <div className="link">
          {' '}
          <Link to="/">Login</Link>
        </div>
        <div className="link">
          <Link to="/parse-excel">Parse excel</Link>
        </div>

        {/* <p>Link 3</p> */}
      </div>
    </div>
  );
}

export default Sidebar;
