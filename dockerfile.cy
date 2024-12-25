
FROM cypress/browsers:node-22.11.0-chrome-131.0.6778.85-1-ff-132.0.2-edge-131.0.2903.70-1

COPY . .

RUN npm install

ENTRYPOINT ["npx", "cypress", "run"]