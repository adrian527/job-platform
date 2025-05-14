import { Router } from "express";
import {
  getApplicationStats,
  getCurrentUser,
  updateUser,
} from "../controllers/manageController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import {
  authorizePermissions,
  checkForTestUser,
} from "../middleware/userMiddleware.js";
import upload from "../middleware/multerMiddleware.js";

const router = Router();

router.route("/current-user").get(getCurrentUser);
router
  .route("/admin/app-stats")
  .get(authorizePermissions("admin"), getApplicationStats);
router
  .route("/update-user")
  .patch(
    checkForTestUser,
    upload.single("avatar"),
    validateUpdateUserInput,
    updateUser
  );

export default router;
