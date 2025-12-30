import { DataTypes, Model } from "sequelize";
import { UserAttributes, UserCreationAttributes, UserModel } from "../types/UserTypes";
import { sequelize } from "../config/config";
import bcrypt from "bcrypt";

class User extends Model<UserAttributes, UserCreationAttributes> implements UserModel {
  // Use 'declare' for all properties to satisfy TypeScript
  declare id: number;
  declare email: string;
  declare password: string;
  declare isSubscribed: boolean;
  declare stripeCustomerId: string | null;
  declare subscriptionStatus: string;

  public async comparePassword(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    isSubscribed: { type: DataTypes.BOOLEAN, defaultValue: false },
    stripeCustomerId: { type: DataTypes.STRING, allowNull: true }, // Added this
    subscriptionStatus: { type: DataTypes.STRING, defaultValue: "trialing" }, // Added this
  },
  {
    tableName: "users",
    sequelize,
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);



export default User;