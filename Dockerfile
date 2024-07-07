# Use a minimal Node.js base image
FROM node:bullseye AS base

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Builder stage
FROM base AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the project files
COPY . .

# Build the React app
RUN pnpm run build

# Final runtime image
FROM nginx:alpine

# Copy the built files from the builder image
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
