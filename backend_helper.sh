#!/usr/bin/env bash
COMMAND=$1
OPTION=$2

# Navigate into backend root.
cd backend

if [ "$COMMAND" = 'run' ]; then
  mvn spring-boot:run
elif [ "$COMMAND" = 'build' ]; then
  mvn clean package -DskipTests -T1C  "$OPTION"
elif [ "$COMMAND" = 'purge' ]; then
  mvn dependency:purge-local-repository
fi
