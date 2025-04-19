import jwt from "jsonwebtoken";

const { JWT_SECRET, JWT_EXPIRE } = process.env;

export const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE });

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return {
      payload,
      error: null,
    };
  } catch (error) {
    return {
      payload: null,
      error,
    };
  }
};
