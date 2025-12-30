import { Optional } from "sequelize";

export interface UserAttributes {
    id: number;
    email: string;
    password: string;
    isSubscribed: boolean;
    stripeCustomerId?: string | null;
    subscriptionStatus?: string;
}

// This is the missing piece TypeScript is asking for
export type UserCreationAttributes = Optional<UserAttributes, "id" | "isSubscribed" | "subscriptionStatus">;

export interface UserModel extends UserAttributes {
    comparePassword(password: string): Promise<boolean>;
}