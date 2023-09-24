import { Container, Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Hero = () => {

  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <img 
            src='./baker.png'
            alt=' '
            loading='lazy' 
            width="30"
            height="30"/>
          <h1 className='text-center mb-4'>tiny chef</h1>
          <p className='text-center mb-4'>
            This is a MERN recipe app with authentication that stores a JWT in
            an HTTP-Only cookie. It also uses Redux Toolkit and the React
            Bootstrap library
          </p>
          <p className="text-muted">
            (Attribution:  <a href="https://www.flaticon.com/free-icons/male-chef" title="male chef icons">Chef icons created by Freepik - Flaticon</a>
            )
          </p>
          <div className='d-flex'>
            { userInfo ? (
            <>
            </>
            ) : (
              <>
              <LinkContainer to='/login'>
                <Button variant='customPrimary' className='me-3'>
                    Log In
                </Button>
              </LinkContainer>
              <LinkContainer to='/register'>
                <Button variant='customSecondary'>
                    Register
                </Button>
              </LinkContainer>
              </>
            )
          }
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Hero;