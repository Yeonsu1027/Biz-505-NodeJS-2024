import express from "express";
import DB from "../models/index.js";
import moment from "moment";

import { upLoad } from "../modules/file_upload.js";

const MEMO = DB.models.tbl_memo;

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  const rows = await MEMO.findAll();
  res.render("layout", { list: rows });
  //res.render("layout");
});

router.get("/insert", async (req, res) => {
  res.render("input");
});

router.post("/insert", upLoad.single("m_image"), async (req, res) => {
  const today = moment().format("YYYY-MM-DD");
  const nowtime = moment().format("HH:MM:SS");

  // 날짜 시간 자동입력
  req.body.m_data = today;
  req.body.m_time = nowtime;
  req.body.m_author = "rito1205@naver.com"; // 작성자 자동입력

  //------------------------------------ 일련번호 자동입력
  const one = await MEMO.findByPk(1);
  if (one) {
    const num = await MEMO.findAll({ order: [["m_seq", "DESC"]], limit: 1 });
    const numnum = num[0].m_seq;
    const newnum = Number(numnum) + 1;

    req.body.m_seq = newnum; // 입력데이터 일련번호 자동생성
  } else {
    req.body.m_seq = 1;
  }

  //-------------- 사진 넣기 --------------
  const file = req.file;

  if (file) {
    // 사진파일 집어넣기
    req.body.m_image = file.filename;
  }

  try {
    await MEMO.create(req.body); // 데이터추가명령
    return res.redirect("/"); //리스트로
    //return res.json(test);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/:seq/detail", async (req, res) => {
  const seq = req.params.seq;

  const row = await MEMO.findByPk(seq);

  return res.render("detail", { MEMO: row });
});

//-------- 수정하기
router.get("/:seq/update", async (req, res) => {
  const seq = req.params.seq;
  const row = await MEMO.findByPk(seq);
  return res.render("input", { MEMO: row });
});

router.post("/:seq/update", upLoad.single("m_image"), async (req, res) => {
  const seq = req.params.seq;

  MEMO.update(
    {
      // m_author: "rito1205@naver.com",
      m_date: moment().format("YYYY-MM-DD"),
      m_time: moment().format("HH:MM:SS"),
      m_seq: req.body.m_seq,
      m_memo: req.body.m_memo,
      m_image: req.file.filename,
    },
    {
      where: { m_seq: seq },
    }
  ).then(() => {
    res.redirect("/"); // 수정하고 다시보여주기
  });
});

//----------- 삭제하기

router.get("/:seq/delete", async (req, res) => {
  MEMO.destroy({ where: { m_seq: req.params.seq } }).then(() => {
    res.redirect("/");
  });
});

export default router;
