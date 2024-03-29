import express from "express";
import DB from "../models/index.js";
const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;
const router = express.Router();

router.get("/", async (req, res) => {
  const rows = await PRODUCTS.findAll({ limit: 10, order: [["p_code", "ASC"]] }); //await 중요!! 담기는거 기다려야함 //
  return res.render("product/list", { PRODUCTS: rows }); // limit: 몇개까지만 보이게
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

router.get("/insert", async (req, res) => {
  return res.render("product/insert");
}); //상품추가페이지

// 수정만들어보기.. 일단 수정하는 곳으로 보내고
router.get("/:pcode/update", async (req, res) => {
  return res.render("product/insert");
});

router.post("/:pcode/update", async (req, res) => {
  const pcode = req.params.pcode;
  const row = await PRODUCTS.findByPk(pcode);
  return res.render("product/insert", { product: row });
});
//----------------------------------------------

// 추가하기 만들어보기...
// router.post("/insert", async (req, res) => {
//   const p_code = req.body.p_code; // 이게맞나? 너무많은데
//   const p_name = req.body.p_name;
//   const p_item = req.body.p_item;
//   const p_std = req.body.p_std;
//   const p_iprice = req.body.p_iprice;
//   const p_oprice = req.body.p_oprice;
//   const rows = { p_code, p_name, p_item, p_std, p_iprice, p_oprice };
//   const add = await PRODUCTS.push(rows);
//   return res.replace("product/list", { add });
// });

//조회만들어보기
// router.post("/:pcode/detail",async (req,res)=>{
//   const pname = req.body.p_name  //입력받은거.. 검색하게..
// return res.render("product/detail"{pname});  이름검색해서 어떻게 코드가져와..?
// })

export default router;
