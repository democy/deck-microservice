# pull base image
FROM node:12-alpine

# maintainer details
LABEL author="kashi"
LABEL company="Homitag"
LABEL issues=""
LABEL majorVersion="1"
LABEL name='ScamAdviser Api'

######################################################################
# Place and system utilities in this section.
# this ensures that they are done first then cached for faster builds.
#######################################################################

## System dependencies ad utilities here:



########################################################################
# npm token argument so that is it not stored in the file
ENV NPM_TOKEN ${NPM_TOKEN}

# setup application directory
RUN mkdir /app
WORKDIR /app

# build .npmrc file for npm installation of private packages
RUN printf "//`node -p \"require('url').parse(process.env.NPM_REGISTRY_URL || 'https://registry.npmjs.org').host\"`/:_authToken=${NPM_TOKEN}\nregistry=${NPM_REGISTRY_URL:-https://registry.npmjs.org}\n" >> ~/.npmrc

# copy application build files.
ADD ./package.json /app
ADD ./cert.pem /app
# install pacakges and global packages
RUN npm install
RUN npm prune

# copy application run files and test for standard
ADD ./src /app/src
ADD ./tsconfig.json /app
ADD ./tslint.json /app
RUN npm run lint

# copy application test documentation files and build documentation
# ADD ./docs /app/docs
# ADD ./test /app/test
# RUN npm run document:test

# build technical documentation
# RUN npm run document:blueprint
ADD ./README.md /app
# RUN npm run document:typedoc

# build solution
RUN npm run build

# setup environment variables
ENV NODE_ENV 'production'
ENV PORT 80
ENV BASE_URI '/api/v1/scamadviser-api'
ENV ENV ${ENV}
ENV scamadviser_URL ${ScamAdviser_URL}
ENV ES_URL ${ES_URL}
ENV PG_DATABASE ${PG_DATABASE}
ENV PG_HOST ${PG_HOST}
ENV PG_USER ${PG_USER}
ENV PG_PASSWORD ${PG_PASSWORD}
ENV LOGS_ENV ${LOGS_ENV}

# expose microservice on selected port. Defaults to 80
EXPOSE ${PORT}

# run microservice
ENTRYPOINT [ "node" , "./build/bin/server.js"]
CMD ["/bin/bash"]