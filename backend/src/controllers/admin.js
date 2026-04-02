const bcrypt = require('bcryptjs');
const db = require('../db');

const getAllUsers = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, username, email, role, avatar_url, bio, created_at 
      FROM users 
      ORDER BY created_at DESC
    `);

    res.json({ users: result.rows });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const createUser = async (req, res) => {
  const { username, email, password, role = 'user', avatar_url, bio } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const result = await db.query(`
      INSERT INTO users (username, email, password_hash, role, avatar_url, bio)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, username, email, role, avatar_url, bio, created_at
    `, [username, email, passwordHash, role, avatar_url, bio]);

    res.status(201).json({ user: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    console.error('Create user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, role, avatar_url, bio } = req.body;

  try {
    let updateFields = [];
    let values = [];
    let paramCount = 1;

    if (username) {
      updateFields.push(`username = $${paramCount++}`);
      values.push(username);
    }
    if (email !== undefined) {
      updateFields.push(`email = $${paramCount++}`);
      values.push(email);
    }
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      updateFields.push(`password_hash = $${paramCount++}`);
      values.push(passwordHash);
    }
    if (role) {
      updateFields.push(`role = $${paramCount++}`);
      values.push(role);
    }
    if (avatar_url !== undefined) {
      updateFields.push(`avatar_url = $${paramCount++}`);
      values.push(avatar_url);
    }
    if (bio !== undefined) {
      updateFields.push(`bio = $${paramCount++}`);
      values.push(bio);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateFields.push(`updated_at = CURRENT_TIMESTAMP`);
    values.push(id);

    const query = `
      UPDATE users 
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, username, email, role, avatar_url, bio, created_at, updated_at
    `;

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ error: 'Username or email already exists' });
    }
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getAllUsers, createUser, updateUser, deleteUser };
