import { useContext, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import UserContext from '../context/UserContext';

const UserSignIn = () => {
    const { actions } = useContext(UserContext);
    console.log(actions);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);

    // State
    const emailAddress = useRef(null);
    const password  = useRef(null);
    const [errors, setErrors] = useState([]);

    // event handlers
    const handleSubmit = async e => {
        e.preventDefault();
        let from = '/';
        console.log("from: " + from)
        if (location.state) {
            from = location.state.from;
            console.log("from: " + from)
        }


        const credentials = {
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        try {
            const user = await actions.signIn(credentials);
            if (user) {
                navigate(from);
            } else {
                setErrors(["Sign-in was unsuccessful"])
            }
        } catch (error) {
            console.log("errors: " + errors);
            navigate("/error");
        }

    }

    const handleCancel = e => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
                <form onSubmit={handleSubmit}>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        ref={emailAddress}/>
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        ref={password}/>
                    <button className="button" type="submit">Sign In</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
                
            </div>
        </main>
    );
}

export default UserSignIn;