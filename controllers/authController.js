import jwt from "jsonwebtoken";
import { loginUser, signupUser, updateUser } from "../services/authService.js";

export const login = (req, res) => {
  const { username, password } = req.body;
  const role = "customer";

  loginUser(username, password, role).then((result) => {
    if (result.success) {
      return res.status(200).json(result);
    } else {
      return res.status(401).json(result);
    }
  });
};
export const update = (req, res) => {
  // registrasiýa etýän service bar
  const { username, password, newpassword, confirm_password } = req.body;
  const role = "customer";
  console.log("req body:", req.body);
  console.log("   req.user", req.user);
  const oldname = req.user.name;

  console.log("username barmy :", username);

  updateUser(username, password, role, newpassword, confirm_password,oldname).then(
    (result) => {
      console.log("result from signupUser:", result);
      if (result.success) {
        res.status(201).json(result);
      } else {
        res.status(400).json(result);
      }
    }
  );
  // console.log('result:', result);

  // service-niň jogybyndaky result-yň success-i true bolsa 201 bolmasada 400
};
export const signup = (req, res) => {
  // registrasiýa etýän service bar
  const { username, password } = req.body;
  const role = "customer";
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
