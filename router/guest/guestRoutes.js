import {
  getAllJobs,
  deleteJob,
  getAllUsers,
  deleteUser,
  getAllFavJobs,
  createProduct,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  updateUser,
  updateProduct,
  getAllProducts,
  deleteProduct,
  addProductImages,
  updateOrderStatus,
} from "../../controllers/adminControllers/adminController.js";
import { verifyToken } from "../../middleware/auth.token.js";
import express from "express";
import { verifyAdmin } from "../../middleware/admin/admin_middleware.js";

import { upload } from "../../middleware/multer/multer.js";
import { upload1 } from "../../middleware/multer/multer_json.js";

import {
  importSingle,
  importArray,
  importMultiple,
  deleteFile,
} from "../../controllers/UploadImgContoller/ImageController.js";
import { signupValidation } from "../../validation/authValidation.js";
import { signup } from "../../controllers/authController.js";
import { signupAdmin } from "../../controllers/adminControllers/authController.js";
import { createProductValidation } from "../../validation/product/productValidation.js";
import {
  orderStatusValidation,
  createOrderValidation,
} from "../../validation/order/orderValidation.js";
import { createOrder } from "../../controllers/userControllers/user_controller.js";
import {
  getAllBestSellingProducts,
  getAllFlashSalesProducts,
  getProductById,
  getProductImagesById,
} from "../../controllers/guest/guestController.js";
const guestRouter = express.Router();

//-----------
//''''''''''''''''''''''''''''''''''''''
// router.put(
//   "/update-user/:id",
//   signupValidation,
//   verifyToken,
//   verifyAdmin,
//   updateUser
// );
// router.delete("/delete-user/:id", verifyToken, verifyAdmin, deleteUser);
// router.get("/users", verifyToken, verifyAdmin, getAllUsers);

// router.post("/create-user", signupValidation, verifyToken, verifyAdmin, signup);
// router.post(
//   "/create-admin",
//   signupValidation,
//   verifyToken,
//   verifyAdmin,
//   signupAdmin
// );
// router.delete("/user/:id", verifyToken, verifyAdmin, deleteUser);
//''''''''''''''''''''''''''''''''''''''
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;
//0) category goşar ýaly admin route :
guestRouter.get("/categories", getCategories);
// router.post("/create-category", verifyToken, verifyAdmin, createCategory);
// router.put("/update-category/:id", verifyToken, verifyAdmin, updateCategory);
// router.delete("/delete-category/:id", verifyToken, verifyAdmin, deleteCategory);

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::;
//1) add product
// router.post(
//   "/create-product",
//   createProductValidation,
//   verifyToken,
//   verifyAdmin,
//   upload.single("image"),
//   createProduct
// );
// router.post(
//   "/add-product-images/:id",
//   createProductValidation,
//   verifyToken,
//   verifyAdmin,
//   upload.array("image"),
//   addProductImages
// );

// router.put(
//   "/update-product/:id",
//   createProductValidation,
//   verifyToken,
//   verifyAdmin,
//   upload.single("image"),
//   updateProduct
// );
//❌-image upload etmeli server-e hemde

guestRouter.get("/get-products", getAllProducts);
guestRouter.get("/product/:id", getProductById);
guestRouter.get("/product-images/:id", getProductImagesById);
guestRouter.get("/flash_sales", getAllFlashSalesProducts);
guestRouter.get("/best_selling", getAllBestSellingProducts);
// router.delete("/delete-product/:id", verifyToken, verifyAdmin, deleteProduct);

//.............................................................
// router.patch(
//   "/update-order-status/:id",
//   verifyToken,
//   verifyAdmin,
//   orderStatusValidation,
//   updateOrderStatus
// );
// router.post(
//   "/create-order",
//   verifyToken,
//   verifyAdmin,
//   createOrderValidation,
//   // upload1.single("order_item"),
//   createOrder
// );

//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm

// router.post("/upload-single", upload.single("image"), importSingle);

// router.post("/upload-array", upload.array("image"), importArray);

// const uploadMultiple = upload.fields([
//   { name: "image", maxCount: 1 },
//   { name: "gallery", maxCount: 3 },
// ]);
// router.post("/upload-multiple", uploadMultiple, importMultiple);

// router.delete("/delete", deleteFile);

//___________________________________________________________________________________________________________________

//jobs
// router.get("/jobs", verifyToken, verifyAdmin, getAllJobs);
// router.delete("/job/:id", verifyToken, verifyAdmin, deleteJob);
//users
// router.delete("/user/:id", verifyToken, verifyAdmin, deleteUser);
//fav jobs
// router.get("/fav-jobs", verifyToken, verifyAdmin, getAllFavJobs);

export default guestRouter;
