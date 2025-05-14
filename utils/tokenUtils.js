import jwt from "jsonwebtoken";

export const createJwt = (payload) => {
  const token = jwt.sign(payload, process.env.JWT, {
    expiresIn: "1d",
  });

  return token;
};

export const verifyJwt = (token) => {
  const decoded = jwt.verify(token, process.env.JWT);
  return decoded;
};
