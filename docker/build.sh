
docker build -t .  -f  docker/Dockerfile
docker push mgichain/moac_record_scan:0.9.0
 mgichain/moac_record_scan:0.9.0  
#docker tag  sparkchain/chain_end:0.9.0  121.43.182.221:5000/sparkchain/chain_end:0.9.0
#docker push 121.43.182.221:5000/sparkchain/chain_end:0.9.0
#ocker rmi 10.31.0.45:5000/sparkchain/chain_end:0.9.0

docker stop moac_record_scan_test
docker rm moac_record_scan_test

docker run -d --name moac_record_scan_test -p  8200:8200  -p 8545:8545  -p 30333:30333  --restart=always  --net=host \
 --restart=always  --env TESTNET="--testnet"  -v /data/moac_test/:/root/   mgichain/moac_record_scan:0.9.0

docker stop  moac_record_scan
docker rm  moac_record_scan
docker run -d --name moac_record_scan -p  8201:8200  -p 8546:8545  -p 30334:30333  --restart=always  --net=host \
 --restart=always   -v /data/moac_pro/:/root/    mgichain/moac_record_scan:0.9.0
