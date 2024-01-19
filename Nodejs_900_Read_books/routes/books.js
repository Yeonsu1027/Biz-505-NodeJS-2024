import express from "express";
import DB from "../config/mysql.js";

const router = express.Router();
const dbConn = DB.init(); //mysql에서 정보받아서.. 저장

router.get("/list", async (req, res) => {
  //주소창에 /를 입력하면
  const sql = " SELECT * FROM tbl_books "; //조회하는..을
  dbConn.query(sql, (err, result) => {
    //my sql에 보내고
    if (err) {
      return res.json(err); //에러나면 json 형식으로 에러보여주고
    } else {
      //아니면 / 잘됐으면
      res.render("books/list", { bkList: result }); //그 조회된 결과들이 result에 담기니까
      //bkList에 담아서 pug를열어서 보여주게. //list pug로 bklist를 만들어서 보낸거
    }
  });
}); //도서정보 보여주기end

// 도서추가용
router.get("/inputbook", (req, res) => {
  res.render("books/inputbook");
});

//GET은 데이터를 요청하고 받아오는 메서드,
// POST는 데이터를 서버로 제출하는 메서드
router.post("/inputbook", (req, res) => {
  const isbn = req.body.isbn;
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const price = req.body.price;
  const sale = req.body.sale;
  const pubdate = req.body.pubdate;
  const link = req.body.link;

  const params = [isbn, title, author, publisher, price, sale, pubdate, link];

  const sql = " INSERT INTO tbl_books (isbn,title,author,publisher,price,discount,pubdate,link) " + " VALUES(?,?,?,?,?,?,?,?) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/books/list"); //주소//추가하고 나서 리스트들 보여주고..
    }
  });
});

// 회원가입 화면
router.get("/sign", (req, res) => {
  res.render("books/users");
});

// 회원내용추가
router.post("/sign", (req, res) => {
  const id = req.body.M_ID;
  const password = req.body.M_PASSWORD;
  const email = req.body.M_EMAIL;
  const name = req.body.M_NAME;

  const params = [id, password, email, name];

  const sql = " INSERT INTO tbl_users (M_ID, M_PASSWORD, M_EMAIL, M_NAME) " + " VALUES(?,?,?,?) ";

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(result); //회원가입 되는지 확인용 나중에 지워야할듯?
    }
  });
});

export default router;
