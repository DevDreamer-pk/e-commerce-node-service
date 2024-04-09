FROM node:lts-alpine

# Install nodemon globally
RUN npm install -g nodemon

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set variables from .env file
ENV  DB_URL=mongodb://mongodb:27017/ecomdb
ENV  JWT_SECRET=Abcdefg

WORKDIR /usr/src/app

# Copy package files
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies
RUN npm install --production --silent && mv node_modules ../

# Copy application files
COPY . .

# Expose port
EXPOSE 3001

# Change ownership to node user
RUN chown -R node /usr/src/app

# Switch to node user
USER node

# Command to run the application
CMD ["npm", "start"]
