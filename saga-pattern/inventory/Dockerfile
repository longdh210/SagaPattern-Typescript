FROM node:18

WORKDIR /var/www/inventory

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]