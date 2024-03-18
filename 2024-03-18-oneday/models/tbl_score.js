import { Model } from "sequelize";

export default class tbl_score extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        c_seq: {
          autoIncrement: true,
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        c_sstdnum: {
          type: DataTypes.STRING(5),
          allowNull: false,
        },
        c_subject: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        c_score: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tbl_score",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "c_seq" }],
          },
        ],
      }
    );
  }
}
