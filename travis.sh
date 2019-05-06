#/usr/bin/env/sh
set -e
components="client server"

for component in $components
do
    echo "Testing component: $component"
    cd $component
    npm install
    if [ "$component" == "client" ];
    then
      npm test
    fi
    cd ..
done