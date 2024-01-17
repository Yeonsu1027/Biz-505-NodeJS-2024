/**
 * express 프레임워크를 사용하여
 * router 객체 생성
 */
import express from "express";
const router = express.Router();

// localhost:3000/student/         앞 student는 app.js에서 받고, 마지막/가
//주소창에 /로 요청을하면
router.get("/", async (req, res) => {
  // '/' 라는 경로를 요청받으면 // 실제로는 /student
  res.render("student/list"); //이pug를 렌더링
});

// localhost:3000/student/insert
router.get("/insert", (req, res) => {
  res.render("student/input"); // input.pug 를 열어라 파일이름/pug
});

// router 객체를 다른곳에서 import 할 수 있도록 export 하기
export default router;
