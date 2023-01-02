FROM registry01.idc-sginfra.net/public-images/node:18.9

MAINTAINER Cloudtechteam <sgs_ct_t@smilegate.com>

USER root

ADD dist /stove/deploy/{project}

WORKDIR /stove/deploy/{project}

RUN npm i

CMD npm run dev