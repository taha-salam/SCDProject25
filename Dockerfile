FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy backend package.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Start the backend (your entry file)
CMD ["node", "index.js"]


