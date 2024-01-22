# nodejs 프로젝트

- JS를 이용한 Wep Application Server 구현하기

## NodeJS 설치하기

- https://nodejs.org 에서 다운로드 받아 설치하기
- nodejs 는 짝수 버전을 다운받아 설치한다. : `v20.x.x`

## 데몬 설치

- `npm install -g nodemon` : 소스코드 모니터링을 하면서 소스가 변경되면
  자동으로 프로젝트를 재 시작하는 도구

  ## express 프로젝트 생성도구 설치

  - `npm install -g express-21c`

  ## express 프로젝트 생성도구 upgrade

  - `npm uninstall -g exrpress-21c` : 기존도구 제거
  - `npm install -g express-21c` : 새버전을 설치

  ## express framwork 프로젝트 생성을 로컬도구를 사용하여 실행하기

  -`express 프로젝트명`

  - `express-21c 가` upgrade 되었을때 매번 제거 설치를 해주어야 한다

  ## express 프로젝트 생성도구를 원격으로 실행하기

  - `express-21c`를 로컬에 설치하지 않고, 사용할때 원격의 패키지를 호출하여 사용하는 방법
  - `npx express-21c 프로젝트명`

  ## 그 이후 mysql 연결하기

  - `위에서 만든 express 프로젝트` 에서 터미널 열고
  - `npm install`
  - `npm install mysql2`
  - `nodemon`
