FROM node:18.20.4 as build

RUN apt-get update \
    && apt-get install -y wget gnupg python3 make g++ \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
       fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg \
       fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY . .
RUN yarn config set network-timeout 300000
RUN yarn install
RUN yarn build

#RUN npm prune --production

EXPOSE 4000
EXPOSE 4001
EXPOSE 4100

CMD ["yarn", "start"]