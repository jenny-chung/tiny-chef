import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { clearCredentials } from '../slices/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Header = () => {

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // destroy cookie
      dispatch(clearCredentials()); // clear local storage
      navigate('/');
    } catch (error) {
      console.error(err);
    }
  }

  return (
    <header>
      <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
                <Navbar.Brand>
                  <img src='../assets/baker.png' alt=' ' loading='lazy' 
                    width="30"
                    height="30"
                    className="d-inline-block align-top"/>{' '}
                  tiny chef
                </Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                  { userInfo ? (
                    <>
                      <LinkContainer to='/'>
                        <Nav.Link>Home</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/recipes'>
                         <Nav.Link>My Recipes</Nav.Link>
                      </LinkContainer>
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>
                            <FaUser /> Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                          <FaSignOutAlt /> Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                  ) : (
                    <>
                      <LinkContainer to='/login'>
                        <Nav.Link><FaSignInAlt /> Log In</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to='/register'>
                        <Nav.Link><FaUser /> Register</Nav.Link>
                      </LinkContainer>
                    </>
                  ) }
               
                </Nav>
          </Navbar.Collapse>

        
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;