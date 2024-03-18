import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tbl_subject extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    sb_sbcode: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    sb_subject: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'tbl_subject',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "sb_subject" },
        ]
      },
    ]
  });
  }
}
