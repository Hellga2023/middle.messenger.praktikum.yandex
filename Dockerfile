FROM node:18
WORKDIR /var/www
RUN echo "NODE Version:" && node --version
COPY . .
RUN npm install 
COPY ./server.js server.js
EXPOSE 3000
CMD npm run start



Пробовала апдейтать до последней версии semver-regex:

Запускаю npm update semver-regex. npm -v semver-regex возвращает версию 9.5.0. Ошибка остается. 
