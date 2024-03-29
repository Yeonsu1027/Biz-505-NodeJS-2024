/**
 * express generator ES6+ Template
 * @author : callor@callor.com
 * @since : 2020-12-10
 * @update : 2024-01-19
 * @see : nodejs + express 프로젝트에서 ES6+ 문법을 사용하기 위한 template
 */

// essential modules
import express from "express";
import createError from "http-errors";
import path from "path";
import helmet from "helmet";

// 3rd party lib modules
import cookieParser from "cookie-parser";
import logger from "morgan";

// import router modules
import indexRouter from "../routes/index.js";
import usersRouter from "../routes/users.js";
import naverRouter from "../routes/naver.js";
import apiRouter from "../routes/api.js";

// create express framework
const app = express();

// helmet security module
app.use(helmet());
const cspDirective = {
  directives: {
    // CSP 지시문
    // 우리 서버에 있는 것만 쓸거야
    defaultSrc: ["'self'"], // self'는 현재 도메인에서 이미지를 로드할 수 있음
    "img-src": [
      "'self'",
      "blob:",
      "data:",
      "https://shopping-phinf.pstatic.net",
    ], // 서버에서 만든 blob를 src 속성으로 쓰게 해달라  // blob : 미가공데이터
    // 위에 처럼 쓰면 내부에서 아래처럼 바뀐다(?)
    // imgSrc: ["'self'", "blob:", "data:"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      "https://fontawesome.com/",
    ],
    "style-src": [
      "'self'",
      "'unsafe-inline'",
      "https://fontawesome.com/",
    ],
  },
};
// https://fontawesome.com/

// 헬멧아 이 정책 풀어줘
// helmet 을 통해 막혀있는 정책 중 csp 를 일부 완화 하기
app.use(helmet.contentSecurityPolicy(cspDirective));

// Disable the fingerprinting of this web technology.
app.disable("x-powered-by");

// view engine setup
app.set("views", path.join("views"));
app.set("view engine", "pug");

// middleWare enable
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("public")));

// router link enable, link connection
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/naver", naverRouter);
app.use("/api", apiRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
