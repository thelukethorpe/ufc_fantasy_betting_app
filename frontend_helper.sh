#!/usr/bin/env bash
OPTION=$1

# Navigate into frontend root.
cd frontend

if [ "$OPTION" = '--run' ]; then
  npm start
elif [ "$OPTION" = '--install' ]; then
  npm install
fi
