FROM node:14-alpine


WORKDIR /usr/src/app
COPY --from=mwader/static-ffmpeg:4.3.2 /ffmpeg /usr/local/bin/
COPY --from=mwader/static-ffmpeg:4.3.2 /ffprobe /usr/local/bin/
COPY --from=mwader/static-ffmpeg:4.3.2 /qt-faststart /usr/local/bin/
COPY ./package.json ./
COPY ./package-lock.json ./

# RUN apt-get -y update && apt-get -y upgrade && apt-get install -y software-properties-common && add-apt-repository ppa:jonathonf/ffmpeg-4 && apt-get update && apt-get install -y ffmpeg

RUN npm install --silent

COPY . .

EXPOSE 1935

CMD [ "node", "mediaserver.js"]