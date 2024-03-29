import express from "express";
import DB from "../config/mysql.js";

const router = express.Router();

/*
DB 연결을 시도하는 DB.init() 함수는 async 키워드가 부착되어있다
이 함수는 동기방식으로 실행되는데
일반적인 변수 = DB.init() 방식으로 return 값을 받을 수 없다
DB.init() 함수의 return 값은 .then() 함수를 통해서 받아야한다
*/
let dbConn = null;
// const dbConn = DB.init(); 일반적인방식 init는 sync

// init() 함수에 async 가 설정되어 동기식으로 작동된다
// 이 함수의 return 값을 받기 위해서는 .then() 함수를 통하여 받아야한다  //mysql에 async 썼음.
DB.init().then((connection) => (dbConn = connection)); //init에 async를 쓰면 then은 자동으로 생성된다
// then을통해서 init가완성되면 connection에 담는다.
// 그리고 이걸 밖의 변수
// dbConn에 담는다

router.get("/", (req, res) => {
  const sql = " SELECT * FROM tbl_books "; // select가 data구조도 가져온다
  // 그래서 result[0] 하던것!!! [0]은 정보고, [1] 은 varchar(50)이런구조가 가져와진다
  dbConn // 위에서 dbConn에 정보가 담겨야 이후 실행된다
    // query() 함수를 동기방식으로 실행
    .query(sql)
    // query() 함수 실행이 정상적으로 완료되면 .then() 함수에게 결과를 전달한다
    .then((rows) => {
      console.log(rows);
      // 쿼리가 실행된후 결과가 rows 에 담긴다//  0번 배열을 가져온다
      return res.render("books/list", { books: rows[0] }); //main pug를 열어라~
    }) // rows 는 .catch 를 사용하여 오류를 try catch 처럼사용한다~~ (err,result)는 기존방식
    // 만약 실행중에 오류가 발생하면 .catch() 함수에게 결과를 전달한다
    .catch((err) => {
      return res.render("db_error", err); // err는 오류메시지를 갖고있다
      // error.pug의~~   // pug 로 오류를 보내서 오류메시지를 볼 수 있게한다.
    });
  // return res.render("books/main");
});
router.get("/insert", (req, res) => {
  return res.render("books/input"); // 조건부 화면 렌더링
});

router.post("/insert", (req, res) => {
  // mysql2 dependency 도구가 지원하는 확장된 INSERT 구문
  // 이 SQL 은 표준 SQL 아님
  const sql = " INSERT INTO tbl_books SET ? ";
  const params = {
    // json {}
    isbn: req.body.isbn, // body.***네임*** (pug의 input 이름)
    title: req.body.title,
    publisher: req.body.publisher,
    author: req.body.author,
    price: Number(req.body.price), // body건 모두 문자열이여서
    discount: Number(req.body.discount),
  };
  // return res.json(params);
  dbConn
    .query(sql, params)
    .then((_) => {
      // _ : 필요없다란 뜻
      return res.redirect("/books");
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

router.get("/:isbn/detail", (req, res) => {
  const isbn = req.params.isbn;
  // console.log(isbn);
  const sql = " SELECT * FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      // return res.json(rows[0][0]); //대괄호 2개여서 0번째의 0번째.
      return res.render("books/detail1", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.json(err);
    });
});

router.get("/:isbn/delete", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " DELETE FROM tbl_books WHERE isbn = ? ";
  dbConn
    .query(sql, isbn)
    .then((_) => {
      return res.redirect("/books");
    }) // ; 없음 주의
    .catch((err) => {
      return res.render("db_error", err);
    });
});

/*
 * 도서정보 자세히 보기에서 수정하기를 클릭했을때
 * 브라우저의 주소창에 /books/isbn/update 라고 입력했을때
 * GET /books/0003/update 라고 요청을 했을때
 *
 * 이 router 가 요청을 받아서 처리한다
 *
 * 이 요청은 0003 도서의 정보를 input box 에 보여주고 수정할 수 있도록
 * 화면을 보여달라
 *
 * 스토리텔링을 통해 코드를 익혀 보자
 *
 */
router.get("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const sql = " SELECT * FROM tbl_books WHERE isbn=? ";
  dbConn
    .query(sql, isbn)
    .then((rows) => {
      return res.render("books/input", { book: rows[0][0] });
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

/**
 * 수정하기 화면에서 input box 에 값을 입력하고
 * 수정하기 버튼을 클릭했을때 post 방식으로 데이터가 전달된다
 * POST /books/0003/update 로 요청을 할때
 */
router.post("/:isbn/update", (req, res) => {
  const isbn = req.params.isbn;
  const params = {
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    price: Number(req.body.price),
    discount: Number(req.body.discount),
  };
  const sql = " UPDATE tbl_books SET ? WHERE isbn = ? "; // mysql2도구 set

  /**
   * mysql2/promise 도구에서는 UPDATE SQL 문이 매우 간소해 진다
   * UPDATE tbl_books SET title = ? , author = ? .. 과 같이 작성해야 하는데
   * mysql2/promise 에서는 SET 키워드와 함께 json type 으로 만들어진 데이터를 통해
   *  update SQL 문이 매우 간소해진다
   *
   * 다만, Update 를 실행할때 WHERE 절에 isbn = ? 가 필수항목으로 사용해야 하므로
   * query() 함수에 전달하는 값은 배열로 2가지를 전달해야 한다 [params, isbn]
   */
  // 1번 ? 에서는 {json} 형식의 params
  // 2번 ? 에는 isbn 을 보낸다!
  dbConn
    .query(sql, [params, isbn]) // ; 주의!!!!!!!
    .then((_) => {
      return res.redirect(`/books/${isbn}/detail`);
    })
    .catch((err) => {
      return res.render("db_error", err);
    });
});

export default router;
