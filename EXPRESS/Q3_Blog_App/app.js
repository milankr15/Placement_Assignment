import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import YAML from 'yamljs';
import swaggerUi from "swagger-ui-express";

const app = express();
const swaggerDocument =  YAML.load('./swagger.yml');

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

// All routes here
app.use("/api", routes);

app.get("/", (_req, res) => {
    res.status(200).send("Hello World");
});

app.all("*", (_req, res) => {
    return res.status(404).json({
        success: false,
        message: "Route Not Found"
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