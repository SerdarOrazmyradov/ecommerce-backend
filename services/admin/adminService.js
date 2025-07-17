import "dotenv/config";
import { db } from "../../config/db.js";
import bcrypt from "bcryptjs";

export const createProductAdmin = async (
  name,
  description,
  stock,
  price,
  category_id,
  main_image,
  discount,
  oldPrice,
  rating
) => {
  try {
    // 1. Kategoriýa barmy barla
    const categoryCheck = await db.query(
      `SELECT * FROM categories WHERE id = $1`,
      [category_id]
    );

    if (categoryCheck.rows.length === 0) {
      return {
        success: false,
        message: `Category with id=${category_id} not found.`,
      };
    }

    // 2. Şeýle haryt öň bar bolsa girizme
    const checkedResult = await db.query(
      `SELECT * FROM products WHERE name = $1 AND description = $2`,
      [name, description]
    );

    if (checkedResult.rows.length > 0) {
      return {
        success: false,
        message: "Product with the same name and description already exists.",
      };
    }

    // 3. Täze harydy giriz
    const queryText = `
      INSERT INTO products (
        name,
        description,
        stock,
        price,
        category_id,
        main_image,discount,
  oldPrice,
  rating
      ) VALUES ($1, $2, $3, $4, $5, $6,$7,$8,$9)
      RETURNING *;
    `;

    const values = [
      name,
      description,
      stock,
      price,
      category_id,
      main_image,
      discount,
      oldPrice,
      rating,
    ];
    const result = await db.query(queryText, values);

    return {
      success: true,
      message: "Product created successfully.",
      details: result.rows[0],
    };
  } catch (error) {
    console.error("Error creating product:", error);

    return {
      success: false,
      message: "An error occurred while creating the product.",
    };
  }
};
export const addProductImagesAdmin = async (product_images, productId) => {
  try {
    const check_productId = await db.query(
      "select * from products where id = $1",
      [productId]
    );

    if (check_productId.rows.length == 0) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    let base_query = "INSERT INTO images (product_id, img_path) VALUES";
    let index = 1;
    let values = [];

    product_images.forEach((element) => {
      base_query += ` ($${index}, $${index + 1}),`;
      values.push(productId);
      values.push(element);
      index += 2;
    });

    base_query = base_query.slice(0, -1); // soňky , aýrylýar
    base_query += " RETURNING * ;";
    const result = await db.query(base_query, values);

    return {
      success: true,
      message: "Product images added successfully.",
      data: result.rows,
    };
  } catch (error) {
    console.error("Error adding product images:", error);

    return {
      success: false,
      message: "An error occurred while adding product images.",
    };
  }
};

export const updateProductAdmin = async (
  id, // Üýtgedilýän product-yň ID-si
  name,
  description,
  stock,
  price,
  category_id,
  main_image,
  discount,
  oldPrice,
  rating
) => {
  try {
    // Ilki bilen product barlagy: şeýle ID barmy?
    const checkProduct = await db.query(
      `SELECT * FROM products WHERE id = $1`,
      [id]
    );

    if (checkProduct.rows.length === 0) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    // Product täzeläp goýulýar
    const queryText = `
      UPDATE products
      SET
        name = $1,
        description = $2,
        stock = $3,
        price = $4,
        category_id = $5,
        main_image = $6,
        discount = $7,
        oldPrice = $8,
        rating = $9
      WHERE id = $10
      RETURNING *;
    `;

    const values = [
      name,
      description,
      stock,
      price,
      category_id,
      main_image,
      discount,
      oldPrice,
      rating,
      id,
    ];
    const result = await db.query(queryText, values);

    return {
      success: true,
      message: "Product updated successfully.",
      details: result.rows[0],
    };
  } catch (error) {
    console.error("Error updating product:", error);

    return {
      success: false,
      message: "An error occurred while updating the product.",
    };
  }
};
export const deleteProductAdmin = async (id) => {
  try {
    // ID boýunça barlaýarys
    const checkProduct = await db.query(
      `SELECT * FROM products WHERE id = $1`,
      [id]
    );

    if (checkProduct.rows.length === 0) {
      return {
        success: false,
        message: "Product not found.",
      };
    }

    // Product dolulygyna pozulýar
    const result = await db.query(
      `DELETE FROM products WHERE id = $1 RETURNING *`,
      [id]
    );

    return {
      success: true,
      message: "Product deleted successfully.",
      details: result.rows[0],
    };
  } catch (error) {
    console.error("Error deleting product:", error);

    return {
      success: false,
      message: "An error occurred while deleting the product.",
    };
  }
};

