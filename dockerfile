
FROM node:20.18-slim

RUN npx -y playwright@1.48.0 install --with-deps

COPY . .

RUN npm install

RUN npx playwright install

CMD ["npx", "playwright", "test"]


# FROM node:20.18-slim

# # COPY . e2e

# RUN npx -y playwright@1.49.1 install --with-deps

# COPY . .

# CMD ["npx", "playwright", "test"]
