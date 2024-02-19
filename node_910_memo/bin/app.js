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

// MySQL Sequelize
import DB from "../models/index.js";

// import router modules
import indexRouter from "../routes/index.js";
import usersRouter from "../routes/users.js";

// create express framework
const app = express();

// helmet security module
app.use(helmet());

/*
img-src 정책
URL.objectCreateURL() 함수를 사용하여
가상으로 생성된 이미지를 img tag 의 src(소스)로
사용할 수 있도록 정책 설정하기
*/

const cspDirective = {
  directives: { // CSP 지시문
    // 우리 서버에 있는 것만 쓸거야
    defaultSrc: ["'self'"],         // self'는 현재 도메인에서 이미지를 로드할 수 있음
    "img-src": ["'self'", "blob:", "data:"], // 서버에서 만든 blob를 src 속성으로 쓰게 해달라  // blob : 미가공데이터
    // 위에 처럼 쓰면 내부에서 아래처럼 바뀐다(?)
    // imgSrc: ["'self'", "blob:", "data:"],
    "script-src": ["'self'", "'unsafe-inline'", "https://fontawesome.com/"],
    "style-src": ["'self'", "'unsafe-inline'", "https://fontawesome.com/"],
    /*
    CSP 지시문 이란? 다양한 리소스에 대한 로드를 제한하고, 허용되는 출처 및 리소스 유형을 명시합니다. 이를 통해 악성 스크립트의 실행, XSS 공격, 데이터 유출 등을 방지할 수 있습니다.

  CSP 지시문은 다음과 같은 규칙으로 구성될 수 있습니다:

  default-src: 기본 소스로 사용할 출처를 지정합니다.
  script-src: JavaScript 파일의 로드 및 실행을 허용하는 출처를 지정합니다.
  style-src: CSS 스타일시트 파일의 로드를 허용하는 출처를 지정합니다.
  img-src: 이미지 리소스의 로드를 허용하는 출처를 지정합니다.
  font-src: 폰트 파일의 로드를 허용하는 출처를 지정합니다.
  connect-src: AJAX, WebSocket 등의 네트워크 연결을 허용하는 출처를 지정합니다.
  media-src: 미디어 리소스(오디오, 비디오)의 로드를 허용하는 출처를 지정합니다.
  frame-src: iframe 내부의 웹 페이지 로드를 허용하는 출처를 지정합니다.
    */
  },
};
// https://fontawesome.com/

// 헬멧아 이 정책 풀어줘
// helmet 을 통해 막혀있는 정책 중 csp 를 일부 완화 하기
app.use(helmet.contentSecurityPolicy(cspDirective)); //cspDirective는 이전에 정의된 CSP 지시문을 포함하는 JavaScript 객체
// cspDirective 객체는 CSP 지시문을 구성하는 다양한 속성을 가지고 있다.
// 이 객체를 helmet.contentSecurityPolicy() 함수에 전달하여 CSP를 설정할 수 있다
// 이를 통해 웹 애플리케이션의 보안을 강화하고, 허용되지 않은 리소스의 로드를 방지할 수 있다

// MySQL DB 연결
// 주의!!! force 를 true 로 하면 기존의 Table 을 모두 DROP 한 후 재생성 한다
DB.sequelize.sync({ force: false }).then((dbConn) => {
  console.log(dbConn.options.host, dbConn.config.database, "DB Connection OK");
});

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
