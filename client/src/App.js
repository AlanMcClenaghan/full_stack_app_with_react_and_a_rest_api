import { Route, Routes } from "react-router-dom";

// Import Components
import Header from "./Components/Header";
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from "./Components/UserSignUp";
import UserSignOut from "./Components/UserSignOut";
import Courses from "./Components/Courses";
import CourseDetails from "./Components/CourseDetail";
import CreateCourse from "./Components/CreateCourse";
import UpdateCourse from "./Components/UpdateCourse";
import UnhandledError from "./Components/UnhandledError";
import PrivateRoute from "./Components/PrivateRoute";
import NotFound from "./Components/NotFound"
import Forbidden from "./Components/Forbidden"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />} />
        <Route path="/signin" element={<UserSignIn />} />
        <Route path="/signup" element={<UserSignUp />} />
        <Route path="/signout" element={<UserSignOut />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route element={<PrivateRoute />}>
          <Route path="/courses/create" element={<CreateCourse />} />
          <Route path="/courses/:id/update" element={<UpdateCourse />} />
        </Route>
        <Route path="/error" element={<UnhandledError />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;