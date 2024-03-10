const express = require('express');
const router = express.Router();
const { asyncHandler } = require('./middleware/async-handler');
const {User, Course} = require('./models');
console.log("User: " + User);
console.log("Course: " + Course);
const { authenticateUser } = require('./middleware/auth-user');

/* A /api/users GET route that will return all properties and values 
for the currently authenticated User along with a 200 HTTP status code. */
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  console.log("req: " + req);
  console.log("res: " + res);
  const user = req.currentUser;
  console.log("User: " + user.id);
  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress
  });
}));

/* A /api/users POST route that will create a new user, 
set the Location header to "/", and return a 201 HTTP status code and no content. */
router.post('/users', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      console.log("Errors: " + errors);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

/* A /api/courses GET route that will return all courses 
including the User associated with each course and a 200 HTTP status code. */
router.get('/courses', asyncHandler(async (req, res) => {
  const courses = await Course.findAll(
    {include: [
      {
        model: User,
        as: 'user'
      }
    ]}
  );
  // console.log(courses.map(course => course.get({ plain: true })));
  res.status(200).json(courses);
}));

/* A /api/courses/:id GET route that will return the corresponding course 
including the User associated with that course and a 200 HTTP status code. */
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id,
    {include: [
      {
        model: User,
        as: 'user'
      }
    ]}
  );
  console.log(course);
  res.status(200).json(course);
}));

/* A /api/courses POST route that will create a new course, 
set the Location header to the URI for the newly created course, 
and return a 201 HTTP status code and no content. */
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  let course;
  console.log("Course: " + course);
  try {
    course = await Course.create(req.body);
    console.log("Course: " + course);
    res.status(201).location(`/courses/${course.id}`).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      console.log("Errors: " + errors);
      console.log("Course: " + course);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

/* A /api/courses/:id PUT route that will update the corresponding course 
and return a 204 HTTP status code and no content. */
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  let course;
  
  try {
    course = await Course.findByPk(req.params.id);
    // console.log("Course: " + course);
    // console.log("Course.userId: " + course.userId);
    // console.log("req.params.id: " + req.params.id);
    // console.log("req.currentUser.id: " + req.currentUser.id);

    if (course) {
      if (course.userId === req.currentUser.id) {
        await course.update(req.body);
        res.status(204).end();
      } else {
        res.status(403).end();
      }
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      // console.log("Course: " + course);
      // console.log("Errors: " + errors);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }
}));

/* A /api/courses/:id DELETE route that will delete the corresponding course 
and return a 204 HTTP status code and no content. */
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {

  try {
    course = await Course.findByPk(req.params.id);
    console.log("Course: " + course);
    console.log("Course.userId: " + course.userId);
    console.log("req.params.id: " + req.params.id);
    console.log("req.currentUser.id: " + req.currentUser.id);

    if (course) {
      if (course.userId === req.currentUser.id) {
        console.log("Course: " + course);
        await course.destroy();
        console.log("Course: " + course);
        res.status(204).end();
      } else {
        res.status(403).end();
      }
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      console.log("Course: " + course);
      console.log("Errors: " + errors);
      res.status(400).json({ errors });
    } else {
      throw error;
    }
  }

}));

module.exports = router;