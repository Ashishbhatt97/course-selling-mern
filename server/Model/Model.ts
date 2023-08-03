import mongoose, { Schema } from "mongoose";

interface UserObj {
  username: String;
  password: String;
  userId: Number;
  purchasedCourses: [CourseObj];
}

interface CourseObj {
  courseId: Number;
  title: String;
  description: String;
  image?: String;
  price: String | Number;
  isPublished: Boolean;
}

interface AdminObj {
  username: String;
  password: String;
  adminId: Number;
}

const UserSchema = new Schema<UserObj>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userId: { type: Number, required: true },
  purchasedCourses: { type: [], required: false },
});

const courseSchema = new Schema<CourseObj>({
  courseId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  isPublished: { type: Boolean, required: true },
});

const AdminSchema = new Schema<AdminObj>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  adminId: { type: Number, required: true },
});

export const User = mongoose.model<UserObj>("User", UserSchema);
export const Admin = mongoose.model<AdminObj>("Admin", AdminSchema);
export const Course = mongoose.model<CourseObj>("Course", courseSchema);
