# Use a minimal Node.js base image
FROM node:18-alpine as base

# Builder stage
FROM base AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Build the Vite/Svelte application
RUN npm run build

# Final runtime image
FROM nginx:stable-alpine

# Copy the built files from the builder image to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file template
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template

# Expose port 80
EXPOSE 80

# Start Nginx server with environment variable substitution at runtime
CMD ["sh", "-c", "envsubst '$$API_HOST $$API_PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
