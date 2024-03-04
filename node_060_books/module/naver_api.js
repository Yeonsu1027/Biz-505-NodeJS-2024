import {
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NAVER_BOOK_URL,
} from "../config/naver_secret.js"; // .js 붙이기

const getBooks = async (search) => {
  // naver 에 데이터 요청하기 위한 준비
  const naverFetchOption = {
    method: "GET",
    headers: {
      "X-Naver-Client-Id": NAVER_CLIENT_ID,
      "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
    },
  };
  let queryString = `${NAVER_BOOK_URL}?query=${search}&display=1`;
  let response = null;
  try {
    response = await fetch(queryString, naverFetchOption);
    // total 값을 찾고
    let count = (await response.json()).total; // 전체변수가 total에 담겨있음
    // 100 개넘으면 100개, 아니면 count 값 찾아오기
    count = count > 100 ? 100 : count; // 동시요청가능한 데이터 개수가 100개(네이버에 적혀있음)

    queryString = `${NAVER_BOOK_URL}?query=${search}&display=${count}`;
    response = await fetch(queryString, naverFetchOption);

    return (await response.json()).items; // item 안에 데이터담겨있었음.
  } catch (error) {
    console.log(error);
    // catch 가 실행되었다 = naver에서 오류메시지를 보냈다.

    // thorw : 나를 호출한(router) 곳으로 exception 을 전달하라
    // 새로운 오류메시지를 만들어서 전달하라
    throw new Error("Naver 통신 오류");
  }
};

export { getBooks };
