#!/usr/bin/env bash
COMMAND=$1
OPTION=$2

# Navigate into backend root.
cd backend

if [ "$COMMAND" = 'run' ]; then
  mvn spring-boot:run
elif [ "$COMMAND" = 'build' ]; then
  export MAVEN_OPTS="-Xmx512m -XX:MaxPermSize=128m"
  mvn clean package -DskipTests -T1C  "$OPTION"
elif [ "$COMMAND" = 'purge' ]; then
  mvn dependency:purge-local-repository
fi
