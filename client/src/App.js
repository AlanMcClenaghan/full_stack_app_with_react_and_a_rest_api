import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "./context/UserContext";

import Header from "./Components/Header";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import UserSignOut from "./Components/UserSignOut";
import Courses from "./Components/Courses";
import CourseDetails from "./Components/CourseDetail";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import Error from "./Components/error";

function App() {
  const [user, setUser] = useState([]);

  return (
    <UserContext.Provider value={{user}}>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/courses/create" element={<CreateCourse />} />
        <Route path="/courses/:id/update" element={<UpdateCourse />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="signin" element={<UserSignIn />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="signout" element={<UserSignOut />} />
        <Route path="error" element={<Error />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;