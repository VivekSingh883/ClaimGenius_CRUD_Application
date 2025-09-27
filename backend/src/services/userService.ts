import { pool } from "../config/db";

// User type
export interface User {
  id: number;
  first_name: string;
  middle_name?: string;
  last_name: string;
  dob: string | null;
  mobile: string;
  address?: string;
  created_at: Date;
  updated_at: Date;
}

// Input type
export type UserInput = Omit<User, "id" | "created_at" | "updated_at">;

// Options for getAllUsers
export interface GetUsersOptions {
  query?: string;
  page: number;
  limit: number;
  sortBy?: string;
  order?: "asc" | "desc";
}

// Get all users
export const getAllUsers = async ({
  query,
  page,
  limit,
  sortBy = "id",
  order = "desc",
}: GetUsersOptions): Promise<{ users: User[]; totalUsers: number }> => {
  const offset = (page - 1) * limit;
  const params: (string | number)[] = [];

  // Search filter
  let whereClause = "";
  if (query) {
    whereClause =
      "WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR middle_name ILIKE $1 OR mobile ILIKE $1 OR address ILIKE $1";
    params.push(`%${query}%`);
  }

  // Count
  const countQuery = `SELECT COUNT(*) FROM users ${whereClause}`;
  const countResult = await pool.query(countQuery, params);
  const totalUsers = parseInt(countResult.rows[0].count, 10);

  // Sorting
  const allowedSort = ["first_name", "dob", "id"];
  let orderClause = "ORDER BY id DESC";
  if (sortBy && allowedSort.includes(sortBy)) {
    orderClause = `ORDER BY ${sortBy} ${order.toUpperCase()}`;
  }

  // Query users
  const userQuery = `SELECT * FROM users ${whereClause} ${orderClause} LIMIT $${
    params.length + 1
  } OFFSET $${params.length + 2}`;
  params.push(limit, offset);

  const result = await pool.query(userQuery, params);
  return { users: result.rows as User[], totalUsers };
};

// Get by ID
export const getUserById = async (id: number): Promise<User | null> => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return result.rows[0] || null;
};

// Create
export const createUser = async (data: UserInput): Promise<User> => {
  const { first_name, middle_name, last_name, dob, mobile, address } = data;
  const result = await pool.query(
    `INSERT INTO users (first_name, middle_name, last_name, dob, mobile, address)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [first_name, middle_name ?? "", last_name, dob, mobile, address ?? ""]
  );
  return result.rows[0] as User;
};

// Update
export const updateUser = async (
  id: number,
  data: UserInput
): Promise<User | null> => {
  const { first_name, middle_name, last_name, dob, mobile, address } = data;
  const result = await pool.query(
    `UPDATE users
     SET first_name=$1, middle_name=$2, last_name=$3, dob=$4, mobile=$5, address=$6, updated_at=NOW()
     WHERE id=$7 RETURNING *`,
    [first_name, middle_name ?? "", last_name, dob, mobile, address ?? "", id]
  );
  return result.rows[0] || null;
};

// Delete
export const deleteUser = async (id: number): Promise<boolean> => {
  const result = await pool.query("DELETE FROM users WHERE id=$1", [id]);
  return (result.rowCount ?? 0) > 0;
};
