import mysql from "mysql2";
/*
 * 사용하는 MySQL 의 database, user, password 를 입력한 후
 * 이 파일(mysql_sample.js)를 mysql.js 로 복사한 후    //중요한건 ignore에 넣어서 안올라가게//한번올라가면 안지워짐 주의
 * 프로젝트를 실행하시오
 */
const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "****",
  password: "*****",
  database: "*****",
}; // 변수만들고

const dbCreate = {
  // init 라는 함수만들기
  init: () => {
    console.log("MySQL DBMS Connection!!!");
    return mysql.createConnection(mysql_info); //위에서 만든변수로 연결한다. mysql커넥션 리턴
  },
};

export default dbCreate; //위에서 선언한 객체를 다른곳에서 모듈로 사용할 수 있도록
