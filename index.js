import express, { Router } from "express";
import bodyParser from "body-parser";
import router from "./router/userRoutes.js";
import admin_router from "./router/admin/adminRoutes.js";
import { db } from "./config/db.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./router/authRoutes.js";
import adminAuthRouter from "./router/admin/authRoutes.js";
import guestRouter from "./router/guest/guestRoutes.js";
const app = express();
const PORT = 3000;
// app.use(express.static('images'));

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

console.log("__dirname: " + __dirname);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://ecommerce-frontend-bx39.onrender.com/"); // Or '*' for all origins (use with caution)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));

//_______________________________________________________________________________________________

//initialize DB
// db.query(
//   "create table IF NOT EXISTS categories (id serial primary key, name VARCHAR ,description VARCHAR ,created_at TIMESTAMP,deleted_at TIMESTAMP);"
// );

// db.query(
//   "create table IF NOT EXISTS sub_categories (id serial primary key,parent_id int references categories(id) , name VARCHAR ,description VARCHAR ,created_at TIMESTAMP,deleted_at TIMESTAMP);"
// );

// db.query(
//   "create table IF NOT EXISTS products(id serial primary key,name VARCHAR ,description VARCHAR,summary VARCHAR, cover VARCHAR , sku  VARCHAR , price  VARCHAR  ,   category_id   references   sub_categories(id))     );"
// );

//_______________________________________________________________________________________________

//......... auth .........//

app.use("/auth/api", authRouter);
app.use("/admin/auth/api", adminAuthRouter);
app.use("/guest/api", guestRouter);

app.use(
  "/uploads",
  cors(corsOptions),
  express.static(path.join(__dirname, "/uploads"))
);

// app.use(
//   "/images",
//   cors(corsOptions),
//   express.static(path.join(__dirname, "/images"))
// );
// app.use(
//   "/order_item",
//   cors(corsOptions),
//   express.static(path.join(__dirname, "/order_item"))
// );

//Employer actions CRUD & viewing users who applied to jobs
app.use("/user/api", router);
app.use("/admin/api", admin_router);

// error handler middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || "Internal Server Error",
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
