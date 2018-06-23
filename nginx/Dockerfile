FROM nginx

RUN rm /etc/localtime
RUN cp /usr/share/zoneinfo/Japan /etc/localtime

RUN mkdir /dist

RUN rm /var/log/nginx/*

COPY ./nginx.conf /etc/nginx/nginx.conf

RUN mkdir /etc/letsencrypt
