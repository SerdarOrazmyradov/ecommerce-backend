import { db } from "../../config/db.js";
import {
  getAllBestSellingProductsGuest,
  getAllFlashSalesProductsGuest,
  getProductByIdGuest,
  getProductImagesByIdGuest,
} from "../../services/guest/guestServices.js";

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId || isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Dogry product ID gerek." });
    }

    // let product_images = [];
    // req.files.forEach((element) => {
    //   product_images.push(element.originalname);
    // });
    const result = await getProductByIdGuest(productId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

export const getProductImagesById = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId || isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Dogry product ID gerek." });
    }

    // let product_images = [];
    // req.files.forEach((element) => {
    //   product_images.push(element.originalname);
    // });
    const result = await getProductImagesByIdGuest(productId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const getAllFlashSalesProducts = async (req, res) => {
  try {
    // const productId = req.params.id;
    // if (!productId || isNaN(productId)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Dogry product ID gerek." });
    // }

    // let product_images = [];
    // req.files.forEach((element) => {
    //   product_images.push(element.originalname);
    // });
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const categoriesQuery = req.query.categories || "";

    const categories = categoriesQuery.split(",").map((c) => c.trim());
    
    console.log("test edyas " + ":categories ", categories);
    console.log("test edyas " + ":categoriesQuery ", categoriesQuery);
    //  /api/flash-products?page=1&categories=dd,c,
    const result = await getAllFlashSalesProductsGuest(page, limit, categories);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const getAllBestSellingProducts = async (req, res) => {
  try {
    // const productId = req.params.id;
    // if (!productId || isNaN(productId)) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Dogry product ID gerek." });
    // }

    // let product_images = [];
    // req.files.forEach((element) => {
    //   product_images.push(element.originalname);
    // });
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const categoriesQuery = req.query.categories || "";

    const categories = categoriesQuery.split(",").map((c) => c.trim());

    console.log("test edyas " + ":categories ", categories);
    console.log("test edyas " + ":categoriesQuery ", categoriesQuery);

    const result = await getAllBestSellingProductsGuest(
      page,
      limit,
      categories
    );
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

// ---------------------------------

import {
  getAllJobsAdmin,
  deleteJobAdmin,
  getAllUsersAdmin,
  deleteUserAdmin,
  getAllFavJobsAdmin,
  createProductAdmin,
  createCategoryAdmin,
  updateCategoryAdmin,
  deleteCategoryAdmin,
  getCategoriesAdmin,
  updateUserAdmin,
  updateProductAdmin,
  getAllProductsAdmin,
  deleteProductAdmin,
  addProductImagesAdmin,
} from "../../services/admin/adminService.js";

export const createProduct = async (req, res) => {
  try {
    const name = req.body.name || "";
    const description = req.body.description || "";
    const stock = req.body.stock || 0;
    const price = req.body.price || 0;
    const category_id = req.body.category_id || 0;
    const main_image = req.file.originalname || "";

    const result = await createProductAdmin(
      name,
      description,
      stock,
      price,
      category_id,
      main_image
    );
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const addProductImages = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId || isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Dogry product ID gerek." });
    }

    let product_images = [];
    req.files.forEach((element) => {
      product_images.push(element.originalname);
    });
    const result = await addProductImagesAdmin(product_images, productId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId || isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Dogry product ID gerek." });
    }
    const name = req.body.name || "";
    const description = req.body.description || "";
    const stock = req.body.stock || 0;
    const price = req.body.price || 0;
    const category_id = req.body.category_id || 0;
    const main_image = req.file.originalname || "";

    console.log("req.file", req.file);

    // 1. Id barlanýar
    if (!productId || isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Dogry product ID gerek." });
    }
    const result = await updateProductAdmin(
      productId,
      name,
      description,
      stock,
      price,
      category_id,
      main_image
    );
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // 1. Id barlanýar
    if (!productId || isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Dogry product ID gerek." });
    }
    const result = await deleteProductAdmin(productId);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category_name = req.body.name;
    const result = await createCategoryAdmin(category_name);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const updateCategory = async (req, res) => {
  try {
    const category_name = req.body.name;
    const category_id = req.params.id;
    const result = await updateCategoryAdmin(category_name, category_id);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category_id = req.params.id;
    const result = await deleteCategoryAdmin(category_id);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const getCategories = async (req, res) => {
  const name = req.query.name || "";
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  try {
    const result = await getCategoriesAdmin(name, limit, page);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

//:::::::::::::::::::::
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const username = req.body.username;
  const password = req.body.password;
  if (!userId || isNaN(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "Dogry user ID gerek." });
  }
  try {
    const result = await updateUserAdmin(userId, username, password);
    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (err) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const {
      name = "",
      description = "",
      category = "",
      stock,
      price,
      page = 1,
      limit = 20,
    } = req.query;

    const parsedStock =
      stock !== undefined && stock !== "" ? Number(stock) : undefined;
    const parsedPrice =
      price !== undefined && price !== "" ? Number(price) : undefined;
    const parsedPage = Number(page);
    const parsedLimit = Number(limit);

    const result = await getAllProductsAdmin(
      name,
      description,
      category,
      parsedStock,
      parsedPrice,
      parsedPage,
      parsedLimit
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
//'''''''''''''''''''''

export const updateOrderStatus = async (req, res) => {
  const orderId = req.params.id;
  const newStatus = req.body.status;

  try {
    const query = `
      UPDATE orders
      SET status = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [newStatus, orderId];

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating order status:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update order status.",
    });
  }
};

//mmmmmmmmmmmmmmmmmmmmm
//_____________________________________________________________________________________

export const getAllJobs = async (req, res) => {
  try {
    const {
      title = "",
      description = "",
      active = "true", // string görnüşinde gelýär
      company = "",
      location = "",
      category = "",
      salary_range = "",
      employment_type = "",
      page = 1,
      limit = 20,
    } = req.query;
    const result = await getAllJobsAdmin(
      title,
      description,
      active,
      company,
      location,
      category,
      salary_range,
      employment_type,
      page,
      limit
    );

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
export const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    console.log("jobId", jobId);

    const result = await deleteJobAdmin(jobId);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

export const getAllUsers = async (req, res) => {
  const { page = 1, limit = 10, username = "", role = "" } = req.query;
  try {
    const result = await getAllUsersAdmin(page, limit, username, role);

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // 1. Id barlanýar
    if (!userId || isNaN(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Dogry user ID gerek." });
    }

    // 2. Admin ulanyjylary barlap, pozmakdan saklanýar
    const checkForAdmin = await db.query(
      "SELECT * FROM users WHERE role = 'admin' "
    );
    const isAdmin = checkForAdmin.rows.some((admin) => admin.id == userId);
    if (isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Admin ulanyjyny pozup bilmersiňiz.",
      });
    }

    // 3. Ulanyjy barmy barla
    const checkUser = await db.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (checkUser.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Ulanyjy tapylmady." });
    }

    // 4. Pozmak hyzmaty ulanylýar
    const result = await deleteUserAdmin(userId);

    if (result.success) {
      return res
        .status(200)
        .json({ success: true, message: "Ulanyjy üstünlikli pozuldy." });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Ulanyjyny pozup bolmady." });
    }
  } catch (error) {
    console.error("Pozmakda ýalňyşlyk ýüze çykdy:", error);
    res
      .status(500)
      .json({ success: false, message: "Serwerde ýalňyşlyk ýüze çykdy." });
  }
};

export const getAllFavJobs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      title = "",
      company = "",
      location = "",
      category = "",
      employment_type = "",
    } = req.query;
    const result = await getAllFavJobsAdmin(
      page,
      limit,
      title,
      company,
      location,
      category,
      employment_type
    );

    if (result.success) {
      res.status(200).json(result);
    } else {
      res.status(404).json(result);
    }
  } catch (error) {
    console.error("Error detected!!! - ", error);
    res.status(500).json({ success: false, message: "An error occurred." });
  }
};
