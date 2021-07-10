#!/usr/bin/env bash
COMMAND=$1
OPTION=$2
VALUE=$3

# Translate standard options.
if [ "$OPTION" = '--quiet' ]; then
  OPTION="--silent"
fi

if [ "$COMMAND" = 'run-dev' ]; then
  npm start $OPTION
elif [ "$COMMAND" = 'run-prod' ]; then
  serve -p $OPTION -s build
elif [ "$COMMAND" = 'build-dev' ]; then
  npm install $OPTION
elif [ "$COMMAND" = 'build-prod' ]; then
  npm install -g serve $OPTION
  npm install $OPTION
  REACT_APP_API_URL="$VALUE" npm run build $OPTION
elif [ "$COMMAND" = 'lint' ]; then
  npm run-script lint
fi
