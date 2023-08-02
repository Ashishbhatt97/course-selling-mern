import express, { Request, NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { User, Course } from "../Model/Model";

require("dotenv").config();

const userRoutes = express.Router();
const SECRET = process.env.JWT_SECRET_KEY;
const app = express();
app.use(express.json());

interface Course {
  courseId: Number;
  title: String;
  description: String;
  image?: String;
  price: Number;
  isPublished: Boolean;
}

const userLoginHandle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = {
      username: req.body.username,
      password: req.body.password,
    };
    const userObj = await User.findOne({
      username: user.username,
      password: user.password,
    });
    if (!userObj || userObj === undefined) {
      return res.status(403).send({ message: "User Not Found" });
    }
    if (!SECRET) {
      return res.send("Secret is Not defined");
    }
    jwt.sign(user, SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.status(401).json({ message: "Unauthorized" });
      } else {
        if (!token) {
          return res.send({ message: "Error in Making JWT" });
        }
        req.headers["username"] = user.username;
        req.headers["token"] = token;
        next();
      }
    });
  } catch (error) {
    res.json({ error: error });
  }
};

const userVerify = (req: Request, res: Response, next: Function) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.trim() || authToken === "undefined") {
    return res.status(403).json({ message: "Token is Undefined or Empty" });
  }
  if (authToken) {
    const token = authToken.split(" ")[1];
    if (!SECRET) {
      return res.send("Secret is Not defined");
    }
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        res.status(401).send({ message: "UnAuthorized" });
      } else {
        if (!user) {
          return res.status(403);
        }
        if (typeof user === "string") {
          return res.status(403);
        }
        req.headers["username"] = user.username;
        req.headers["password"] = user.password;
        next();
      }
    });
  }
};

//
userRoutes.post("/signup", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({
      username: username,
      password: password,
    });
    if (!userExists) {
      const user = new User({
        username: username,
        password: password,
        userId: Math.floor(Math.random() * 1000),
        purchasedCourses: [],
      });
      const response = await user.save();
      if (response) {
        res.json({ message: "User Created Successfully" });
      } else {
        res.json({ message: "Cannot Proceed Your Request Right Now!" });
      }
    } else {
      return res.json({ message: "User Already Exists" });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

userRoutes.post(
  "/login",
  userLoginHandle,
  async (req: Request, res: Response) => {
    const token = req.headers["token"];
    const username = req.headers["username"];
    res.json({
      message: "user LoggedIn successfully",
      token,
      username,
    });
  }
);

userRoutes.post(
  "/courses/:courseId",
  userVerify,
  async (req: Request, res: Response) => {
    try {
      const course_Id = parseInt(req.params.courseId);
      const course = await Course.findOne({ courseId: course_Id });
      if (course) {
        const user = await User.findOne({
          username: req.headers["username"],
          password: req.headers["password"],
        });
        if (user) {
          if (!user.purchasedCourses) {
            return res.status(403);
          }
          const courseExists = user.purchasedCourses.find(
            (e) => e.courseId === course_Id
          );
          if (courseExists) {
            return res
              .status(403)
              .json({ message: "Course Already Purchased" });
          } else {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: "Course purchased successfully" });
          }
        } else {
          res.status(403).json({ message: "User not found" });
        }
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      if (error) res.send({ message: "Internal Server Error" });
    }
  }
);

userRoutes.get(
  "/purchasedCourses",
  userVerify,
  async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        username: req.headers["username"],
        password: req.headers["password"],
      });
      if (!user) {
        return res.json({ message: "User Not Found" });
      }
      const userPurchasedCourse = user.purchasedCourses;
      res.json({ purchasedCourses: userPurchasedCourse });
    } catch (error) {
      res.json({ message: "Internal Server Error" });
    }
  }
);

userRoutes.get("/courses", async (req, res: Response) => {
  try {
    const Courses = await Course.find({});
    res.json({ courses: Courses });
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
});

userRoutes.get("/", userVerify, (req, res) => {
  const username = req.headers["username"];
  res.json({ username: username });
});
export default userRoutes;
