import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(process.env.NODE_ENV));

// All routes here
app.use("/api", routes);

app.get("/", (_req, res) => {
    res.send("Hello World");
});

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

app.use((err, _req, res) => {
    if (err) {
        return res.status(400).json({
            success: false,
            message: err.message,
        });
    }

    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});

export default app;