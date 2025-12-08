import { pool } from "../../config/db";

const createVehicles = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const result = pool.query(
    `INSERT INTO vehicles(vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getAllVehicles = async () => {
  const result = await pool.query(`SELECT * FROM vehicles`);
  return result;
};

const getSingleVehicle = async (id: string) => {
  const result = await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id]);
  return result;
};

const updateSingleVehicle = async (
  id: string,
  payload: Record<string, unknown>
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
      id,
    ]
  );
  return result;
};

const deleteVehicles = async (id: string) => {
  const checkVehicle = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [id]
  );

  if (checkVehicle.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const checkBooking = await pool.query(
    `SELECT * FROM bookings 
     WHERE vehicle_id = $1 AND status = 'active'`,
    [id]
  );

  if (checkBooking.rows.length > 0) {
    throw new Error("Cannot delete vehicle. Active bookings exist.");
  }

  await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id]);

  return { message: "Vehicle deleted successfully" };
};
export const vehiclesService = {
  createVehicles,
  getAllVehicles,
  getSingleVehicle,
  updateSingleVehicle,
  deleteVehicles,
};
