import cookieParser from "cookie-parser";
import express from "express";
import logger from "morgan";
import path from "path";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocument = YAML.load("./src/docs/swagger.yaml");
import indexRouter from "./routes/index";
import pokemonRouter from "./routes/pokemon";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/pokemon", pokemonRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;
