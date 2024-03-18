import express from "express";
import DB from "../models/index.js";

const STD = DB.models.tbl_student;
const SCORE = DB.models.tbl_score;
const SUBJECT = DB.models.tbl_subject;

//sequelize 를 사용할때 추가로 제공되는 확장 연산자
import { Op } from "sequelize";

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const s_search = req.query.s_search || "";
  const sort = req.query.sort || "s_stdnum"; // 학생 코드나 다른 기준으로 정렬할 수 있습니다.
  const order = req.query.order || "ASC"; // 오름차순(ASC) 또는 내림차순(DESC) 정렬

  const students = await STD.findAll({
    where: {
      [Op.or]: [
        { s_name: { [Op.like]: `%${s_search}%` } }, // 이름으로 검색
        { s_stdnum: `${s_search}` }, // 학번으로 검색
      ],
    },
    order: [[sort, order]],
  });

  const stds = await STD.findAll();
  return res.render("layout", { stds, students, s_search });
});
//  `/${std_num}/detail` 디테일 주소

router.get("/:std_num/detail", async (req, res) => {
  const s_search = req.query.s_search || "";
  const sort = req.query.sort || "s_stdnum"; // 학생 코드나 다른 기준으로 정렬할 수 있습니다.
  const order = req.query.order || "ASC"; // 오름차순(ASC) 또는 내림차순(DESC) 정렬

  const students = await STD.findAll({
    where: {
      [Op.or]: [
        { s_name: { [Op.like]: `%${s_search}%` } }, // 이름으로 검색
        { s_stdnum: `${s_search}` }, // 학번으로 검색
      ],
    },
    order: [[sort, order]],
  });
  // --------------------------------
  const stds = await STD.findAll();
  // ------------------------------------

  const std_num = req.params.std_num;
  const std = await STD.findByPk(std_num);
  const scores = await SCORE.findAll({
    where: {
      c_sstdnum: std_num,
    },
  });

  // -----------------------
  let totalScore = 0;
  scores.forEach((score) => {
    totalScore += score.c_score;
  });
  const avgScore = scores.length > 0 ? totalScore / scores.length : 0;

  // 계산된 총점과 평균 점수를 응답 객체에 추가
  std.dataValues.totalScore = totalScore;
  std.dataValues.avgScore = avgScore;

  return res.render("index", {
    std,
    stds,
    scores,
    totalScore,
    avgScore,
    students,
    s_search,
  });
});

// ------ 학생정보 추가

router.get("/insert_std", async (req, res) => {
  // const stds = await STD.findAll(); //layout용
  return res.render("std_input");
});

// --------------------------------------------
const makePCodeNew = (pcode) => {
  const pCodePrefix = pcode.substring(0, 1);
  let pCodeNum = pcode.substring(1);
  const pCodeNumLength = pCodeNum.length;

  pCodeNum = String(Number(pCodeNum) + 1);
  /**
   * 문자열.padStart(길이, 패턴)
   *
   * 문자열 값을 전체 "길이" 개수만큼 만들고
   * 왼쪽에 비어있는 곳은 "패턴"으로 채워넣은 문자열을 생성하라
   *
   */
  // (전체자릿수)length만큼 0을 채워넣어라 Start:앞에다가 / padEnd 도있음:뒤에부터채워라
  pCodeNum = pCodeNum.padStart(pCodeNumLength, "0");
  return `${pCodePrefix}${pCodeNum}`;
};
// --------------------------------------------
router.post("/insert_std", async (req, res) => {
  // 학번생성하기
  const stdnum_check = await STD.findAll({
    order: [["s_stdnum", "DESC"]],
    limit: 1,
  });
  let stdnum = stdnum_check[0].s_stdnum; // 마지막입력된 학번
  stdnum = makePCodeNew(stdnum);
  // --------------------
  req.body.s_stdnum = stdnum;

  await STD.create(req.body);
  return res.redirect("/");
});
// 학생정보 삭제
router.get("/:std_num/delete", async (req, res) => {
  const std_num = req.params.std_num;

  // 삭제
  await SCORE.destroy({ where: { c_sstdnum: std_num } }); // 성적정보
  await STD.destroy({ where: { s_stdnum: std_num } }); // 학생정보

  return res.redirect("/");
});
// ----------------- 학생정보 수정
router.get("/update/:stdnum", async (req, res) => {
  const std_num = req.params.stdnum;
  const row = await STD.findByPk(std_num);
  // res.json({ row });
  return res.render("std_input", { row });
});

router.post("/update/:stdnum", async (req, res) => {
  const std_num = req.params.stdnum;
  await STD.update(req.body, { where: { s_stdnum: std_num } });
  return res.redirect(`/${std_num}/detail`);
});

// ---------- 성적정보 추가!!!  수정도 한 번에 될것 같은데??
// /add/score/${stdnum}
router.get("/add/score/:stdnum", async (req, res) => {
  const std_num = req.params.stdnum;

  const std = await STD.findByPk(std_num);
  return res.render("score_input", { std });
});

router.post("/add/score/:stdnum", async (req, res) => {
  const std_num = req.params.stdnum;
  const subject = req.body.c_subject;

  // 성적데이터
  const have = await SCORE.findAll({
    where: {
      c_sstdnum: std_num,
      c_subject: subject,
    },
  });

  // 있으면 업데이트하고
  if (have.length > 0) {
    // 변경된 부분
    await SCORE.update(req.body, {
      // 업데이트할 데이터 추가
      where: {
        c_sstdnum: std_num,
        c_subject: subject,
      },
    });
  } else {
    // 없으면 생성
    req.body.c_sstdnum = std_num;
    await SCORE.create(req.body);
  }

  return res.redirect(`/${std_num}/detail`);
});

// -------------- 성적정보 수정
// `/update/score/${stdnum}`
router.get("/update/score/:stdnum", async (req, res) => {
  const std_num = req.params.stdnum;
  const std = await STD.findByPk(std_num);
  return res.render("score_input", { std });
});

// --------- 성적정보 삭제
// `/delete/score/${stdnum}`
router.get("/delete/score/:stdnum", async (req, res) => {
  const std_num = req.params.stdnum;
  await SCORE.destroy({ where: { c_sstdnum: std_num } });
  return res.redirect(`/${std_num}/detail`);
});

// -------- 과목별삭제
router.get("/delete/score/:stdnum/:subject", async (req, res) => {
  const std_num = req.params.stdnum;
  const subject = req.params.subject;

  await SCORE.destroy({
    where: { c_sstdnum: std_num, c_subject: subject },
  });
  return res.redirect(`/${std_num}/detail`);
});
// router.get("/insert_score", async (req, res) => {
//   const s_search = req.query.s_search || "";
//   const sort = req.query.sort || "s_stdnum"; // 학생 코드나 다른 기준으로 정렬할 수 있습니다.
//   const order = req.query.order || "ASC"; // 오름차순(ASC) 또는 내림차순(DESC) 정렬

//   const students = await STD.findAll({
//     where: {
//       [Op.or]: [
//         { s_name: { [Op.like]: `%${s_search}%` } }, // 이름으로 검색
//         { s_stdnum: `${s_search}` }, // 학번으로 검색
//       ],
//     },
//     order: [[sort, order]],
//   });

//   return res.render("score_input", { students, s_search });
// });
// router.get("/insert_score/:std.s_stdnum", async (req, res) => {
//   const std_num = req.params.std.s_stdnum;

//   const std = await STD.findByPk(std_num);
// });

router.get("/1111", async (req, res) => {
  return res.render("test");
});

export default router;
