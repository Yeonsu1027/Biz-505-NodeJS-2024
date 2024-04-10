router.post('/', async (req, res) => {
  try {
    const id = 'user1'; // p_id를 'user1'로 설정
    const num = 1; // p_num을 1로 설정

    // 클라이언트로부터 받은 데이터 추출
    const requestData = req.body;

    // 각 체크박스에 대한 정보를 데이터베이스에 저장
    for (let key in requestData) {
      // key 값에서 칸 번호와 행 번호 추출
      const keySplit = key.split('_');
      const blockNum = parseInt(keySplit[1]);
      const rowNum = Math.ceil(blockNum / 5);

      // 해당 행, 칸에 대한 정보를 데이터베이스에 저장
      const existingRow = await PLAY.findOne({ where: { p_id: id, p_num: num, p_row_num: rowNum } });
      if (existingRow) {
        // 이미 행이 존재하는 경우 해당 행을 업데이트할 수 있도록 수정
        await PLAY.update({
          [`p_block${blockNum}`]: requestData[key]
        }, { where: { p_id: id, p_num: num, p_row_num: rowNum } });
      } else {
        // 데이터베이스에 존재하지 않는 경우 새로운 행 추가
        await PLAY.create({
          p_id: id, // p_id 설정
          p_num: num, // p_num 설정
          p_row_num: rowNum,
          [`p_block${blockNum}`]: requestData[key]
        });
      }
    }

    // 저장이 완료되면 클라이언트에게 성공 응답 전송
    res.status(200).json({ message: 'Data saved successfully' });
  } catch (error) {
    // 오류가 발생하면 클라이언트에게 오류 응답 전송
    console.error('Error saving data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
