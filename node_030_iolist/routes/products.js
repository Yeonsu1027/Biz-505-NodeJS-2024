import express from "express";
import DB from "../models/index.js";
const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await PRODUCTS.findAll(); //await 중요!! 담기는거 기다려야함
  return res.render("product/list", { PRODUCTS: rows });
});

router.get("/:pcode/detail", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
  // 상품코드 정보를 가져와서 가지고 iolist한테가서 join 하여 쓸 수있게한다..
  // FK있으면 가능한코드
  return res.render("product/detail", { PRODUCT: row });
});

export default router;
