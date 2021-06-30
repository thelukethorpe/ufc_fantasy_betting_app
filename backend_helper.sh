#!/usr/bin/env bash
OPTION=$1

# Navigate into backend root.
cd backend

if [ "$OPTION" = '--run' ]; then
  mvn spring-boot:run
elif [ "$OPTION" = '--install' ]; then
  mvn install -DskipTests -T1C
fi
