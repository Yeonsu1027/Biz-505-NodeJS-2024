import { Model } from "sequelize";

export default class tbl_clear extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        c_id: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        c_stage: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        c_level: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        c_clear: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_clear",
        timestamps: false,
      }
    );
  }
}