export const createCategoryAdmin = async (category_name) => {
  try {
    const checkExistends = await db.query(
      "select * from categories where name = $1 ",
      [category_name]
    );
    if (checkExistends.rows.length > 0) {
      return {
        success: false,
        message: "Şeýle atly category bar!",
      };
    }
    db.query("INSERT INTO categories (name) VALUES ($1)", [category_name]);
    return {
      success: true,
      message: "kategoriýa üstünlikli goşuldy",
      category_name: category_name,
    };
  } catch (err) {
    console.log("ERROR DETECTED!!! - ", err);
    return { success: false, message: "üstünliksiz ,ýalňyşlyk ýüze çykdy" };
  }
};

export const updateCategoryAdmin = async (category_name, category_id) => {
  try {
    const result = await db.query(
      `UPDATE categories
       SET name = $1 WHERE id = $2
       RETURNING *`,
      [category_name, category_id]
    );
    return {
      success: true,
      message: "kategoriýa üstünlikli üýtgedildi goşuldy",
      date: result.rows,
    };
  } catch (err) {
    console.log("ERROR DETECTED!!! - ", err);
    return { success: false, message: "üstünliksiz ,ýalňyşlyk ýüze çykdy" };
  }
};

export const deleteCategoryAdmin = async (category_id) => {
  try {
    // Ilki bilen barla: şeýle kategoriýa barmy?
    const checkCategory = await db.query(
      `SELECT * FROM categories WHERE id = $1`,
      [category_id]
    );

    if (checkCategory.rows.length === 0) {
      return {
        success: false,
        message: "Kategoriýa tapylmady.",
      };
    }

    // Eger bar bolsa, poz
    const result = await db.query(
      `DELETE FROM categories WHERE id = $1 RETURNING *`,
      [category_id]
    );

    return {
      success: true,
      message: "Kategoriýa üstünlikli pozuldy.",
      data: result.rows[0],
    };
  } catch (err) {
    console.error("ERROR DETECTED!!! -", err);
    return {
      success: false,
      message: "Ýalňyşlyk ýüze çykdy, pozmak başartmady.",
    };
  }
};

export const getCategoriesAdmin = async (name, limit, page) => {
  const offset = (page - 1) * limit;
  try {
    let query = ` select * from categories `;
    let values = [];
    if (name) {
      query += ` where name ILIKE '$1%'`;
      values.push(name);
    }
    const total_results = (await db.query(query, values)).rows.length;
    const total_pages = Math.ceil(total_results / limit);
    query += ` limit ${limit} offset ${offset}`;

    const result = await db.query(query, values);

    return {
      success: true,
      message: "kategoriýa üstünlikli alyndy ",
      date: result.rows,
      current_page: page,
      total_results: total_results,
      total_pages: total_pages,
    };
  } catch (err) {
    console.log("ERROR DETECTED!!! - ", err);
    return { success: false, message: "üstünliksiz ,ýalňyşlyk ýüze çykdy" };
  }
};

