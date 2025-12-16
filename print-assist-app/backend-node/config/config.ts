// backend-node/config/config.ts (CLEAN VERSION)

import { Sequelize } from 'sequelize';

// Assuming DATABASE_URL is correctly loaded by dotenv in server.ts
const DATABASE_URL = process.env.DATABASE_URL as string;

if (!DATABASE_URL) {
  throw new Error("FATAL ERROR: DATABASE_URL is not set.");
}

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: 'postgres',
  host: 'db',
  logging: false,
});

// The connection function only authenticates
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

export { sequelize };