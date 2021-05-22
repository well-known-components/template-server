ARG RUN

FROM node:lts as builder-image

WORKDIR /app

# some packages require a build step
RUN apt-get update
RUN apt-get -y -qq install python-setuptools python-dev build-essential

# install dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci

# build the app
COPY . /app
RUN npm run build
RUN npm run test

# remove devDependencies, keep only used dependencies
RUN npm ci --only=production

########################## END OF BUILD STAGE ##########################

FROM node:lts
WORKDIR /app
COPY --from=builder-image /app /app

# We use Tini to handle signals and PID1 (https://github.com/krallin/tini, read why here https://github.com/krallin/tini/issues/8)
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

# Please _DO NOT_ use a custom ENTRYPOINT
# It may prevent signals (i.e. SIGTERM) to reach the service
# Read more here: https://aws.amazon.com/blogs/containers/graceful-shutdowns-with-ecs/
#            and: https://www.ctl.io/developers/blog/post/gracefully-stopping-docker-containers/
ENTRYPOINT ["/tini", "--"]

# Run the program under Tini
CMD [ "/usr/local/bin/node", "--abort-on-uncaught-exception", "--unhandled-rejections=strict", "dist/index.js" ]
