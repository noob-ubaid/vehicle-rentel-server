import { pool } from "../../config/db";

const createBookings = async (payload: Record<string, any>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const vehicleResult = await pool.query(
    `SELECT vehicle_name, daily_rent_price FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const vehicle = vehicleResult.rows[0];

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);
  const days = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const total_price = vehicle.daily_rent_price * days;

  const bookingResult = await pool.query(
    `
    INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );

  const booking = bookingResult.rows[0];

  return {
    id: booking.id,
    customer_id: booking.customer_id,
    vehicle_id: booking.vehicle_id,
    rent_start_date: booking.rent_start_date,
    rent_end_date: booking.rent_end_date,
    total_price: booking.total_price,
    status: booking.status,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getBookings = async (role: string, id: string) => {
  if (role === "admin") {
    const result = await pool.query(`
      SELECT * FROM bookings
        `);
    return result.rows;
  } else {
    const result = await pool.query(
      `
        SELECT * FROM bookings WHERE customer_id = $1
        `,
      [id]
    );
    return result.rows;
  }
};

const updateBooking = async (
  bookingId: number,
  role: string,
  userId: number
) => {
  const bookingResult = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);
  if (bookingResult.rows.length === 0) throw new Error("Booking not found");

  const booking = bookingResult.rows[0];
  const today = new Date();

  if (role === "customer") {
    const startDate = new Date(booking.rent_start_date);
    if (userId !== booking.customer_id)
      throw new Error("You can only cancel your own booking");
    if (today >= startDate)
      throw new Error("Cannot cancel booking after start date");

    await pool.query(`UPDATE bookings SET status='cancelled' WHERE id=$1`, [
      bookingId,
    ]);
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
    return { ...booking, status: "cancelled" };
  }

  if (role === "admin") {
    await pool.query(`UPDATE bookings SET status='returned' WHERE id=$1`, [
      bookingId,
    ]);
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
    return { ...booking, status: "returned" };
  }

  throw new Error("Unauthorized to update booking");
};
export const bookingsService = {
  createBookings,
  getBookings,
  updateBooking,
};
