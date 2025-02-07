FROM node:20.12.0

WORKDIR /app
COPY . .
RUN npm i --force
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start"]
