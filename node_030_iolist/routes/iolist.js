import express from "express";

import DB from "../models/index.js";
const IOLIST = DB.models.tbl_iolist;

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rows = await IOLIST.findAll(); //테이블정보 가져와서 넣기
    return res.render("iolist/list", { IOLIST: rows });
  } catch (error) {
    return res.json(error);
  }
});

router.get("/insert", (req, res) => {
  const user = req.session?.user; // 세션에 담긴 유저정보를 꺼낸다
  if (user) {
    return res.render("iolist/input");
  } else {
    // 로그인 안되어있으면
    const message = "로그인이 필요한 서비스 입니다";
    return res.redirect(`/users/login?fail=${message}`);
  }
});

export default router;
