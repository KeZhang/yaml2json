# docker  build -t="kezhang/yaml2json"  --no-cache  .

FROM node
MAINTAINER Jack Zhang <kejackz@vmware.com>

WORKDIR /workspace/
#git clone
#RUN git clone https://github.com/KeZhang/yaml2json.git

WORKDIR yaml2json
ADD  index.js  /workspace/yaml2json/
ADD  node_modules  /workspace/yaml2json/node_modules/
#ADD  package.json  /workspace/yaml2json/

EXPOSE 7102

CMD ["node", "index.js"]


#start static server
#docker run -p 7102:7102 -d --name yaml2json kezhang/yaml2json
#docker run -it -p 7102:7102  --name yaml2json kezhang/yaml2json /bin/bash