FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy backend package.json first
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend/ .

# Expose backend port
EXPOSE 3000

# Start backend (YOUR ENTRY FILE IS index.js)
CMD ["node", "index.js"]

