import mysql from "mysql2/promise"; // promise 동기방식
const mysql_info = {
  host: "localhost",
  port: "3306",
  user: "root",
  password: "000000",
  database: "bookdb2",
};

/*
동기식으로 DB 연결 설정하기
async() 로 시작하고
각 실행 함수 앞에 await 를 붙여주면
await 로 시작하는 함수가 완료될때까지 blocking 된다
*/
const dbCreate = {
  init: async () => {
    // mysql 연결끝날때까지 기다려
    const connection = await mysql.createConnection(mysql_info);
    return connection;
  },
};

export default dbCreate;
