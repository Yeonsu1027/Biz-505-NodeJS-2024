import express from "express";
import moment from "moment";
import DB from "../models/index.js";
import { upLoad } from "../modules/fileUpload.js";
const MEMOS = DB.models.tbl_memos;
const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  /**
   * moment 를 사용하여 현재 날짜와 시간을 문자열로 getter
   */
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");
  try {
    const rows = await MEMOS.findAll();
    return res.render("index", { MEMOS: rows, toDate, toTime });
  } catch (error) {
    return res.json(error);
  }
  // index.pug 를 rendering 할때 사용하도록 보내주기
  // res.render("index", { toDate, toTime });
});

router.post("/", upLoad.single("m_image"), async (req, res) => {
  // console.log(req.body);
  const imageFile = req.file;
  const m_seq = req.query.seq;
  // console.log(imageFile);
  // try {
  req.body.m_image = imageFile?.filename;
  req.body.m_author = "callor@callor.com";
  // 쿼리에 seq 값이 전달되어있으면
  if (m_seq) {
    await MEMOS.update(req.body, { where: { m_seq } });
  } else {
    await MEMOS.create(req.body);
  }
  return res.redirect("/");
  // } catch (error) {
  //   return res.json(error);
  // }
});

router.get("/:seq/delete", async (req, res) => {
  const m_seq = req.params.seq;

  // PK 키 값으로 데이터를 SELECT 하고
  // 데이터 정보를 destroy 하여 데이터 삭제하는 방법
  const rows = await MEMOS.findByPk(m_seq);
  await rows.destroy();

  return res.redirect("/");
});

// 기존것
router.post("/update/:seq", upLoad.single("m_image"), async (req, res) => {
  const seq = req.params.seq;
  const imageFile = req.file;
  req.body.m_image = imageFile?.filename;
  req.body.m_author = "callor@callor.com";
  await MEMOS.update(req.body, { where: { m_seq: seq } });
  return res.redirect("/");
});

router.get("/:seq/get", async (req, res) => {
  const seq = req.params.seq;
  const row = await MEMOS.findByPk(seq);
  return res.json(row);
});

router.get("/get_new_date", async (req, res) => {
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");
  // JSON 의 변수(key)이름과 value의 이름이 같을때는 한번 생략가능
  // return res.json({ toDate: toDate, toTime: toTime });
  return res.json({ toDate, toTime });
});

export default router;
