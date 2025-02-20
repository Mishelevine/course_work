FROM node:20.12.0

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WEBSITE_URL

WORKDIR /app
COPY . .

RUN echo "NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}" > .env.local && \
    echo "NEXT_PUBLIC_WEBSITE_URL=${NEXT_PUBLIC_WEBSITE_URL}" >> .env.local

RUN npm i --force
RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "start"]
