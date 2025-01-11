# Use Node.js base image
FROM node:23-alpine3.20
# Set working directory

RUN mkdir /app
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./

COPY yarn.lock ./
RUN yarn

# Copy all the app files
COPY . .

# Expose the default Vite port (5173)
EXPOSE 5173

# Start Vite in development mode

RUN yarn build
CMD ["npx", "vite","serve","--host","0.0.0.0"]
