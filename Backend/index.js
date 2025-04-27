import express from 'express';
import mongoose from "./Database/index.mjs";
import userRoutes from "./Routes/userRoutes.mjs";
import cors from "cors";
import taskRoutes from './Routes/taskRoutes.mjs';
import tokenVerification from './middlewareFolder/tokenVerification.mjs';

mongoose.connection.on("open", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("error", () => {
  console.log("Error in connecting MongoDB");
});

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", userRoutes);
app.use('/api/tasks', tokenVerification, taskRoutes);

// ✅ Default route that responds properly
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// ❌ Don't use app.listen(port)
// ✅ Instead export the app
export default app;
