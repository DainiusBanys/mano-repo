// backend-node/types/UserTypes.ts (THE FINAL, CORRECTED VERSION)

import { Model, Optional } from 'sequelize';

// 1. Define the data attributes (The columns in the database table)
export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    isSubscribed: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// 2. Define the attributes required for model creation (password and email are required)
// 'id' and timestamps are optional during creation.
export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isSubscribed' | 'createdAt' | 'updatedAt'> { }

// 3. Define the Model Instance (The object returned by User.findOne, User.create, etc.)
// This type merges the Sequelize Model capabilities with your UserAttributes data.
export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    // We explicitly re-add the attributes from UserAttributes here (a known TS workaround)
    id: number;
    email: string;
    password: string;
    isSubscribed: boolean;
    createdAt: Date;
    updatedAt: Date;

    // Custom method definition
    comparePassword(candidatePassword: string): Promise<boolean>;
}