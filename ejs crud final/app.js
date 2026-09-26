import express from "express";
import connectDB from "./config/db.js";
import employeeRoutes from "./routes/employee.routes.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", employeeRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).send(`
    <h1>Error</h1>
    <p>${err.message}</p>
    <a href="/">Go Back</a>
  `);
});

const port = 5000;

async function startServer() {
  try {
    const connect = await connectDB();

    if (!connect) {
      throw new Error("Failed to connect database");
    }

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log(error.message);

    process.exit(1);
  }
}

startServer();
