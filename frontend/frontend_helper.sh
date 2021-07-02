#!/usr/bin/env bash
COMMAND=$1
OPTION=$2

# Translate standard options.
if [ "$OPTION" = '--quiet' ]; then
  OPTION="--silent"
fi

if [ "$COMMAND" = 'run' ]; then
  npm start $OPTION
elif [ "$COMMAND" = 'build' ]; then
  npm install $OPTION
fi
