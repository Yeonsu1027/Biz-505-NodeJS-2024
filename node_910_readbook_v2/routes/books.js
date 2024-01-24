import express from "express";
import DB from "../models/index.js"; // sequelize 는 이것만 가져오면..

const router = express.Router();
const BOOK = DB.models.tbl_books; // DB : index에서 import 해온것

router.get("/", async (req, res) => {
  try {
    const rows = await BOOK.findAll(); // findAll() sequelize 함수 :모두가져와 담아라.
    return res.render("books/list", { books: rows }); // rows를 리스트에담아 렌더링
  } catch (error) {
    return res.json(error);
  }
});

router.get("/insert", async (req, res) => {
  // 각 요소의 값이 defaultValue 로 채워진 Data 객체만들기
  //   const book_data = new BOOK();
  const book_data = await BOOK.bulid();
  return res.render("books/input", { book: book_data });
});

router.post("/insert", async (req, res) => {
  const book_data = req.body;
  try {
    await BOOK.create(book_data);
    return res.redirect("/books");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:isbn/update", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const row = await BOOK.findByPk(isbn); // primarykey를 기준으로 finding 하라
    return res.render("books/input", { book: row });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:isbn/detail", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    const row = await BOOK.findByPk(isbn);
    return res.render("books/detail1", { book: row });
  } catch (error) {
    return res.json(error);
  }
});
router.post("/:isbn/updata", async (req, res) => {
  const book_data = req.body; // body.어쩌구 안써도됨.
  const isbn = req.params.isbn;
  try {
    //  where 조건을 기준으로 book_data를 업데이트 하라
    // 2중 json 조건절                  isbn : isbn
    await BOOK.update(book_data, { where: { isbn } }); //{} 안 isbn : req.params.isbn
    return res.redirect(`/books/${isbn}`);
  } catch (error) {}
});

router.get("/:isbn/delete", async (req, res) => {
  const isbn = req.params.isbn;
  try {
    await BOOK.destroy({ where: { isbn } });
    return res.redirect("/books");
  } catch (error) {
    return res.json(error);
  }
});

export default router;
