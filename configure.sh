OK="n"

until [ $OK = "y" ]; do
  echo '\nPlease enter the following environment variables'
  read -rp 'PORT (3000): ' PORT
  if [ -z "$PORT" ]; then
    PORT="3000"
  fi

  echo "\nPlease enter the generated access tokens"
  read -rp 'GEMINI_ACCESS_TOKEN: ' GEMINI_ACCESS_TOKEN

  echo '\nInput environment variables:\n'
  echo PORT=$PORT
  echo GEMINI_ACCESS_TOKEN="$GEMINI_ACCESS_TOKEN"

  read -rp 'Is this OK (y/n) ? ' OK
  if [ -z "$OK" ]; then
    OK="n"
  fi
done
echo '\nGenerating .env file...'
ENV_CONTENTS='PORT='$PORT'\nGEMINI_ACCESS_TOKEN='$GEMINI_ACCESS_TOKEN

touch .env
echo -e "$ENV_CONTENTS" >.env
echo '\nDone.'
