FROM node
MAINTAINER Maritrini
WORKDIR /app
COPY . .
RUN npm install 
EXPOSE 3000
CMD npm start 