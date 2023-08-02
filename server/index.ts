import express from "express";
import cors from "cors";
import adminRoutes from "./routes/adminRoutes";
import connectionToDb from "./connection";
import userRoutes from "./routes/userRoutes";

require("dotenv").config();

const PORT = Number(process.env.PORT);
const app = express();

app.use(cors());
app.use(express.json());

connectionToDb();


app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
