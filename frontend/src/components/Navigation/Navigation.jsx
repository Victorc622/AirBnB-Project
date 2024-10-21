import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const navigate = useNavigate();
  const sessionUser = useSelector(state => state.session.user);

  const handleClick = () => {
    navigate('/spots/new');
  }

  return (
    <div className='navigation-div'>
      <ul className='navigation-ul'>
        <li className='nav-logo'>
          <NavLink
            to='/'
            className='navigation-logo'
          >
            <img 
              src='/Images/Icon.jpg'
              className='navigation-logo'
            />
            FantasyStays
          </NavLink>
        </li>
        <div className='nav-button-div'>
          {sessionUser ? (
            <button
              onClick={handleClick}
              className='create-spot-button'
            >
              Create a New Spot
            </button>
          ) : (
            ''
          )}
          {isLoaded && (
            <li>
              <ProfileButton user={sessionUser} />
            </li>
          )}
        </div>
      </ul>
    </div>
  );
}

export default Navigation;