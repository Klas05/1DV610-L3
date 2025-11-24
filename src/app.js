import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/routes.js";
import { createViewData } from "./utils/viewHelpers.js";
import { ERROR_MESSAGES } from "./config/constants.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("index", createViewData(ERROR_MESSAGES.UNEXPECTED_ERROR));
});

app.listen(PORT, () => {
  console.log(`QR Code Generator running at http://localhost:${PORT}`);
});
