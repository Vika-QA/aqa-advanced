
FROM node:20.18-slim

RUN npx -y playwright@1.48.0 install --with-deps

COPY . .

RUN npm install

RUN npx playwright install

CMD ["npx", "playwright", "test"]
