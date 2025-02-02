# 1. Use an official Node.js image as the base image
FROM node:18-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy the package.json and package-lock.json first
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the project files
COPY . .

# 6. Build the Next.js application
RUN npm run build

# 7. Expose the port that the Next.js app runs on
EXPOSE 3000

# 8. Start the application
CMD ["npm", "run", "start"]
