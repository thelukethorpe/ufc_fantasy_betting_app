#!/usr/bin/env bash
COMMAND=$1
OPTION=$2

# Navigate into frontend root.
cd frontend

# Translate standard options.
if [ "$OPTION" = '--quiet' ]; then
  OPTION="--silent"
fi

if [ "$COMMAND" = 'run' ]; then
  npm start "$OPTION"
elif [ "$COMMAND" = 'install' ]; then
  npm install "$OPTION"
fi
