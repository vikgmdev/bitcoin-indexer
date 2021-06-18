import { Sequelize, Model, DataTypes } from 'sequelize';

export default class OpReturn extends Model {
  public blockHash!: string;

  public blockHeight!: number;

  public decodedOpReturn!: string;

  public opReturn!: string;

  public txid!: string;

  public static initialize(sequelize: Sequelize): void {
    this.init(
      {
        opReturn: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
        },
        blockHash: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        blockHeight: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        decodedOpReturn: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        txid: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        modelName: 'opreturn',
        sequelize,
        underscored: true,
      },
    );
  }
}
