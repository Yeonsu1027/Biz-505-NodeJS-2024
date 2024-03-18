import { Model } from "sequelize";

export default class tbl_student extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        s_stdnum: {
          type: DataTypes.STRING(5),
          allowNull: false,
          primaryKey: true,
        },
        s_name: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        s_dept: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        s_grade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        s_tel: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
        s_address: {
          type: DataTypes.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "tbl_student",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "s_stdnum" }],
          },
        ],
      }
    );
  }
}
