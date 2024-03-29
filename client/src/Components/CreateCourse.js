import { useContext, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

import ErrorsDisplay from './ErrorsDisplay';

import { api } from '../utils/apiHelper';

import UserContext from "../context/UserContext";

const CreateCourse = () => {

    // User Context
    const { authUser } = useContext(UserContext);

    // Navigate hook
    const navigate = useNavigate();

    // State
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [errors, setErrors] = useState([]);

    // event handlers
    const handleSubmit = async e => {
        e.preventDefault();

        const course = {
            userId: authUser.id,
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
        }

        try {
            const response = await api("/courses", "POST", course, authUser);

            if (response.status === 201) {
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
            <div className="wrap">
                <h2>Create Course</h2>
                <ErrorsDisplay errors={errors}/>
                <form onSubmit={handleSubmit}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text" 
                                ref={courseTitle} />

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                                id="courseDescription" 
                                name="courseDescription"
                                ref={courseDescription}>
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input 
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                ref={estimatedTime}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                ref={materialsNeeded}>
                            </textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Create Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
            </div>
        </main>
    );
}

export default CreateCourse;