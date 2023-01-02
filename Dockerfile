FROM registry01.idc-sginfra.net/public-images/node:18.12.1

MAINTAINER Cloudtechteam <sgs_ct_t@smilegate.com>

USER root

RUN mkdir -p /stove/deploy/{project}

ADD . /stove/deploy/{project}

RUN chown -R stove:stove /stove && \
    chmod -R 744 /stove/deploy

USER stove

RUN cd /stove/deploy/{project}/ && \
    npm cache clean --force && \
    npm install && \
    npm run build

ENV HOST 0.0.0.0

EXPOSE 3000

CMD npm run dev