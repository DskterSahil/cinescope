import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import pool from "../db.js"


const router = express.Router();


router.post("/register", async (req, res) =>{
    const {username, email, password} = req.body
    try{
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)
        const result = await pool.query(
            `INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3) RETURNING id, username, email`,
            [username, email, hash]
        );
        res.status(201).json(result.rows[0])
    }
    catch(err){
        console.error("Error registering user:", err)
        res.status(500).json({error: "Error registering user"})
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      const user = result.rows[0];
      if (!user) return res.status(404).json({ error: 'User not found' });
  
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Incorrect password' });
  
      const token = jwt.sign({ userId: user.id }, "ff9d462d4513ec5445bab5aa92b816dc8dc6ad4e7b335fbfcebc6f18511ba516", {
        expiresIn: '2h',
      });
  
      res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Login failed' });
    }
  });
  

export default router