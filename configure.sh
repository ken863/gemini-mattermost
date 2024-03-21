OK="n"

until [ $OK = "y" ]; do
  echo '\nPlease enter the following environment variables'
  read -rp 'INT_URL (http://localhost:3000): ' INT_URL
  if [ -z "$INT_URL" ]; then
    INT_URL="http://localhost:3000"
  fi
  read -rp 'MM_URL (http://localhost:8065/api/v4): ' MM_URL
  if [ -z "$MM_URL" ]; then
    MM_URL="http://localhost:8065/api/v4"
  fi

  echo "\nPlease enter the generated access tokens for OpenProject and Mattermost"
  read -rp 'MATTERMOST_SLASH_TOKEN: ' MATTERMOST_SLASH_TOKEN
  read -rp 'MATTERMOST_BOT_TOKEN: ' MATTERMOST_BOT_TOKEN

  echo '\nInput environment variables:\n'
  echo INT_URL=$INT_URL
  echo MM_URL=$MM_URL
  echo MATTERMOST_SLASH_TOKEN="$MATTERMOST_SLASH_TOKEN"
  echo MATTERMOST_BOT_TOKEN="$MATTERMOST_BOT_TOKEN"

  read -rp 'Is this OK (y/n) ? ' OK
  if [ -z "$OK" ]; then
    OK="n"
  fi
done
echo '\nGenerating .env file...'
ENV_CONTENTS='/\nINT_URL='$INT_URL'/\nMM_URL='$MM_URL'/\nMATTERMOST_SLASH_TOKEN='$MATTERMOST_SLASH_TOKEN'\nMATTERMOST_BOT_TOKEN='$MATTERMOST_BOT_TOKEN

touch .env
echo "$ENV_CONTENTS" >.env
echo '\nDone.'
