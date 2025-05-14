import { Router } from "express";
const router = Router();
import {
  createJob,
  deleteJob,
  editJob,
  getAllJobs,
  getJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/userMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);

router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkForTestUser, validateIdParam, validateJobInput, editJob)
  .delete(checkForTestUser, validateIdParam, deleteJob);

export default router;
