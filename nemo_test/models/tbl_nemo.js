import { Model } from "sequelize";

export default class tbl_nemo extends Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        n_num: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        n_row_num: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        n_block1: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block2: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block3: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block4: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block5: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block6: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block7: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block8: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block9: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block10: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block11: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block12: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block13: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block14: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        n_block15: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "tbl_nemo",
        timestamps: false,
        indexes: [
          {
            name: "PRIMARY",
            unique: true,
            using: "BTREE",
            fields: [{ name: "n_num" }, { name: "n_row_num" }],
          },
        ],
      }
    );
  }
}
