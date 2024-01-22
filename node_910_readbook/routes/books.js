import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  return res.render("books/main"); //main pug를 열어라~
});

export default router;
