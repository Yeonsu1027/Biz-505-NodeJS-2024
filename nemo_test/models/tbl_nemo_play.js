import { Model } from "sequelize";

export default class tbl_nemo_play extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        p_id: {
          type: DataTypes.STRING(20),
          allowNull: false,
          primaryKey: true,
        },
        p_num: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        p_row_num: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        p_block1: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block2: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block3: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block4: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block5: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block6: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block7: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block8: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block9: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block10: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block11: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block12: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block13: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block14: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        p_block15: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_nemo_play",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [
              { name: "p_id" },
              { name: "p_num" },
              { name: "p_row_num" },
            ],
          },
        ],
      }
    );
  }
}
