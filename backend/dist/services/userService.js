"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const db_1 = require("../config/db");
// Get all users
const getAllUsers = async ({ query, page, limit, sortBy = "id", order = "desc", }) => {
    const offset = (page - 1) * limit;
    const params = [];
    // Search filter
    let whereClause = "";
    if (query) {
        whereClause =
            "WHERE first_name ILIKE $1 OR last_name ILIKE $1 OR middle_name ILIKE $1 OR mobile ILIKE $1 OR address ILIKE $1";
        params.push(`%${query}%`);
    }
    // Count
    const countQuery = `SELECT COUNT(*) FROM users ${whereClause}`;
    const countResult = await db_1.pool.query(countQuery, params);
    const totalUsers = parseInt(countResult.rows[0].count, 10);
    // Sorting
    const allowedSort = ["first_name", "dob", "id"];
    let orderClause = "ORDER BY id DESC";
    if (sortBy && allowedSort.includes(sortBy)) {
        orderClause = `ORDER BY ${sortBy} ${order.toUpperCase()}`;
    }
    // Query users
    const userQuery = `SELECT * FROM users ${whereClause} ${orderClause} LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
    const result = await db_1.pool.query(userQuery, params);
    return { users: result.rows, totalUsers };
};
exports.getAllUsers = getAllUsers;
// Get by ID
const getUserById = async (id) => {
    const result = await db_1.pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0] || null;
};
exports.getUserById = getUserById;
// Create
const createUser = async (data) => {
    const { first_name, middle_name, last_name, dob, mobile, address } = data;
    const result = await db_1.pool.query(`INSERT INTO users (first_name, middle_name, last_name, dob, mobile, address)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`, [first_name, middle_name ?? "", last_name, dob, mobile, address ?? ""]);
    return result.rows[0];
};
exports.createUser = createUser;
// Update
const updateUser = async (id, data) => {
    const { first_name, middle_name, last_name, dob, mobile, address } = data;
    const result = await db_1.pool.query(`UPDATE users
     SET first_name=$1, middle_name=$2, last_name=$3, dob=$4, mobile=$5, address=$6, updated_at=NOW()
     WHERE id=$7 RETURNING *`, [first_name, middle_name ?? "", last_name, dob, mobile, address ?? "", id]);
    return result.rows[0] || null;
};
exports.updateUser = updateUser;
// Delete
const deleteUser = async (id) => {
    const result = await db_1.pool.query("DELETE FROM users WHERE id=$1", [id]);
    return (result.rowCount ?? 0) > 0;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=userService.js.map