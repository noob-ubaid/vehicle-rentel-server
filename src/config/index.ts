import dotenv from "dotenv";
dotenv.config();
const config = {
  connection_str: process.env.CONNECTION_STR,
  port : process.env.PORT,
  jwt_secret : process.env.JWT_SECRET
};

export default config;
