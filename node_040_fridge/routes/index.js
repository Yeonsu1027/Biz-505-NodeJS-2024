import express from "express";
import DB from "../models/index.js";
import moment from "moment";
import { Op } from "sequelize";

const router = express.Router();
const PRODUCT = DB.models.tbl_product;

/* GET home page. */
router.get("/", async (req, res, next) => {
  // 현재날짜를 문자열 연월일로 가져오기
  const today = moment().format("YYYY-MM-DD");
  /**
   * JS 에서 제공하는 Data 라는 클래스가 있지만
   * 사용이 매우 불편하다
   * 또한 날자와 관련하여 여러 이슈가 있다
   * 통상 JS 에서는 moment 도국 날짜 관련하여 거의 표준처럼 사용한다
   *
   * 단순히 moment() 를 실행하면 현재 날짜를 컴퓨터 표준 표시 방식으로 보여준다
   * .format() 함수를 더하여 원하는 형식의 날짜 문자열로 만들 수 있다
   *
   * .add(값,type) : 현재날짜에 값을 더한 날짜 구하기
   * .subtract(값, type) : 현재날짜에서 값을 뺀 날짜 구하기
   *
   */
  // 오늘부터 5일후 날짜를 기준으로 유통기한이 임박한 상품 리스트를
  // 보고싶다
  const exDate = moment().add(5, "days").format("YYYY-MM-DD"); // HH:mm:ss : 날짜와시간

  /**
   *  값보다 큰가작은가
   * Op.gt : greate then : 변수 > 값
   * Op.lt : less then : 변수 < 값
   * Op.gte : greate then and queal : 변수 >= 값
   * Op.lte : less then and queal : 변수 <= 값
   */
  const rows = await PRODUCT.findAll({
    where: {
      p_exdate: { [Op.lte]: exDate },
    },
    order: [
      ["p_exdate", "DESC"], // 유통기한 많은거부터
      ["p_date", "ASC"],
    ],
  });
  return res.json({ today, exDate, result: rows });
});

export default router;
