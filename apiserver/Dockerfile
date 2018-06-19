FROM node

WORKDIR /app

RUN mkdir dist
RUN mkdir data

WORKDIR apiserver

COPY ./apiServer.js ./apiHandlers.js ./apiHelper.js ./package.json ./

RUN npm install

# CMD ["/bin/bash", "-c", "npm start"]
# CMD ["/usr/local/bin/pm2", "start", "apiServer.js"]
# CMD ["npm", "start"]
# CMD ["/usr/local/bin/npm", "start"]
CMD ["node", "apiServer.js"]