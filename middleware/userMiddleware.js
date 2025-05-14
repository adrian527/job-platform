import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/CustomErrors.js";
import { verifyJwt } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");

  try {
    const { userId, role } = verifyJwt(token);
    const testUser = userId === "681cb0eef3ff17455de490ef";

    req.user = { userId, role, testUser };
    next();
  } catch (err) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) throw new BadRequestError("Demo User. Read Only!");
  next();
};
