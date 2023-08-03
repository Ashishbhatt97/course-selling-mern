import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Admin, Course } from "../Model/Model";
import { z } from "zod";

const Adminroutes = express.Router();
require("dotenv").config();

const AdminInputObj = z.object({
  username: z
    .string()
    .min(4, { message: "Must be 4 or more characters long" })
    .max(30, { message: "Must be less than 30 characters" }),
  password: z
    .string()
    .min(10, { message: "Must be 10 or more characters long" })
    .max(20, { message: "Must be less than 20 characters" }),
});

const CourseInputObj = z.object({
  title: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(30, { message: "Must be less than 30 characters" }),
  description: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(150, { message: "Must be less than 150 characters" }),
  image: z
    .string()
    .min(5, { message: "Must be 5 or more characters long" })
    .max(400, { message: "Must be less than 400 characters" })
    .optional(),
  price: z.string(),
});

const partialCourseObj = CourseInputObj.partial();

const SECRET = process.env.JWT_SECRET_KEY;
const AdminVerify = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!SECRET) {
      return res.send("Secret is Not defined");
    }
    const AuthToken = req.headers.authorization;
    if (!AuthToken) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (AuthToken) {
      const token = AuthToken.split(" ")[1];
      if (token === "null") {
        return res.status(403).send({ message: "Unauthorized" });
      } else {
        jwt.verify(token, SECRET, (err, admin) => {
          if (err) {
            res.send({ message: "Unauthorized" });
          } else {
            if (!admin) {
              return res.status(403).json({ message: "User Undefined" });
            }
            if (typeof admin === "string") {
              return res.status(403);
            }
            req.headers["adminUsername"] = admin.data.username;
            next();
          }
        });
      }
    }
  } catch (error) {
    res.send({ message: error });
  }
};

const AdminLoginHandle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!SECRET) {
      return res.send("Secret is Not defined");
    }

    const adminParsedObj = AdminInputObj.safeParse(req.body);
    if (!adminParsedObj.success) {
      res.send({ message: adminParsedObj.error });
      return;
    }

    const username = adminParsedObj.data.username;
    const adminObj = await Admin.findOne({ username: username });

    if (!adminObj) {
      res.json({ message: "Admin Not Found" });
    }

    jwt.sign(adminParsedObj, SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        res.json({ message: "Admin Not Found" });
      }
      if (!token) {
        return res.status(403);
      }
      req.headers["token"] = token;
      req.headers["username"] = req.body.username;
      next();
    });
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
};

Adminroutes.post("/signup", async (req: Request, res: Response) => {
  try {
    const adminParsedObj = AdminInputObj.safeParse(req.body);
    if (!adminParsedObj.success) {
      res.send({ message: adminParsedObj.error });
      return;
    }
    const username = adminParsedObj.data.username;
    const password = adminParsedObj.data.password;

    // const { username, password } = req.body;
    const adminExists = await Admin.findOne({
      username: username,
      password: password,
    });

    if (adminExists) {
      return res.json({ message: "Admin Already Exists" });
    }
    const admin = new Admin({
      username: username,
      password: password,
      adminId: Math.floor(Math.random() * 100),
    });

    const response = await admin.save();
    if (response) {
      res.json({ message: "Admin Created Successfully" });
    } else {
      res.json({ message: "Failed" });
    }
  } catch (error) {
    res.json({ message: "Internal Server Error" });
  }
});

Adminroutes.post("/login", AdminLoginHandle, (req: Request, res: Response) => {
  const token = req.headers["token"];
  const username = req.headers["username"];
  res.json({ message: "Logged in successfully", token, username });
});

Adminroutes.post(
  "/courses",
  AdminVerify,
  async (req: Request, res: Response) => {
    try {
      const parsedCourse = CourseInputObj.safeParse(req.body);
      if (!parsedCourse.success) {
        res.status(400).send({ message: parsedCourse.error });
        return;
      }

      const title = parsedCourse.data.title;
      const description = parsedCourse.data.description;
      const image = parsedCourse.data.image;
      const price = parsedCourse.data.price;

      const CourseObj = new Course({
        courseId: Math.floor(Math.random() * 1000),
        title,
        description,
        image,
        price,
        isPublished: true,
      });

      const response = await CourseObj.save();
      if (!response) {
        res.json({ message: "Unable to Process" });
      } else {
        res.json({
          message: "Course created successfully",
          courseId: CourseObj.courseId,
        });
      }
    } catch (error) {
      res.json({ message: "Internal Server Error" });
    }
  }
);

Adminroutes.delete(
  "/courses/:courseId",
  AdminVerify,
  async (req: Request, res: Response) => {
    const courseId = parseInt(req.params.courseId);
    const response = await Course.findOneAndDelete({ courseId: courseId });
    if (!response) {
      res.json({ message: "Course Not Found" });
    } else {
      const updatedCourses = await Course.find({ isPublished: true });
      res.json({
        message: "Course Deleted successfully",
        course: updatedCourses,
      });
    }
  }
);

Adminroutes.put(
  "/courses/:courseId",
  AdminVerify,
  async (req: Request, res: Response) => {
    try {
      const parseUpdatedCourse = partialCourseObj.safeParse(req.body);

      if (!parseUpdatedCourse.success) {
        return res.send({ message: parseUpdatedCourse.error });
      }

      const title = parseUpdatedCourse.data.title;
      const description = parseUpdatedCourse.data.description;
      const price = parseUpdatedCourse.data.price;

      const course = await Course.findOne({
        courseId: parseInt(req.params.courseId),
      });

      if (!course) {
        res.json({ message: "Course Not Found" });
      } else {
        if (title) {
          course.title = title;
        }
        if (description) {
          course.description = description;
        }
        if (price) {
          course.price = price;
        }
        const response = await course.save();

        if (response) {
          res.send({ message: "Course updated successfully" });
        } else {
          res.status(403).json({ message: "Course Update Failed" });
        }
      }
    } catch (error) {
      res.send({ message: error });
    }
  }
);

Adminroutes.get("/courses", AdminVerify, async (req, res: Response) => {
  const courses = await Course.find({});
  res.json(courses);
});

Adminroutes.get(
  "/courses/:courseId",
  AdminVerify,
  async (req, res: Response) => {
    const courses = await Course.findOne({
      courseId: parseInt(req.params.courseId),
    });
    if (courses) {
      res.send(courses);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  }
);

Adminroutes.get("/", AdminVerify, (req: Request, res: Response) => {
  res.json({ username: req.headers["adminUsername"] });
});
export default Adminroutes;
