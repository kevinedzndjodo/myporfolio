FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

RUN npx prisma db push --accept-data-loss
RUN npm run db:seed || true

EXPOSE 4000

CMD ["node", "dist/index.js"]
