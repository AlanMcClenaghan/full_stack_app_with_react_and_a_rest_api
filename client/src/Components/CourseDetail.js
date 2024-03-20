import { useEffect, useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown'

import { api } from '../utils/apiHelper';

import UserContext from "../context/UserContext";

const CourseDetails = () => {

    // User Context
    const { authUser } = useContext(UserContext);

    // useNavigate hook
    const navigate = useNavigate();

    // Id from Params
    const {id} = useParams();

    // Set state variable for courses
    const [course, setCourse] = useState([]);
    const [user, setUser] = useState([]);

    // Loading Indicator
    // Add a loading indicator that displays each time the app fetches new data.
    const [loading, setLoading] = useState(false);

    // Get course
    useEffect(() => {   
        
        // API call that will handle the fetch requests to get courses
        const getCourse = async () => {    

        setLoading(true);

            try {
                const response = await api(`/courses/${id}`, "GET", null, authUser);

                if (response.status === 200) {
                    const responseData = await response.json();
                    setCourse(responseData);
                    setUser(responseData.user);
                    setLoading(false);
                } else if (response.status === 500) {
                    navigate("/error");
                } else if (response.status === 404) {
                    navigate("/notfound");
                } else {
                    throw new Error();
                }
    
            } catch (error) {
                console.log("Error fetching and parsing data", error);
                navigate("/error");
            }
        }
    
        getCourse(); 

        console.log(course);

    },[authUser,id,navigate]);

    // Delete Course handler
    const handleDelete = async e => {
        e.preventDefault(); 
    
        try {
            const response = await api(`/courses/${id}`, "DELETE", null, authUser);
            if (response.status === 204) {
                navigate("/");
            } else if (response.status === 403) {
                console.log("This is forbidden.");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.log("Error deleting course.", error);
            navigate("/error")
        }
    }

    return (
        
        <main>
            <div className="actions--bar">
                <div className="wrap">

                {
                    ( authUser?.id === user?.id ) 
                    ?   <>
                            <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                            <Link className="button" onClick={handleDelete}>Delete Course</Link>
                        </>
                    :   null
                }
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>

            {
                (loading) 
                ? <h1>Loading course...</h1>
                :
                <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {user?.firstName} {user?.lastName}</p>

                            <Markdown>{course.description}</Markdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                <Markdown>{course.materialsNeeded}</Markdown>
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
            }

        </main>
    );
}

export default CourseDetails;