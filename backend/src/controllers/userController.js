const pool = require('../config/db');

const getUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createUser = async (req, res) => {
  try {
    const { first_name, middle_name, last_name, dob, mobile, address } = req.body || {};
    const result = await pool.query(
  
      [first_name, middle_name, last_name, dob, mobile, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { first_name, middle_name, last_name, dob, mobile, address } = req.body || {};
    const result = await pool.query(
      
      [first_name || '', middle_name || '', last_name || '', dob || null, mobile || '', address || '', id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

module.exports = {
   getUsers,
   createUser, 
   updateUser, 
   deleteUser
   };


