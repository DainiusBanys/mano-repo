# backend-node/Dockerfile
FROM node:18-alpine
WORKDIR /app

# Copy package files only
COPY package.json ./

# CRITICAL FIX: Ensure full re-install of all dependencies, including pg/sequelize
RUN npm install

# Copy application code last
COPY . .

EXPOSE 5000

# Change the final line:
CMD ["npm", "run", "dev"]
# Assumes your package.json has: "dev": "npx nodemon server.js"