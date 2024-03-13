import { Link } from "react-router-dom";

const UserSignIn = () => {
    return (
        <main>
            <div class="form--centered">
                <h2>Sign In</h2>
                
                <form>
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" value="" />
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" value="" />
                    <button class="button" type="submit">Sign In</button><button class="button button-secondary" onclick="event.preventDefault(); location.href='/';">Cancel</button>
                </form>
                <p>Don't have a user account? Click here to <Link href="sign-up.html">sign up</Link>!</p>
                
            </div>
        </main>
    );
}

export default UserSignIn;