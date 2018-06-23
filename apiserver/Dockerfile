FROM node

RUN rm /etc/localtime
RUN cp /usr/share/zoneinfo/Japan /etc/localtime

WORKDIR /app

RUN mkdir dist
RUN mkdir data

WORKDIR apiserver

COPY ./apiServer.js ./apiHandlers.js ./apiHelper.js ./package.json ./

RUN npm install

CMD ["node", "apiServer.js"]