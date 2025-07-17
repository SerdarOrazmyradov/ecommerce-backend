import "dotenv/config";
import { db } from "../../config/db.js";

export async function getCollectionProducts(
  employer_id,
  page = 1,
  title = "",
  description = "",
  active = true,
  company = "",
  location = "",
  category = "",
  salary_range = "",
  employment_type = ""
) {
  try {
    // let query = "SELECT * FROM jobs WHERE 1=1";
    // let values = [];
    // let index = 1;
    // let limit = 40;

    // // 1. Ilki employer_id boýunça filter
    // if (employer_id) {
    //   query += ` AND employer_id = $${index++}`;
    //   values.push(employer_id);
    // }

    // // 2. Galan filterler
    // if (title) {
    //   query += ` AND title ILIKE $${index++}`;
    //   values.push(`${title}%`);
    // }
    // if (description) {
    //   query += ` AND description ILIKE $${index++}`;
    //   values.push(`${description}%`);
    // }
    // if (typeof active === "boolean") {
    //   query += ` AND is_active = $${index++}`;
    //   values.push(active);
    // }
    // if (company) {
    //   query += ` AND company ILIKE $${index++}`;
    //   values.push(`${company}%`);
    // }
    // if (location) {
    //   query += ` AND location ILIKE $${index++}`;
    //   values.push(`${location}%`);
    // }
    // if (category) {
    //   query += ` AND category ILIKE $${index++}`;
    //   values.push(`${category}%`);
    // }
    // if (salary_range) {
    //   query += ` AND salary_range ILIKE $${index++}`;
    //   values.push(`${salary_range}%`);
    // }
    // if (employment_type) {
    //   query += ` AND employment_type ILIKE $${index++}`;
    //   values.push(`${employment_type}%`);
    // }
    // query += ` LIMIT ${limit} OFFSET ${limit} * (${page} - 1)`;
    // const result = await db.query(query, values);

    // if (result.rows.length === 0) {
    //   return {
    //     success: true,
    //     message: "No jobs found for this page.",
    //   };
    // }

    // const date = {
    //   page: page,
    //   results: result.rows,
    //   total_pages: Math.ceil(
    //     (
    //       await db.query(
    //         `SELECT COUNT(*) FROM jobs where employer_id = ${employer_id} `
    //       )
    //     ).rows[0].count / limit
    //   ),
    //   total_results: (
    //     await db.query(
    //       `SELECT COUNT(*) FROM jobs where employer_id = ${employer_id}`
    //     )
    //   ).rows[0].count,
    // };
    // res.send(date);
    return {
      success: true,
      message: "Job selected by page successfully.",
      date: date,
    };
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error selecting job:", error);

    // Return a generic error message to the client for security

    return {
      success: false,
      message: "An error occurred while selecting the job.",
    };
  }
}

export const getProductById = async (req, res) => {
  return { success: true, message: "getProductById" };
};
export const createOrderUser = async (
  userId,
  status,
  name,
  phone_number,
  address,
  note,
  total_quantity,
  total_price,
  payment_type,
  // file_name
  order_items
) => {
  try {
    // duplicate order check
    const duplicateCheck = await db.query(
      `
  SELECT * FROM orders
  WHERE user_id = $1 
  AND created_at > NOW() - INTERVAL '30 seconds'
`,
      [userId]
    );

    if (duplicateCheck.rows.length > 0) {
      return {
        success: false,
        message:
          "Sargyt eýýäm goýberilen ýaly. Täzeden synanyşmazdan öň garaşyň.",
      };
    }

    const query = `
      INSERT INTO orders (
        user_id,
        status,
        name,
        phone_number,
        address,
        note,
        total_quantity,
        total_price,
        payment_type
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9
      )
      RETURNING *;
    `;

    const values = [
      userId,
      status,
      name,
      phone_number,
      address,
      note,
      total_quantity,
      total_price,
      payment_type,
    ];

    const result = await db.query(query, values);
    const order_id = result.rows[0].id;
    // const query1 = `
    //   INSERT INTO orders_item (order_id,file_name) VALUES ($1, $2) RETURNING *;`;
    // const query1 = `
    //   INSERT INTO orders_item (order_id,file_name) VALUES ($1, $2) RETURNING *;`;

    const products = JSON.parse(order_items).products;
    console.log(
      "order items-dan iberilen birinji maglumatlar ",
      products[0].id + " ; count: " + products[0].count
    );
    console.log(
      "order items-dan iberilen ikinji maglumatlar ",
      products[1].id + " ; count: " + products[1].count
    );

    let query1 = "";
    let values1 = [];
    let index = 0;
    products.forEach(async (product) => {
      // query1 += ` insert into  values ($${
      //   index + 1
      // },$${index + 2},$${index + 3});`;
      values1.push(order_id);
      values1.push(product.id);
      values1.push(product.count);
      console.log("test edilýän query :", query1);
      console.log("test edilýän values :", values1);
      index += 3;
    });

    console.log(
      "id-si  ",
      products.map((p) => p.id)
    );

    const result1 = await db.query(
      "INSERT INTO orders_item (order_id, product_id, count) VALUES ($1, unnest($2::int[]), unnest($3::int[]))   RETURNING *;",
      [order_id, products.map((p) => p.id), products.map((p) => p.count)]
    );

    // const values1 = [order_id, file_name];

    return {
      success: true,
      message: "Order üstünlikli döredildi.",
      data: result.rows[0],
      // order_item: result1.rows[0],
      // order_item: result1.rows[0],
    };
  } catch (error) {
    console.error("Order döretmekde ýalňyşlyk:", error);

    return {
      success: false,
      message: "Order döretmekde ýalňyşlyk ýüze çykdy.",
    };
  }
};
export const trackOrderStatusUser = async (userId, orderId) => {
  try {
    const query = `
      SELECT id, status, created_at, total_price, total_quantity, payment_type
      FROM orders
      WHERE id = $1 AND user_id = $2
    `;

    const values = [orderId, userId];
    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return {
        success: false,
        message: "Sargyt tapylmady ýa-da size degişli däl.",
      };
    }

    return {
      success: true,
      message: "Sargyt ýagdaýy üstünlikli alyndy.",
      data: result.rows[0],
    };
  } catch (error) {
    console.error("Sargyt ýagdaýyny getirmekde ýalňyşlyk:", error);

    return {
      success: false,
      message: "Sargyt ýagdaýyny getirmekde ýalňyşlyk ýüze çykdy.",
    };
  }
};

export const logoutUser = async (userId) => {
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
