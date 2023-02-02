const { Router } = require('express');

const getAllChars = require('./controllers/getAllChars');

const router = Router();

router.get('/rickandmorty/allCharacters', async (req, res) => {
   try {
      const allChars = await getAllChars();
      res.json(allChars);
   } catch (err) {
      console.log(err.message);
   }
});

module.exports = router;
