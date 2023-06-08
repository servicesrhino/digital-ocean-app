import React, { useContext } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import './Header.css';

function Header() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, isAuth } = state;

  const navigate = useNavigate();

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');

    navigate('/');
  };
  return (
    <div className="header">
      {/* <Container>
        {userInfo ? (
          <div className="phone-header">{userInfo.phone}</div>
        ) : (
          <div className="phone-header">Пожалуйста, авторизуйтесь</div>
        )}

        {userInfo ? (
          <Button onClick={signoutHandler} bg="dark">
            Sign out
          </Button>
        ) : (
          <Button disabled onClick={signoutHandler} bg="dark">
            Sign out
          </Button>
        )}
      </Container> */}
      <div className="header__left">
        {/* <LinkContainer to="/">
          <Navbar.Brand>Rhino</Navbar.Brand>
        </LinkContainer> */}
        <div className="header-title">
          <h1>Rhino</h1>
        </div>
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
          alt=""
        /> */}
        <div className="header__search">
          {userInfo ? (
            <div className="phone-header">{userInfo.phone}</div>
          ) : (
            <div className="phone-header">Пожалуйста, авторизуйтесь</div>
          )}
          {/* SearchIcon */}
          {/* <SearchIcon /> */}

          {/* <input placeholder="Search" type="text" /> */}
        </div>
      </div>
      <div className="header__right">
        {userInfo ? (
          <Button onClick={signoutHandler} bg="dark">
            Sign out
          </Button>
        ) : (
          <Button disabled onClick={signoutHandler} bg="dark">
            Sign out
          </Button>
        )}
        {/* <HeaderOption Icon={HomeIcon} title="Home" />
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Jobs" />
        <HeaderOption Icon={ChatIcon} title="Messagin" />
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption avatar={true} title="me" onClick={logoutOfApp} /> */}
      </div>
    </div>
  );
}

export default Header;
