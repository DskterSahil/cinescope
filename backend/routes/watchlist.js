// routes/watchlist.js
import express from 'express';
import verifyToken from '../authenication/verifyToken.js';
import db from "../db.js"
const router = express.Router();

// POST /watchlist
router.post('/', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { item_id } = req.body;
  const {item_type} = req.body;
  const {item_poster} = req.body
  const {item_name } = req.body
  const {item_year } = req.body

  // Insert into DB: user's watchlist table
  try {
    await db.query('INSERT INTO watchlist (user_id, item_id, item_type, item_poster, item_name, item_year) VALUES ($1, $2, $3 , $4, $5, $6)', [userId, item_id, item_type, item_poster, item_name, item_year]);
    res.status(200).json({ message: 'Movie added to watchlist' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});


// DELETE /watchlist/remove
router.delete('/remove', verifyToken, async (req, res) => {
  const userId = req.user.userId;
  const { item_id, item_type } = req.body; // item_type optional but safer

  if (!item_id) {
    return res.status(400).json({ message: 'item_id is required' });
  }

  try {
    const result = await db.query(
      'DELETE FROM watchlist WHERE user_id = $1 AND item_id = $2 AND item_type = $3',
      [userId, item_id, item_type]
    );

    if (result.rowCount > 0) {
      return res.status(200).json({ message: 'Item removed from watchlist' });
    } else {
      return res.status(404).json({ message: 'Item not found in watchlist' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
});



router.get('/get', verifyToken, async(req, res)=> {
  const user_id = req.user.userId

  try{
    const result = await db.query('SELECT * FROM WATCHLIST WHERE user_id = $1', [user_id]);
    res.status(200).json(result.rows);


  }
  catch(err){
    console.error(err)
    res.status(500).json({ message: 'Something went wrong' });

  }
})

export default router;
