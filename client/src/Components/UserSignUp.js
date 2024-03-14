import { useContext, useRef, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

import UserContext from "../context/UserContext";

const UserSignUp = () => {
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

        console.log("user: " + user.firstName + " " + user.lastName);
        console.log("user: " + user.emailAddress + " " + user.password);

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset:utf-8"
            },
            body: JSON.stringify(user)
        }

        console.log("fetchOptions: " + fetchOptions.method);
        console.log("fetchOptions: " + fetchOptions.headers["Content-Type"]);
        console.log("fetchOptions: " + fetchOptions.body);

        
        try {
            const response = await fetch("http://localhost:5000/api/users", fetchOptions);

            if (response.status === 201) {
                console.log(`${user.firstName} ${user.firstName} is successfully set up!`);
            } else if (response.status === 400) {
                const data = await response.json();
                console.log("data: " + data.errors);
                setErrors(data.errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("errors: " + errors);
            navigate("/error")
        }
    }

    const handleCancel = e => {
        e.preventDefault();
        navigate("/");
    }

    return (
        <main>
            <div class="form--centered">
                <h2>Sign Up</h2>
                
                <form onSubmit={handleSubmit}>
                    <label for="firstName">First Name</label>
                    <input 
                        id="firstName" 
                        name="firstName" 
                        type="text" 
                        ref={firstName}/>
                    <label for="lastName">Last Name</label>
                    <input 
                        id="lastName" 
                        name="lastName" 
                        type="text" 
                        ref={lastName}/>
                    <label for="emailAddress">Email Address</label>
                    <input 
                        id="emailAddress" 
                        name="emailAddress" 
                        type="email" 
                        ref={emailAddress}/>
                    <label for="password">Password</label>
                    <input 
                        id="password" 
                        name="password" 
                        type="password" 
                        ref={password}/>
                    <button class="button" type="submit">Sign Up</button>
                    <button class="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    );
}

export default UserSignUp;