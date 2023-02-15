FROM node:16.18.0 as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM node:16.18.0 as runner
WORKDIR /app
COPY --from=builder /app/package.json .
COPY --from=builder /app/.next ./.next
RUN npm install --only=production --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]
