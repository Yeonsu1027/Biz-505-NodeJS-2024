import express from "express";
import moment from "moment";
import DB from "../models/index.js";
import { upLoad } from "../modules/fileUpload.js";

const MEMOS = DB.models.tbl_memos;

const router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  /*
  moment 를 사용하여 현재 날짜와 시간을 문자열로 getter
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
  const imageFile = req.file;
  try {
    req.body.m_image = imageFile?.filename; // ? 로if문
    req.body.m_author = "rito1205@naver.com"; /*인풋없어도 집어넣을 수 있다..*/
    console.log(req.body);
    await MEMOS.create(req.body);
    return res.redirect("/");
  } catch (error) {
    return res.json(error);
  }
});

router.get("/get_new_date", async (req, res) => {
  const toDate = moment().format("YYYY-MM-DD");
  const toTime = moment().format("HH:mm:ss");

  // JSON 의 변수(key)이름과 value의 이름이 같을때는 한번 생략 가능
  return res.json({ toDate: toDate, toTime: toTime }); // 하나씩만써도됨
});

export default router;
