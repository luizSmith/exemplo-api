# Dockerfile

# base image
FROM node:14-alpine

# set working directory
WORKDIR /usr/src

# install global dependencies
RUN npm install -g @nestjs/cli

# copy files to docker directory
COPY . .

# install application dependencies
RUN npm install

# build application
RUN npm run build

# expose port
EXPOSE 3000

# run application
CMD ["node", "dist/main"]
