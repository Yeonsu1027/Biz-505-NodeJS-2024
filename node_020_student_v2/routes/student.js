/**
 * express 프레임워크를 사용하여
 * router 객체 생성
 */
import express from "express";
/*
 * mysql.js 에서 선언하고 export 한 dbCreate 를
 * import DB 라는 이름으로 사용하겠다
 */
import DB from "../config/mysql.js"; // 우리가만든 모듈파일은 꼭경로에 .js를 붙인다
const router = express.Router();
// dbCreate 에서 선언된 init() 함수를 호출하여
// return 된 정보를 dbConn 변수(객체)에 저장하라
const dbConn = DB.init();

// localhost:3000/student/         앞 student는 app.js에서 받고, 마지막 '/'가
//주소창에 /로 요청을하면
router.get("/", async (req, res) => {
  const sql = "SELECT * FROM tbl_student";
  dbConn.query(sql, (err, result) => {
    // 쿼리는 sql을 result 라는 함수에 담아서 보낸다.(?) 오류발생시 오류는 err에 담긴다
    if (err) {
      // 오류가 안생기면 여긴 null이다
      return res.json(err);
    } else {
      //   return res.json(result);
      res.render("student/list", { stList: result }); //데이터 베이스에서 조회된 result를 stList에 담아서 pug로 보내라
    }
  });
  // '/' 라는 경로를 요청받으면 // 실제로는 /student
});

// localhost:3000/student/insert
// GET : localhost:3000/student/insert
// get 은 요청하는거..
router.get("/insert", (req, res) => {
  res.render("student/input"); // input.pug 를 열어라 파일이름/pug
});

// POST : localhost:3000/student/insert
router.post("/insert", (req, res) => {
  // form 을 통해 전달된(전송된) 데이터를 (임시)변수에 저장해 두기
  const st_num = req.body.st_num; //input box의 name 값을 st_num 에둔다.
  const st_name = req.body.st_name;
  const st_dept = req.body.st_dept;

  // DB에 insert 하기 위해 배열type 으로 변환
  //   const params = [req.body.st_num, req.body.st_name, req.body.st_dept];
  const params = [st_num, st_name, st_dept]; // 위의 3개처럼 변수를 선언해두면 이렇게 짧게
  //아니면 바로윗줄처럼 [안에다가 다쓰거나]
  const sql = " INSERT INTO tbl_student(st_num, st_name, st_dept) " + " VALUES(?,?,?)";
  // ?개수는 칼럼의 수와 동일하다

  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      // INSERT(추가)가 성공한 경우 List 를 보여주는 화면으로
      // 화면 전환하라
      return res.redirect("/student/");
    }
  });
});

// GET : localhost:3000/student/이몽룡/detail
// GET : localhost:3000/student/홍길동/detail 어떤식이어도 된다
// GET : localhost:3000/student/학번/detail 요청을 하면
// 주소 중간에 끼워넣어진 학번을 st_num 변수를 통하여 받아라  ***:을붙이면 변수가됨.***
router.get("/:st_num/detail", (req, res) => {
  // st_num은 변수이니 어떤값이 와도된다
  // 주소에 포함되어 전달된 값을 변수에 저장하기
  const st_num = req.params.st_num;
  const params = [st_num];
  const sql = " SELECT * FROM tbl_student WHERE st_num = ? ";
  //   dbConn.query(sql, [st_num]);
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      //   return res.json(result);
      return res.render("student/detail", { STD: result[0] }); //결과에서 0번째만 담아라
    }
  });
});
// router 객체를 다른곳에서 import 할 수 있도록 export 하기
export default router;
