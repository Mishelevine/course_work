FROM node:20.12.0-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --force
RUN npm run build

COPY . .

FROM node:20.12.0-alpine

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "start"]