import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_score from "./tbl_score.js";
import _tbl_student from "./tbl_student.js";
import _tbl_subject from "./tbl_subject.js";

export default function initModels(sequelize) {
  const tbl_score = _tbl_score.init(sequelize, DataTypes);
  const tbl_student = _tbl_student.init(sequelize, DataTypes);
  const tbl_subject = _tbl_subject.init(sequelize, DataTypes);

  tbl_score.belongsTo(tbl_student, {
    as: "c_sstdnum_tbl_student",
    foreignKey: "c_sstdnum",
  });
  tbl_student.hasMany(tbl_score, {
    as: "tbl_scores",
    foreignKey: "c_sstdnum",
  });
  tbl_score.belongsTo(tbl_subject, {
    as: "c_subject_tbl_subject",
    foreignKey: "c_subject",
  });
  tbl_subject.hasMany(tbl_score, {
    as: "tbl_scores",
    foreignKey: "c_subject",
  });

  return {
    tbl_score,
    tbl_student,
    tbl_subject,
  };
}
