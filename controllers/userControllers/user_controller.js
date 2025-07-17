import {
  createOrderUser,
  logoutUser,
  trackOrderStatusUser,
} from "../../services/user/userServices.js";

export const createOrder = async (req, res) => {
  const userId = req.user.user_id;

  // console.log("req file -dan gelen data: ", req.file);

  const status = req.body.status;
  const name = req.body.name;
  const phone_number = req.body.phone_number;
  const adress = req.body.adress;
  const note = req.body.note;
  const total_quantity = req.body.total_quantity;
  const total_price = req.body.total_price;
  const payment_type = req.body.payment_type;
  // const file_name = req.file.filename;
  const order_items = req.body.order_items;

  const result = await createOrderUser(
    userId,
    status,
    name,
    phone_number,
    adress,
    note,
    total_quantity,
    total_price,
    payment_type,
    // file_name
    order_items
  );

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
  // res.json({
  //   success:true,
  //   message:"üstünlikli zakaz döredildi hemde order_item goşuldy"
  // })
};
export const trackOrderStatus = async (req, res) => {
  const userId = req.user.user_id;
  const orderId = parseInt(req.params.id);
  const result = await trackOrderStatusUser(userId, orderId);

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};
export const logout = async (req, res) => {
  const userId = req.user.user_id;

  console.log("userId", req.user);

  const result = await logoutUser(userId);

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};

export const create = async (req, res) => {
  const {
    title,
    description,
    company,
    location,
    category,
    salary_range,
    employment_type,
    is_active,
  } = req.body;
  const employer_id = req.user.user_id;
  const role = req.user.role;
  if (role !== "employer") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Only employers can create jobs.",
    });
  }
  const result = await createJob(
    title,
    description,
    company,
    location,
    category,
    salary_range,
    employment_type,
    is_active,
    employer_id
  );

  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
};
