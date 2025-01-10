# Use Node.js base image
FROM node:21

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN yarn

# Copy all the app files
COPY . .

# Expose the default Vite port (5173)
EXPOSE 5173

# Start Vite in development mode
CMD ["yarn", "dev"]
