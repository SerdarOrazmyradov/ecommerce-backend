import jwt from "jsonwebtoken";
import { loginUser, signupUser } from "../../services/authService.js";

export const login = (req, res) => {
  const { username, password } = req.body;
  const role = "admin";

  loginUser(username, password, role).then((result) => {
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json(result);
    }
  });
};
export const signupAdmin = (req, res) => {
  // registrasiýa etýän service bar
  const { username, password } = req.body;
  const role = "admin";
  console.log("req body:", req.body);

  console.log("username barmy :", username);

  signupUser(username, password, role).then((result) => {
    console.log("result from signupUser:", result);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  });
  // console.log('result:', result);

  // service-niň jogybyndaky result-yň success-i true bolsa 201 bolmasada 400
};
