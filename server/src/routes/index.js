import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Hi!');
});

export default router;
