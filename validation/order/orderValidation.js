import Joi from "joi";

export const orderStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "rejected", "delivered")
    .required(),
});

export const orderSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "approved", "rejected", "delivered")
    .required(),

  name: Joi.string().min(2).max(100).required(),

  phone_number: Joi.string()
    .pattern(/^\+?[0-9]{8,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number format is invalid",
    }),

  adress: Joi.string().min(5).max(255).required(),

  note: Joi.string().allow("").max(500), // boş bolup biler

  total_quantity: Joi.number().integer().min(1).required(),

  total_price: Joi.number().precision(2).min(0).required(),

  payment_type: Joi.string().valid("cash", "card", "online").required(),
  order_items: Joi.string().required(),
});

export const createOrderValidation = (req, res, next) => {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
export const orderStatusValidation = (req, res, next) => {
  const { error } = orderStatusSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
