import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_score from  "./tbl_score.js";
import _tbl_student from  "./tbl_student.js";
import _tbl_subject from  "./tbl_subject.js";

export default function initModels(sequelize) {
  const tbl_score = _tbl_score.init(sequelize, DataTypes);
  const tbl_student = _tbl_student.init(sequelize, DataTypes);
  const tbl_subject = _tbl_subject.init(sequelize, DataTypes);


  return {
    tbl_score,
    tbl_student,
    tbl_subject,
  };
}
