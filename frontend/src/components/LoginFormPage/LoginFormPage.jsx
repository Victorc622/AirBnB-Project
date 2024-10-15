import { useState } from "react";
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    if (sessionUser) return <Navigate to="/" replace={true} />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        return dispatch(sessionActions.login({ credential, password })).catch(
            async (res) => {
                const data = await res.json();
                if (data?.errors) setErrors(data.errors);
            }
        );
    };

    return (
      <div className="login-form-container">
        <div className="login-form-box">
          <h2>Login</h2>

          {errors.general && <p className="error-message">{errors.general}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />

            {errors.credential && <p className="error-message">{errors.credential}</p>}

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {errors.password && <p className="error-message">{errors.password}</p>}
            
            <button type="submit">Log In</button>
          </form>
        </div>
      </div>
    );
  }
  
  export default LoginFormPage;