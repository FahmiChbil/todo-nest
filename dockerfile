# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


# Stage 2: Run (production)
FROM node:20-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist

CMD ["node", "dist/main.js"]
