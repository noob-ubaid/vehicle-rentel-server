import dotenv from "dotenv";
dotenv.config();
const config = {
  connection_str: process.env.CONNECTION_STR,
};

export default config;
