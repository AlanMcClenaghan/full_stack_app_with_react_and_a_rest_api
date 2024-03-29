import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { api } from '../utils/apiHelper';

import ErrorsDisplay from './ErrorsDisplay';

import UserContext from "../context/UserContext";

const UserSignUp = () => {

    // User Context
    const { actions } = useContext(UserContext);

    // Navigate hook
    const navigate = useNavigate();

    // State
    const firstName = useRef(null);
    const lastName = useRef(null);
    const emailAddress = useRef(null);
    const password  = useRef(null);
    const [errors, setErrors] = useState([]);

    // event handlers
    const handleSubmit = async e => {
        e.preventDefault();

        const user = {
            firstName: firstName.current.value,
            lastName: lastName.current.value,
            emailAddress: emailAddress.current.value,
            password: password.current.value,
        }

        try {
            const response = await api("/users", "POST", user);

            if (response.status === 201) {
                console.log(`${user.firstName} ${user.lastName} is successfully set up!`);
                await actions.signIn(user);
                navigate("/");
            } else if (response.status === 500) {
                navigate("/error");
            } else if (response.status === 404) {
                navigate("/notfound");
            } else if (response.status === 400) {
                const data = await response.json();
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("errors: " + errors);
            navigate("/error")
        }
    }

    // Cancel
    const handleCancel = e => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <ErrorsDisplay errors={errors}/>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        ref={firstName}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        ref={lastName}/>
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
                    <button className="button" type="submit">Sign Up</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
}

export default UserSignUp;