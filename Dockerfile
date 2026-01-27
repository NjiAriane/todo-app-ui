# ------------ STAGE 1: BUILD ANGULAR APP ------------
FROM node:20 AS builder

WORKDIR /app

# Install deps using package-lock for reproducible builds
COPY package*.json ./
RUN npm install

# Copy the rest of the app and build
COPY . .

# Build Angular app in production mode
# If your angular.json uses a different config name, update this command.
RUN npm run build -- --configuration production

# ------------ STAGE 2: NGINX RUNTIME IMAGE ------------
FROM nginx:1.27-alpine AS runner

# Remove default Nginx config and add our own (for SPA routing)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# IMPORTANT:
# Check "outputPath" in angular.json.
# Example: "dist/todo-app-ui"
# Set DIST_DIR to that value if different.
ARG DIST_DIR=dist/todo-app-ui
COPY --from=builder /app/${DIST_DIR}/browser /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