//:::::::::::::::::::::::::
export const updateUserAdmin = async (userId, username, password) => {
  try {
    // check userId
    const check_userId = await db.query("select * from users where id = $1", [
      userId,
    ]);

    if (check_userId.rows.length == 0) {
      return {
        success: false,
        message: "şeýle id-si bolan ulanyjy tapylmady ",
      };
    }

    // check user
    const check_user = await db.query(
      "select * from users where username = $1",
      [username]
    );

    if (check_user.rows.length > 0) {
      return {
        success: false,
        message: "ulanyjy  ady ulanylýar ",
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await db.query(
      `UPDATE users
      set username = $1, pass_hash = $2  where  id=$3   RETURNING *`,
      [username, hashedPassword, userId]
    );
    return {
      success: true,
      message: "ulanyjy  üstünlikli üýtgedildi ",
      data: result.rows,
    };
  } catch (error) {
    console.log("ERROR DETECTED!!! - ", error);
    return {
      success: false,
      message:
        "üstünliksiz ,ýalňyşlyk ýüze çykdy :mümkin bu username ulanylýandyr!",
    };
  }
};
export const getAllProductsAdmin = async (
  name = "",
  description = "",
  category = "",
  stock,
  price,
  page = 1,
  limit = 20
) => {
  try {
    const offset = (page - 1) * limit;

    // Dinamik filtrler üçin WHERE şertlerini ýygnamak
    let filters = [];
    let values = [];
    let i = 1; // parameter index ($1, $2, ...)

    // 🔍 Ady boýunça gözleg
    if (name && name.trim() !== "") {
      filters.push(`products.name ILIKE $${i}`);
      values.push(`%${name.trim()}%`);
      i++;
    }

    // 🔍 Beýany boýunça gözleg
    if (description && description.trim() !== "") {
      filters.push(`products.description ILIKE $${i}`);
      values.push(`%${description.trim()}%`);
      i++;
    }

    // 🔍 Kategoriýa ady boýunça gözleg
    if (category && category.trim() !== "") {
      filters.push(`categories.name ILIKE $${i}`);
      values.push(`%${category.trim()}%`);
      i++;
    }

    // 🔍 Takyk stock (görnüşi: = 10)
    if (stock !== undefined && stock !== null && stock !== "") {
      filters.push(`products.stock = $${i}`);
      values.push(Number(stock));
      i++;
    }

    // 🔍 Takyk price (görnüşi: = 100)
    if (price !== undefined && price !== null && price !== "") {
      filters.push(`products.price = $${i}`);
      values.push(Number(price));
      i++;
    }

    // 🔗 Esasy SELECT soragy
    let query = `
      SELECT 
        products.*, 
        categories.name AS category_name
      FROM products
      JOIN categories ON products.category_id = categories.id
    `;

    if (filters.length > 0) {
      query += ` WHERE ` + filters.join(" AND ");
    }

    // 🔢 Sazlanan tertip + limit & offset
    query += ` ORDER BY products.id DESC LIMIT $${i} OFFSET $${i + 1}`;
    values.push(limit);
    values.push(offset);

    const result = await db.query(query, values);

    // 🔢 Jemi sany üçin (COUNT)
    let countQuery = `
      SELECT COUNT(*) AS total
      FROM products
      JOIN categories ON products.category_id = categories.id
    `;
    if (filters.length > 0) {
      countQuery += ` WHERE ` + filters.join(" AND ");
    }

    const countResult = await db.query(countQuery, values.slice(0, i - 1));
    const total = parseInt(countResult.rows[0].total);
    const total_pages = Math.ceil(total / limit);

    return {
      success: true,
      message: "Products fetched successfully.",
      data: result.rows,
      total_results: total,
      total_pages,
      current_page: page,
    };
  } catch (error) {
    console.error("Error fetching products:", error);

    return {
      success: false,
      message: "An error occurred while fetching products.",
    };
  }
};

//'''''''''''''''''''''''''
//____________________________________________________________________________________________
export const getAllJobsAdmin = async (
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
) => {
  try {
    const offset = (page - 1) * limit;

    // SQL soragy we parametrleri
    const filters = [];
    const values = [];

    if (title) {
      filters.push(`LOWER(jobs.title) LIKE LOWER($${values.length + 1})`);
      values.push(`%${title}%`);
    }

    if (description) {
      filters.push(`LOWER(jobs.description) LIKE LOWER($${values.length + 1})`);
      values.push(`%${description}%`);
    }

    if (active !== "") {
      filters.push(`jobs.is_active = $${values.length + 1}`);
      values.push(active === "true");
    }

    if (company) {
      filters.push(`LOWER(jobs.company) LIKE LOWER($${values.length + 1})`);
      values.push(`%${company}%`);
    }

    if (location) {
      filters.push(`LOWER(jobs.location) LIKE LOWER($${values.length + 1})`);
      values.push(`%${location}%`);
    }

    if (category) {
      filters.push(`LOWER(jobs.category) LIKE LOWER($${values.length + 1})`);
      values.push(`%${category}%`);
    }

    if (salary_range) {
      filters.push(
        `LOWER(jobs.salary_range) LIKE LOWER($${values.length + 1})`
      );
      values.push(`%${salary_range}%`);
    }

    if (employment_type) {
      filters.push(
        `LOWER(jobs.employment_type) LIKE LOWER($${values.length + 1})`
      );
      values.push(`%${employment_type}%`);
    }

    const whereClause =
      filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    // Total result sany üçin
    const countQuery = `SELECT COUNT(*) FROM jobs ${whereClause}`;
    const countResult = await db.query(countQuery, values);
    const total_results = parseInt(countResult.rows[0].count);
    const total_pages = Math.ceil(total_results / limit);

    // Jobs maglumatlaryny al
    const jobsQuery = `
        SELECT *
        FROM jobs
        ${whereClause}
        ORDER BY id DESC
        LIMIT $${values.length + 1} OFFSET $${values.length + 2}
      `;

    const jobsResult = await db.query(jobsQuery, [...values, limit, offset]);

    return {
      success: true,
      total_results,
      total_pages,
      current_page: Number(page),
      jobs: jobsResult.rows,
    };
  } catch (error) {
    console.error("getAllJobsAdmin error:", error);
    return { success: false, message: "Server error" };
  }
};

export const deleteJobAdmin = async (jobId) => {
  try {
    const result = await db.query(
      `UPDATE jobs 
       SET is_active = false 
       WHERE id = $1  AND is_active = true
       RETURNING *`,
      [jobId]
    );

    if (result.rows.length > 0) {
      return {
        success: true,
        message: "Job deactivated (soft delete) successfully.",
        job: result.rows[0],
      };
    } else {
      return {
        success: false,
        message: "Job not found or already inactive.",
      };
    }
  } catch (error) {
    console.error("Error deleting job:", error);
    return {
      success: false,
      message: "An error occurred while deleting the job.",
    };
  }
};
export const getAllUsersAdmin = async (
  page = 1,
  limit = 10,
  username = "",
  role = ""
) => {
  try {
    const offset = (page - 1) * limit;

    // Filters üçin WHERE şertini taýýarlamak
    const filters = [];
    const values = [];

    if (username) {
      filters.push(`username ILIKE $${values.length + 1}`);
      values.push(`%${username}%`);
    }

    if (role) {
      filters.push(`role = $${values.length + 1}`);
      values.push(role);
    }

    const whereClause =
      filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    const query = `
      SELECT * FROM users
      ${whereClause}
      ORDER BY id DESC
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}
    `;
    const users = await db.query(query, [...values, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) FROM users
      ${whereClause}
    `;
    const count = await db.query(countQuery, values);
    const total = parseInt(count.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      users: users.rows,
      meta: {
        total_results: total,
        total_pages: totalPages,
        current_page: parseInt(page),
      },
      message: "Users successfully retrieved",
    };
  } catch (error) {
    console.error("Error getting users:", error);
    return {
      success: false,
      message: "An error occurred while retrieving users.",
    };
  }
};

export const deleteUserAdmin = async (userId) => {
  try {
    // Ilki bilen şeýle ID-li user barlaýarys
    const checkUser = await db.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);

    if (checkUser.rows.length === 0) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    // User bar bolsa, poz
    const result = await db.query(
      `DELETE FROM users WHERE id = $1 RETURNING *`,
      [userId]
    );

    return {
      success: true,
      message: "User successfully deleted.",
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    return {
      success: false,
      message: "An error occurred while deleting the user.",
    };
  }
};

export const getAllFavJobsAdmin = async (
  page,
  limit,
  title,
  company,
  location,
  category,
  employment_type
) => {
  try {
    const offset = (page - 1) * limit;

    // SQL WHERE şertlerini toplamak
    const filters = [];
    const values = [];

    if (title) {
      filters.push(`jobs.title ILIKE $${values.length + 1}`);
      values.push(`%${title}%`);
    }
    if (company) {
      filters.push(`jobs.company ILIKE $${values.length + 1}`);
      values.push(`%${company}%`);
    }
    if (location) {
      filters.push(`jobs.location ILIKE $${values.length + 1}`);
      values.push(`%${location}%`);
    }
    if (category) {
      filters.push(`jobs.category ILIKE $${values.length + 1}`);
      values.push(`%${category}%`);
    }
    if (employment_type) {
      filters.push(`jobs.employment_type = $${values.length + 1}`);
      values.push(employment_type);
    }

    const whereClause =
      filters.length > 0 ? `WHERE ${filters.join(" AND ")}` : "";

    // Esasy query
    const dataQuery = `
      SELECT 
        favorite.id ,
        favorite.user_id,
        favorite.job_id,
        jobs.title,
        jobs.description,
        jobs.company,
        jobs.location,
        jobs.category,
        jobs.salary_range,
        jobs.employment_type,
        jobs.is_active
      FROM favorite
      INNER JOIN jobs ON favorite.job_id = jobs.id
      ${whereClause}
      ORDER BY favorite.id DESC
      LIMIT $${values.length + 1}
      OFFSET $${values.length + 2}
    `;

    const dataResult = await db.query(dataQuery, [...values, limit, offset]);

    // Jemi sany üçin başgaça query
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM favorite
      INNER JOIN jobs ON favorite.job_id = jobs.id
      ${whereClause}
    `;
    const countResult = await db.query(countQuery, values);
    const total = parseInt(countResult.rows[0].total);
    const totalPages = Math.ceil(total / limit);

    // Netijäni ugratmak
    return {
      success: true,
      data: dataResult.rows,
      meta: {
        total_results: total,
        total_pages: totalPages,
        current_page: parseInt(page),
      },
      message: "Favorit işler üstünlikli alyndy",
    };
  } catch (error) {
    console.error("Error getting favorite jobs:", error);
    return {
      success: false,
      message: "Favorit işleri almakda ýalňyşlyk ýüze çykdy.",
    };
  }
};
