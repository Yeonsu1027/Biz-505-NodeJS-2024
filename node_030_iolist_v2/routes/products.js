import express from "express";
import DB from "../models/index.js";

import { upLoad } from "../modules/file_upload.js"; //{}만쳐도 바로 from 자동작성

//sequelize 를 사용할때 추가로 제공되는 확장 연산자
import { Op } from "sequelize";

const PRODUCTS = DB.models.tbl_products;
const IOLIST = DB.models.tbl_iolist;
const DEPTS = DB.models.tbl_depts;

const router = express.Router();

router.get("/", async (req, res) => {
  const p_search = req.query.p_search || ""; // p_search 에담긴 검색어/ 없으면 빈칸취급
  // "" : WHERE p_name LIKE '%%'; -- 전체데이터 셀렉트
  const sort = req.query.sort || "p_code"; // sort가 없으면 상품코드로검색
  const order = req.query.order || "ASC"; // order 가없으면 ASC로검색 :기본값을 지정해준다

  const rows = await PRODUCTS.findAll({
    where: {
      [Op.or]: [
        { p_name: { [Op.like]: `%${p_search}%` } }, // like 연산자 식
        { p_code: `${p_search}` },
      ],
    },
    order: [[sort, order]],
  }); //await 중요!! 담기는거 기다려야함 //
  return res.render("product/list", { PRODUCTS: rows, p_search }); // order 앞에 limit: 10, limit: 몇개까지만 보이게
  // p_serarch 를 다시 렌더한테 보내준다 : 검색창에 입력한 검색어가 남게하기위함
});

// router.post("/", async (req, res) => {
//   // 상품 이름을 검색해서..???
//   const rows = await PRODUCTS.findAll({ order: [["p_name"]] });
//   return res.json({ rows });
// });

// router.get("/input", (req, res) => {
//   return res.render("product/input");
// });

router.get("/insert", async (req, res) => {
  return res.render("product/input");
}); //상품추가페이지

/**
 * 상품코드는 1자리의 Prifix(P)와 5자리의 연속된 일련번호 형식
 * 상품코드는 중복되면 절대 안되고,빈(blank, empty) 값도 안된다
 * 규칙이 자릿수가 일정한 형태
 *
 * 새로운 상품코드를 생성하기 위하여
 * 1. 기존의 DB Table 에서 가장 큰 상품코드 값을 추출하기
 * 2. Prefix 를 분리
 * 3. 숫자 부분을 분리
 * 4. 숫자부분의 문자열을 숫자로 변경하고 +1 을 실행
 * 5. Prefix 와 숫자부분을 결합하여 코드로 생성
 * 6. 숫자부분의 자릿수를 맞추고 공백부분은 0으로 채워넣어야 한다
 */
const makePCode = (pcode) => {
  const pCodePrefix = pcode.substring(0, 1); //P
  let pCodeNum = pcode.substring(1); // 1번 index 이후의 값(숫자부분만) //얘가14면
  const pCodeNumLength = pCodeNum.length; // 문자열 길이추출

  pCodeNum = String(Number(pCodeNum) + 1); // 얜15 : 문자로바꿈
  pCodeNum = "0000000000" + pCodeNum;
  // pCodeNum.length = 10 + 숫자 자릿수  // 숫자가 15면 현재 12자리
  // pCodeNum 의 전체 길이에서 원래 코드 숫자부분의 길이 만큼 뺀 위치부터
  // 문자열 잘라내기
  pCodeNum = pCodeNum.substring(pCodeNum.length - pCodeNumLength);

  return `${pCodePrefix}${pCodeNum}`;
};

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

// 중간에 파일이 있으면 가로채서 파일업로드 작업수행
// p_image 는 pug의 img input tag의 name
// upLoad 미들웨어의 single()함수
router.post("/insert", upLoad.single("p_image"), async (req, res) => {
  // single : 하나의 이미지만 받겠다

  // 중복검사대신 새코드를 생성한다
  let pCode = req.body.p_code;
  if (pCode === "000") {
    // findeAll() 을 실행한 결과는 비록 SELECT 된 결과가 0개또는 1개 뿐이지만
    // 결과는 배열(List) type 이다
    const rows = await PRODUCTS.findAll({ order: [["p_code", "DESC"]], limit: 1 }); // pcode 역순정렬해서 1개만 추출(한개여도배열)
    pCode = rows[0].p_code; // 0번위치코드 : 마지막 p_code
    pCode = makePCodeNew(pCode); //make에 마지막 p_code 전달해서 거기에+1 된 새로운 p_code 받기
    req.body.p_code = pCode; // 상품코드입력에 코드 집어넣기
  }

  const file = req.file;
  // 사진을 넣으면(사진이있으면)
  if (file) {
    // 사진파일 집어넣기
    req.body.p_image_name = file.filename;
    req.body.p_image_origin_name = file.originalname;
  }

  try {
    await PRODUCTS.create(req.body); // 데이터추가명령
    return res.redirect("/products/"); // 리스트로 점프 추가된거보여주기
  } catch (error) {
    return res.json(error);
  }
  // return res.json({ body: req.body, file });
});

router.get("/:pcode/detail", async (req, res) => {
  const pcode = req.params.pcode;
  // detail 원래것
  // const row = await PRODUCTS.findByPk(pcode, { include: { model: IOLIST, as: "IOS", include: { model: DEPTS, as: "IO_거래처" } } });
  const row = await PRODUCTS.findByPk(pcode); // 디테일용 직접쓴거..!!!!!
  // 상품코드 정보를 가져와서 가지고 iolist한테가서 join 하여 쓸 수있게한다..
  // FK있으면 가능한코드
  return res.render("product/detail", { PRODUCT: row });
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
