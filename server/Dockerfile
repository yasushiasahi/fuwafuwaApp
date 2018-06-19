FROM node

WORKDIR /server

run mkdir dist
run mkdir data

WORKDIR api

RUN ls -al .

run pwd

COPY ./* ./

RUN ls -al .

RUN npm install

RUN ls -al .

ENTRYPOINT ["npm", "start"]