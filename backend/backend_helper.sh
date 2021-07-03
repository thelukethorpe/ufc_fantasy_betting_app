#!/usr/bin/env bash
COMMAND=$1
OPTION=$2

if [ "$COMMAND" = 'run' ]; then
   java -jar target/ufc_fantasy_betting_app-0.0.1-SNAPSHOT.jar $OPTION
elif [ "$COMMAND" = 'build' ]; then
  mvn clean package -DskipTests -T1C $OPTION
elif [ "$COMMAND" = 'test' ]; then
  SUPPRESS_DOWNLOAD_LOGS="--no-transfer-progress"
  if [ "$OPTION" = '--unit' ]; then
    mvn '-Dtest=**.*UnitTest' test $SUPPRESS_DOWNLOAD_LOGS
  elif [ "$OPTION" = '--integration' ]; then
    mvn '-Dtest=**.*IntegrationTest' test $SUPPRESS_DOWNLOAD_LOGS
  elif [ "$OPTION" = '--all' ]; then
    mvn '-Dtest=**.*Test' test $SUPPRESS_DOWNLOAD_LOGS
  fi
fi
