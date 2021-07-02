# Setup environment.
FROM node:14.17.1-alpine

# Sanity checks.
RUN node -v && npm -v

# Bundle sources.
RUN mkdir /app
WORKDIR /app
COPY . /app

# Build sources.
RUN sh frontend_helper.sh build --quiet

# Deploy.
EXPOSE 8080
CMD sh frontend_helper.sh run
