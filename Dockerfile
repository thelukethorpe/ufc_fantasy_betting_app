# Setup environment.
FROM ubuntu:20.04

# Install dependencies.
RUN apt-get update \
  && apt-get -y install maven=3.6.3-1 \
  && apt-get -y install nodejs=10.19.0~dfsg-3ubuntu1 \
  && apt-get -y install npm=6.14.4+ds-1ubuntu2 \
  && apt-get clean

# Sanity checks.
RUN mvn -v \
  && node -v \
  && npm -v

# Bundle sources.
RUN mkdir /app
WORKDIR /app
COPY . /app

# Build sources.
RUN sh backend_helper.sh --install
RUN sh frontend_helper.sh --install

# Deploy.
EXPOSE 8080
CMD ["sh", "backend_helper.sh", "--run", "&&", "sh", "frontend_helper.sh", "--run"]
