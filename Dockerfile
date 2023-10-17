# Use the official Node.js 18 Alpine image
FROM node:18-alpine

# Set the working directory within the container
WORKDIR /react-vite-app

# Expose the port that your application will run on
EXPOSE 3000

# Copy the package.json and package-lock.json first
COPY package.json package-lock.json ./

# Install dependencies (remove --silent if you want to see logs)
RUN npm install --silent

# Copy the rest of your application files
COPY . .

# Build your application
RUN npm run build

# Start your application (assuming 'dev' is the correct command)
CMD ["npm", "run", "dev"]
