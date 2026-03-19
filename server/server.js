import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import event from './routes/event.routes.js'

dotenv.config(); 

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173" , "https://assignment-nu-nine-76.vercel.app"],
    credentials: true,
  })
);

connectDB();

app.get("/", (req, res) => {
  res.send("API running...");
});

app.use("/api" , event)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);