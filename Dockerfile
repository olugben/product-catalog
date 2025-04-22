# Step 1: Use an official Node.js runtime as the base image
FROM node:23-slim

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Step 4: Install the app dependencies
RUN npm install

# Step 5: Install nodemon globally
RUN npm install -g nodemon

# Step 6: Copy the rest of the application code into the container
COPY . .

# Step 7: Expose the port the app will run on
EXPOSE 3000

# Step 8: Use nodemon for automatic reload during development
CMD ["node", "src/server.js"]
