import express from "express";
import DB from "../models/index.js";

import { upLoad } from "../modules/file_upload.js"; //{}만쳐도 바로 from 자동작성

const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await PRODUCTS.findAll({ limit: 10, order: [["p_code", "ASC"]] }); //await 중요!! 담기는거 기다려야함 //
  return res.render("product/list", { PRODUCTS: rows }); // limit: 몇개까지만 보이게
});

// router.get("/input", (req, res) => {
//   return res.render("product/input");
// });

router.get("/insert", async (req, res) => {
  return res.render("product/input");
}); //상품추가페이지

// 중간에 파일이 있으면 가로채서 파일업로드 작업수행
// p_image 는 pug의 img input tag의 name
// upLoad 미들웨어의 single()함수
router.post("/insert", upLoad.single("p_image"), (req, res) => {
  // single : 하나의 이미지만 받겠다

  const file = req.file;

  return res.json({ body: req.body, file });
});

router.get("/:pcode/detail", async (req, res) => {
  const pcode = req.params.pcode;
  // detail 원래것
  // const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
  const row = await PRODUCTS.findByPk(pcode); // 디테일용 직접쓴거..!!!!!
  // 상품코드 정보를 가져와서 가지고 iolist한테가서 join 하여 쓸 수있게한다..
  // FK있으면 가능한코드
  return res.render("product/detail2", { PRODUCT: row });
});

// // 수정만들어보기.. 일단 수정하는 곳으로 보내고
// router.get("/:pcode/update", async (req, res) => {
//   return res.render("product/insert");
// });

router.post("/:pcode/update", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode);
  return res.render("product/insert", { product: row });
});

export default router;
