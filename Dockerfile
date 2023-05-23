FROM node:18
WORKDIR /var/www
RUN echo "NODE Version:" && node --version
COPY . .
RUN npm install 
COPY ./server.js server.js
EXPOSE 3000
CMD npm run start
