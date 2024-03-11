import { useEffect, useState } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
    .then(response => response.json())
    .then(responseData => setCourses(responseData))
    .catch(error => console.log("Error fetching and parsing date", error));
  }, []);
  return (
    <ul>
      {courses.map(course => (
        <li key={course.id}>{course.title}</li>
      ))}
    </ul>
  );
}

export default App;