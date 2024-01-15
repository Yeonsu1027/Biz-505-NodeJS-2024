import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  const st_name = req.query.name || "이름을 전달해 주세요";
  const st_grade = req.query.grade || 0;
  const st_dept = req.query.dept || "학과를 전달해 주세요";
  const student = {
    name: st_name /* dto 객체, 요소변수 */,
    dept: st_dept,
    grade: st_grade,
  };

  res.render("users", student);
}); // route.get("/")

router.post("/", async (req, res) => {
  // const name = req.body.name;
  // const grade = req.body.grade;
  // const dept = req.body.dept  를 아래 한줄로 작성이 가능하다. body에 있는 3개의변수를 가져와서 {변수}에 넣어라

  const { name, grade, dept } = req.body;

  res.render("users", { name, grade, dept });
});

export default router;
