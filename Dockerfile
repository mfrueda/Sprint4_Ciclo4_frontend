FROM node:lts-alpine
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies
RUN npm install
#RUN npm install serve
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
# Expose the port on which the app will be running (3000 is the default that `serve` us
EXPOSE 3000
# Start the app
CMD [ "npx", "serve", "build" ]