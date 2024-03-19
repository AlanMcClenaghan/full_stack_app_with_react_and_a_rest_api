import { useEffect, useContext, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import ErrorsDisplay from './ErrorsDisplay';

import { api } from '../utils/apiHelper';

import UserContext from "../context/UserContext";

const UpdateCourse = () => {

    // User Context
    const { authUser } = useContext(UserContext);

    // useNavigate hook
    const navigate = useNavigate();

    // Id from Params
    const {id} = useParams();

    // Set state variable for courses and errors
    const courseTitle = useRef(null);
    const courseDescription = useRef(null);
    const estimatedTime = useRef(null);
    const materialsNeeded = useRef(null);
    const [course, setCourse] = useState([]);
    const [courseUpdate, setCourseUpdate] = useState([]);
    const [errors, setErrors] = useState([]);

    // Loading Indicator
    // Add a loading indicator that displays each time the app fetches new data.
    const [loading, setLoading] = useState(false);

    // API call that will handle the fetch requests to get courses
    const getCourse = async () => {    

        setLoading(true);

        try {
            await api(`/courses/${id}`, "GET", null, authUser)
            .then(response => response.json())
            .then(responseData => {
                setCourse(responseData)
                setLoading(false);
            })
        } catch (error) {
            console.log("Error fetching and parsing data", error);
            navigate("/error")
        }
    }

    // Get course
    useEffect(() => {         
        getCourse(); 
    },[]);

    // Update Course handler
    const handleUpdate = async e => {
        e.preventDefault(); 
        console.log("Update!");
        console.log(course);

       const courseUpdate = {
            title: courseTitle.current.value,
            description: courseDescription.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value
       }

       setCourseUpdate(courseUpdate);
    
        try {
            const response = await api(`/courses/${id}`, "PUT", courseUpdate, authUser)
            if (response.status === 204) {
                navigate(`/courses/${id}`);
            } else if (response.status === 400) {
                console.log("response: " + response);
                const data = await response.json();
                console.log("data: " + data.body);
                setErrors(data.errors);
                console.log("Errors: " + errors);
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("Error updating course.", error);
            navigate("/error")
        }
    }

    // Cancel
    const handleCancel = e => {
        e.preventDefault();
        navigate(`/courses/${id}`);
    }

    return (

        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <ErrorsDisplay errors={errors}/>
                {
                (loading) 
                ? <h1>Loading course...</h1>
                :
                <form onSubmit={handleUpdate}>
                    <div className="main--flex">
                        <div>
                            <label htmlFor="courseTitle">Course Title</label>
                            <input 
                                id="courseTitle" 
                                name="courseTitle" 
                                type="text"
                                defaultValue={course.title} 
                                ref={courseTitle}/>

                            <p>By {authUser.firstName} {authUser.lastName}</p>

                            <label htmlFor="courseDescription">Course Description</label>
                            <textarea 
                                id="courseDescription" 
                                name="courseDescription"
                                defaultValue={course.description}
                                ref={courseDescription}>
                            </textarea>
                        </div>
                        <div>
                            <label htmlFor="estimatedTime">Estimated Time</label>
                            <input
                                id="estimatedTime" 
                                name="estimatedTime" 
                                type="text" 
                                defaultValue={course.estimatedTime}
                                ref={estimatedTime}/>

                            <label htmlFor="materialsNeeded">Materials Needed</label>
                            <textarea 
                                id="materialsNeeded" 
                                name="materialsNeeded"
                                defaultValue={course.materialsNeeded}
                                ref={materialsNeeded}>
                            </textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button>
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </form>
                }
            </div>
        </main>
    );
}

export default UpdateCourse;