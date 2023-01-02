FROM registry01.idc-sginfra.net/public-images/node:18.12.1

MAINTAINER Cloudtechteam <sgs_ct_t@smilegate.com>

USER root

RUN mkdir -p /stove/deploy/{project}

ADD . /stove/deploy/{project}

RUN cd /stove/deploy/{project}/ && \
    npm cache clean --force && \
    npm install && \
    npm run build

WORKDIR /stove/deploy/{project}

EXPOSE 3000

CMD npm run dev