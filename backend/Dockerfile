FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY prisma ./prisma
RUN npx prisma generate

COPY . .
RUN npm run build

RUN mkdir -p uploads

EXPOSE 10000

CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm run db:seed || true && node dist/index.js"]