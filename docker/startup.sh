#entrypoint.sh
#! /bin/bash
 set -e
 /usr/local/bin/moac/startup.sh &
 sleep 5
 #cd /data/pangu-release0.8.2/ 
 #./moac --testnet --rpc --rpcaddr=0.0.0.0 --rpcapi="chain3,mc,net,personal,admin,debug,miner,txpool,db" --rpccorsdomain="*" & 
 npm start 