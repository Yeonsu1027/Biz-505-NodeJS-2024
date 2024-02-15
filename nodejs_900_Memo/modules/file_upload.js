/**
 * 파일이 업로드 되면
 * 업로드 된 파일을 저장폴더에 저장하는 미들웨어
 */
// import fs from "fs"
// fs.existsSync()
// fs 모듈에서 existsSync() 함수와 mkdirSync() 함수만 사용하겠다
import { existsSync, mkdirSync } from "fs";
import path from "path";
import multer from "multer";
// uuid 모듈에 있는 v4() 함수를 uuid() 라는 이름으로 사용하겠다
import { v4 as uuid } from "uuid";
// 프로젝트의 물리적 저장소 경로(path)
// 사용자이름~/Document/workspace/nodejs/node_030/iolist
const appRoot = process.env.PWD; //현재폴더의 이름을 가져와라
// 사용자이름~/Document/workspace/nodejs/node_030/iolist/public/uploads 이런이름의 폴더를 만들어라
const upLoadPath = path.join(appRoot, "public", "uploads");


// client가 file > router > upLoad > req 순으로 흐름
/**
 * multer 는 destination 과 filename 이라는 2개의 함수가 필요하다
 * destination : 파일을 저장할때 사용할 설정들
 * filename : 파일 이름에 대한 핸들링
 */

// json 타입으로 데이터셋팅 
// multer가제공
const storageOption = {
  //파일이도착하면
  destination: async (req, file, callback) => {
    if (!existsSync(upLoadPath)) {
      //업로드패스가있는지 확인하고
      mkdirSync(upLoadPath); //없으면 만든다
    }
    // multer 야 나머지는 네가 처리해
    callback(null, upLoadPath);  // 폴더가없으면 만들어주고
  },

  filename: (req, file, callback) => {
    // image name injection 해킹공격에 대비하여
    // 원래 이름을 변경하여 업로드 하도록 지시
    const upFileName = `${uuid()}-${file.originalname}`;
    // 16진수 문자열을 jpg이름에추가
    callback(null, upFileName);
  },
};

const storage = multer.diskStorage(storageOption); //multer 사용설정
const upLoad = multer({ storage });

export { upLoad }; // 함수이름 직접 내보내기

//      -- ** 위에는 분리(?)한거
// const upLoad = multer({
//   storage: multer.diskStorage({
//     
//     destination: async (req, file, callback) => {
//       // upLoadPath 가없냐?
//       if (!existsSync(upLoadPath)) {
//         //recursive:true : 다만들어라. 기본값
//         mkdirSync(upLoadPath, { recursive: true }); // 업로드패스에 해당하는 폴더만들어라
//       }
//       
//       callback(null, upLoadPath);
//     },
//     filename: (req, file, callback) => {
//       callback(null, file.originalname); // 파일이름 그대로 전달
//     },
//   }),
// });
