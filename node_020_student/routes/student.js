import mysql from "mysql2";
import express from "express";
// express 프레임워크에 있는 Router() 생성자 함수를 사용하여
// router 객체를 만들기
const router = express.Router(); // express 로부터 Router()생성자

const dbConn = mysql.createConnection({
  // 이런경로로 mysql접속한단의미
  host: "localhost",
  user: "root",
  password: "!Biz8080",
  database: "schooldb",
  port: "3306",
});

router.get("/", async (req, res) => {
  //   dbConn.connect(); // 셀렉트 실행해서 성공하면 뒤 함수 실행
  // 연결통로를 통해서 select문
  dbConn.query("SELECT * FROM tbl_student", (err, result, field) => {
    if (err) {
      console.error(err);
      return res.send("DB 연결 Query 오류"); // res.send : 문자열을 그대로보내라
    } else {
      //   return res.json(result); //오류발생하면 result에 담김
      return res.render("student/list", { stList: result }); // render : list.pug 를 html로 바꾸어보내라
    } // result값이 stList 에 담아서 pug에게 rendering 시킨다     // 여기서 list 를만든다
  });
  //   dbConn.end();
});

// localhost:3000/student/insert
router.get("/insert", (req, res) => {
  res.render("student/input"); // input.pug 를 열어라
});

router.post("/insert", (req, res) => { // insert 주소로 가면 req, res
  //form.post 의 input 에 담긴 데이터를 받아서 배열로 생성
  const params = [req.body.st_num, req.body.st_name, req.body.st_dept]; // input에서 입력받은것
  // query 문은 앞뒤에 빈칸을 넣어준다. 달라붙어버리기 때문.
  const sql = " INSERT INTO " + " tbl_student(st_num, st_name, st_dept) " + " VALUES(?,?,?) ";

  // query : 요청. mysqldb에 정보를 요청
  dbConn.query(sql, params, (err, result) => { // sql에 params 내용이 들어가서.. 보낸다
    // 여기서(이 query에서) 데이터가 추가되고나면
    if (err) {
      return res.render("INSERT SQL 오류");
      //오류가 아닐경우 정상출력이므로
    } else {
      //리스트 보여주기
      return res.redirect("/student"); // student 로 다시요청하라(redirect).
      //다시 만들지 않고 이미 만들어진 주소로 간다.
    }
  });
});

/*
 *
/  book/detail?book_code=0003
 / book/0003/detail    //위의 것보다 안전하다. 변수를 보여주지 않는다
 */
// 주소인것처럼 보낸다
router.get("/:st_num/detail", (req, res) => {
  const st_num = req.params.st_num; //요청받은 주소에서 stnum을 가져온다..(?) 주소가져올때param이니까
  const sql = "SELECT * FROM tbl_student " + " WHERE st_num = ? "; // ? 반드시필요함
  //여기서 쿼리가 걸러주기때문
  dbConn.query(sql, [st_num], (err, result) => {
    // []한개여도 배열로
    //st_num 의 값을 sql에 보내서 ?의 값을 대신한다
    res.json(result);
  });
});

// router 객체를 컴포넌트로 만들어 export 하기
export default router;
