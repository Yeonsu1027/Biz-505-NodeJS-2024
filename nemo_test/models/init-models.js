import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _tbl_clear from  "./tbl_clear.js";
import _tbl_members from  "./tbl_members.js";
import _tbl_nemo from  "./tbl_nemo.js";
import _tbl_nemo_play from  "./tbl_nemo_play.js";

export default function initModels(sequelize) {
  const tbl_clear = _tbl_clear.init(sequelize, DataTypes);
  const tbl_members = _tbl_members.init(sequelize, DataTypes);
  const tbl_nemo = _tbl_nemo.init(sequelize, DataTypes);
  const tbl_nemo_play = _tbl_nemo_play.init(sequelize, DataTypes);


  return {
    tbl_clear,
    tbl_members,
    tbl_nemo,
    tbl_nemo_play,
  };
}
