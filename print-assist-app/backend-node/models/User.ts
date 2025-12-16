// backend-node/models/User.ts (FINAL ATTEMPT: Simplest TypeScript Pattern)

import { DataTypes, Model } from "sequelize"; // <-- Import Model class
// Import your custom types
import { UserAttributes, UserCreationAttributes, UserModel } from "../types/UserTypes";
import { sequelize } from "../config/config";
import bcrypt from "bcrypt";

// Define the Model Class: Create a class that extends Model
// This resolves the base constraint issue.
class User extends Model<UserAttributes, UserCreationAttributes> implements UserModel {
  // Redefine data properties here to satisfy the compiler
  public id!: number;
  public email!: string;
  public password!: string;
  public isSubscribed!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Custom instance method (declared in the class)
  public comparePassword!: (candidatePassword: string) => Promise<boolean>;

  // Add prototype logic using a static method or init (less messy)
  public async comparePasswordImpl(candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
  }
}

// Initialize the model *outside* the class definition
User.init(
  {
    // Must explicitly define the ID field
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isSubscribed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "users",
    sequelize, // Pass the sequelize instance here
    timestamps: true,
    hooks: {
      beforeCreate: async (user: User) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);

// Manually attach the custom method for runtime use
User.prototype.comparePassword = User.prototype.comparePasswordImpl;


export default User;