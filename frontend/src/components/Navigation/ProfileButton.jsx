import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session.js";
import LoginFormModal from "../LoginFormModal/LoginFormModal.jsx";
import SignupFormModal from "../SignupFormModal/SignupFormModal.jsx";
import OpenModalMenuItem from "./OpenModalMenuItem.jsx";
import { useNavigate } from "react-router-dom";
import "./ProfileButton.css";
import { GiHamburgerMenu } from "react-icons/gi";

function ProfileButton({ user }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    navigate('/');
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button className="profile-button" onClick={toggleMenu}>
        <GiHamburgerMenu className="menu-button-icon" size={22} />
        <FaUserCircle className="profile-button-icon" size={22} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="hello-user">Hello, {user.firstName}</li>
            <li className="user-email">{user.email}</li>
            <li
                className="manage-spot-button"
                onClick={() => navigate(`/spots/current`)}
              >
                Manage Spots
            </li>
            <li>
              <button 
                className="logout-button" 
                onClick={logout}
              >
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
