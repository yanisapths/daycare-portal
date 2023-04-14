FROM node:14

RUN mkdir /clinic_frontend 

WORKDIR  /clinic_frontend

COPY ./package.json /clinic_frontend

RUN npm install

COPY . /clinic_frontend

RUN npm run build 

EXPOSE 3000

CMD  ["npm","start"]