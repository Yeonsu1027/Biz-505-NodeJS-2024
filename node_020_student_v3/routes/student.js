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
// 주소 중간에 끼워넣어진 학번을 st_num 변수를 통하여 받아라
// ***:을붙이면 변수가됨.***
router.get("/:st_num/detail", (req, res) => {
  // st_num은 변수이니 어떤값이 와도된다
  // 주소에 포함되어 전달된 값을 변수에 저장하기
  const st_num = req.params.st_num;
  const params = [st_num]; //하나여도 배열에 넣는다
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

router.get("/:st_num/check", (req, res) => {
  const st_num = req.params.st_num;
  const sql = " SELECT st_num FROM tbl_student WHERE st_num = ? "; //학번을 조회해서 있으면 학번만 보여주기 (*)아니고
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      res.json({ result: "ERROR", message: err }); // result 에 "ERROR"를 담고..
    } else {
      if (result.length > 0) {
        //0보다 크면 데이터가 있는거니
        return res.json({ result: "있다", STD: result[0] });
      } else {
        return res.json({ result: "없다", STD: null });
      }
    }
  });
});

router.get("/:st_num/delete", (req, res) => {
  const st_num = req.params.st_num;
  const sql = " DELETE FROM tbl_student WHERE st_num = ?";

  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect("/student");
    }
  });
});
// localhost:3000/student/학번/update
// form tag 의 action 이 자동으로 URL 이 설정된다
router.get("/:st_num/update", (req, res) => {
  const st_num = req.params.st_num;
  const sql = " SELECT * FROM tbl_student WHERE st_num = ? ";
  dbConn.query(sql, [st_num], (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.render("student/input", { STD: result[0] }); //input 에보냄
    }
  });
});

// post로 업데이트하기 //수정버튼을 눌렀을때
router.post("/:st_num/update", (req, res) => {
  const st_num = req.params.st_num; // """주소창"""(params)에 들어있는 학번 //이거만 params
  const st_name = req.body.st_name; // 여기부터는 원래의 데이터에서 가져와 보여주어야하니까
  const st_dept = req.body.st_dept;
  const st_grade = req.body.st_grade;
  const st_tel = req.body.st_tel;
  const st_addr = req.body.st_addr;

  const params = [st_name, st_dept, st_grade, st_tel, st_addr, st_num]; //key를 마지막에
  const sql = " UPDATE tbl_student " + " SET st_name =?, " + " st_dept =?," + " st_grade =?," + " st_tel =?," + " st_addr =?" + " WHERE st_num =?";
  // mysql에서 WHERE 에 학번을 적어서 저 학번을 기준으로 업데이트를 하라고 해서
  // 여기서도 st_num 을 마지막에 적는 것이다. //delete,update 둘다.(mysql)
  dbConn.query(sql, params, (err, result) => {
    if (err) {
      return res.json(err);
    } else {
      return res.redirect(`/student/${st_num}/detail`); // 다시요청해서 변경된 사항 보여주기
    }
  });
});
// router 객체를 다른곳에서 import 할 수 있도록 export 하기
export default router;
