#!/bin/bash
printf "\033c"
FILE='config/CPSysytem.yml'
if [ -f $FILE ]; then
    #installed
    echo 'Start...'
    sleep 2
    printf "\033c"
    node index.js
else
    echo $COUNTER
    echo ""
    #not installed
    read -p 'Please enter Web port: ' WebPort
    echo ""
    read -p 'Please enter admin password: ' AdminPass
    echo ""
    read -p 'Please enter Cookie secret lenght: ' CookieSecretLenght
    echo ""
    echo "Installing..."
    COUNTER=$(openssl rand -base64 48 | cut -c1-$CookieSecretLenght)
    cat <<EOF > config/CPSystem.yml
Web:
  port: $WebPort
  host: 0.0.0.0
  CookieSecret: '$COUNTER'
EOF
    cat <<EOF > config/UsersData.yml
Users:
  admin:
    Password: '${AdminPass}'
    AccessType: admin
    AuthData:
      key: none
      ip: none
EOF
    npm install body-parser child_process express express-session js-yaml pidusage
    echo "Distemi CP installed, run"
    sleep 5
    printf "\033c"
    node index.js
fi