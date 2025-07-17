import express from "express";

import { verifyToken } from "../middleware/auth.token.js";
import "dotenv/config";

import {
  getCollectionProducts,
  getProductById,
} from "../services/user/userServices.js";
import { verifyUser } from "../middleware/user/user-middleware.js";
import {
  createOrder,
  logout,
  trackOrderStatus,
} from "../controllers/userControllers/user_controller.js";
import { createOrderValidation } from "../validation/order/orderValidation.js";
import { upload1 } from "../middleware/multer/multer_json.js";

const router = express.Router();

//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
router.post(
  "/create-order",
  verifyToken,
  verifyUser,
  createOrderValidation,
  // upload1.single("order_items"),
  createOrder
);
router.get(
  "/track-order-status/:id",
  verifyToken,
  verifyUser,
  trackOrderStatus
);
//.............................................................
router.get("/logout", verifyToken, verifyUser, logout);

//mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm
//1)ulanyjy kolleksiýany görmeli- kolleksiýany  GET etmeli
router.get("/collections", verifyToken, getCollectionProducts);
router.get("/product/:id", verifyToken, getProductById);

//2)ulanyjy saýlamaly- id-si boýunça  GET etmeli- bunda inner join etmeli..
//3)ulanyjy cart-a goşmaly-sebetde birinji product-dan 2-si ikinji product-dan 1-i bolup biler

//4)product-lar hemde sub-product-ler
//____________________________________________________________________________________________________________________________________

////// Employer Job Routes //////
//Employer create job
// router.post("/employer/create-job", createJobValidation, verifyToken, create);

//Employer Read
// router.get("/employer/jobs", verifyToken, employerJobs);

// update job
// router.put(
//   "/employer/update-job/:id",
//   createJobValidation,
//   verifyToken,
//   updateJob
// );
// router.delete("/employer/delete-job/:id", verifyToken, deleteEmployerJob);

// router.get("/employer/applyed-users/:id", verifyToken, applyedUsers);

////// Job seeker job routes
// Job seeker can view all jobs
// router.get("/job-seeker/jobs", jobSeekerJobs);
// Job seeker can view a specific job

// router.get("/job-seeker/jobs/:id", async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const job = await db.query(
//       "SELECT * FROM jobs WHERE id = $1 and is_active=true",
//       [jobId]
//     );
//     if (job.rows.length > 0) {
//       res.status(200).json({ success: true, data: job.rows[0] });
//     } else {
//       res.status(404).json({ success: false, message: "Job not found." });
//     }
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// router.post("/job-seeker/applying-job/:id", verifyToken, applyJob);

// router.get("/job-seeker/get-all-applyed-jobs", verifyToken, getAllApplyedJobs);

// router.delete(
//   "/job-seeker/delete-applyed-job/:id",
//   verifyToken,
//   deleteApplyedJobById
// );
export default router;
