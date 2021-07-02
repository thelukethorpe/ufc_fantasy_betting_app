# Setup environment.
FROM maven:3.8.1-jdk-11-slim

# Sanity checks.
RUN mvn -v

# Bundle sources.
RUN mkdir /api
WORKDIR /api
COPY . /api

# Build sources.
RUN sh backend_helper.sh build --quiet

# Deploy.
EXPOSE 8080
CMD sh backend_helper.sh run --server.port=$PORT
