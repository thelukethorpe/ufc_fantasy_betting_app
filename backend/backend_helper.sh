#!/usr/bin/env bash
COMMAND=$1
OPTION=$2

if [ "$COMMAND" = 'run' ]; then
   java -jar target/ufc_fantasy_betting_app-0.0.1-SNAPSHOT.jar $OPTION
elif [ "$COMMAND" = 'build' ]; then
  mvn clean package -DskipTests -T1C $OPTION
fi
