import { pool } from "../../config/db";

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const updateUser = async (
  payload: Record<string, unknown>,
  userRole: string,
  id: string
) => {
  const { name, email, phone, role } = payload;
  if (userRole === "admin") {
    const result = await pool.query(
      `  UPDATE users SET
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    phone = COALESCE($3, phone),
    role = COALESCE($4, role)
  WHERE id = $5
  RETURNING id, name, email, phone, role `,
      [name, email, phone, role, id]
    );
    return result;
  } else {
    const result = await pool.query(
      `  UPDATE users SET
    name = COALESCE($1, name),
    email = COALESCE($2, email),
    phone = COALESCE($3, phone),
  WHERE id = $4
  RETURNING id, name, email, phone, role `,
      [name, email, phone, id]
    );
    return result;
  }
};
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id=$1`, [id]);
  return result;
};
export const userService = {
  getAllUser,
  deleteUser,
  updateUser
};
