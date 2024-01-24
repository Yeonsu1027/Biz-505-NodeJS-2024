import Sequelize from "sequelize"; // 대문자 from 소문자 주의
const book = (sequelize) => {
  // json데이터를 변수로 선언한다. (json 객체변수 "변수이름:값" 이들어있다)
  const book_table = {
    // mysql 입력 형식을 몰라도 sequelize 가 알아서 해준다
    // json 안에 json
    isbn: {
      // import 문의 대문자 se는 여기로
      type: Sequelize.DataTypes.STRING(13),
      primaryKey: true, // PK 선언
      defaultValue: "",
    },
    title: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // Not Null 선언
      defaultValue: "", // 기본 default 값이 언디파인드여서
    },
    author: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // Not Null 선언
      defaultValue: "",
    },
    publisher: {
      type: Sequelize.DataTypes.STRING(50),
      allowNull: false, // Not Null 선언
      defaultValue: "",
    },
    price: {
      type: Sequelize.DataTypes.INTEGER(50),
      defaultValue: 0,
    },
    discount: {
      type: Sequelize.DataTypes.INTEGER(50),
      defaultValue: 0,
    },
  };
  // import 문의 소문자가 여기로.
  // define() 메서드는 데이터베이스 테이블의 모델을 정의하는 역할
  // define("이이름의 테이블생성", 테이블의열과형식)
  return sequelize.define("tbl_books", book_table, {
    // sequelize 라는 변수를 선언하고,
    // book 함수에서 매개변수로 받은 sequelize 를
    // 값으로 세팅한다
    // 단 선언하는 변수명과, 세팅하는 값이 담긴 변수명이 같으면 값이 담긴 변수명을
    // 생략 할수 있다.
    // -> sequelize  이렇게만 써도된다.
    sequelize: sequelize, //"1번:2번" 2번째 se~는 위에서 매개변수로 받은것.
    // 앞에건 define에게 보내는것
    // json data는 이름이 같으면 생략이 가능하다 -> sequelize  이렇게만 써도된다.
    tableName: "tbl_books",
    timestamps: false,
  });
};

export default book;
