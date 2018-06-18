
docker build -t  sparkchain/chain_end:0.9.0  .  -f  docker/Dockerfile
docker tag  sparkchain/chain_end:0.9.0  121.43.182.221:5000/sparkchain/chain_end:0.9.0
docker images
docker ps
docker push 121.43.182.221:5000/sparkchain/chain_end:0.9.0

#121.43.182.221
#docker build -t  sparkchain/moac_end:0.8.2  D:\svn\chain\spc-moac-end\ -f docker/Dockerfile


docker stop moac_end_test
docker rm moac_end_test
#ocker rmi 10.31.0.45:5000/sparkchain/chain_end:0.9.0
docker run -d --name moac_end_test -p  8200:8200  -p 8545:8545  -p 30333:30333  --restart=always  --net=host \
 --restart=always  --env TESTNET="--testnet"  -v /data/moac_test/:/root/  10.31.0.45:5000/sparkchain/chain_end:0.9.0


docker stop moac_end
docker rm moac_end
#docker rmi 10.31.0.45:5000/sparkchain/chain_end:0.9.0
docker run -d --name moac_end -p  8201:8200  -p 8546:8545  -p 30334:30333  --restart=always  --net=host \
 --restart=always   -v /data/moac_pro/:/root/ 10.31.0.45:5000/sparkchain/chain_end:0.9.0


  # -e "http_proxy=http://10.31.0.51:8118"  \
  # -e "https_proxy=http://10.31.0.51:8118"   \

 ＃.bashrc

情形二：主机内部的端口重定向
我们可能需要将访问主机的7979端口映射到8080端口。也可以iptables重定向完成

iptables -t nat -A PREROUTING -p udp --dport 30333 -j REDIRECT --to-ports 1080
注意问题
需要打开ip_forward功能。
echo '1' > /proc/sys/net/ipv4/ip_forward

docker stop moac_end_test
docker rm moac_end_test
mkdir -p  /data/moac_test/
docker run -d --name moac_end_test -p  8200:8200  -p 8545:8545    --restart=always  --env TESTNET="--testnet"   -v /data/moac_test/:/root/ 10.31.0.45:5000/sparkchain/chain_end:0.9.0
docker logs -f  moac_end_test



docker stop moac_end_pro
docker rm moac_end_pro
mkdir -p  /data/moac_pro/
docker run -d --name moac_end_pro -p  8201 :8200  -p 8546:8545   --restart=always  -v /data/moac_pro/:/root/ sparkchain/moac_end:0.8.2
docker logs -f  moac_end_pro

docker exec -it moac_end_test /bin/bash

＃ systemctl stop docker.service
＃ nohup docker daemon -H tcp://0.0.0.0:1080 -H unix:///var/run/docker.sock  &

# docker run -d --name moac_node10 -p 8545:8545  --env TESTNET="--testnet"  -v /root/:/root/ sparkchain/moac_node10:0.8.2
# docker run -d --name moac_node10 -p 8545:8545  sparkchain/moac_node10:0.8.2



# docker build -t  sparkchain/ubuntu_moac_end  D:\code\github\k8s-new\13dockerfile\09moacEnd\ -f Dockerfile
# docker stop ubuntu_moac_end
# docker rm ubuntu_moac_end
# docker run -d --name ubuntu_moac_end -p 8200:8200 --env moacUrl="http://10.104.10.112:8545"  sparkchain/ubuntu_moac_end 
# docker logs -f  ubuntu_moac_end

#docker run -i -t sparkchain/ubuntu_moac_end /bin/bash
#docker run -d sparkchain/ubuntu_moac_end /bin/bash



#docker build -t  sparkchain/moac_end:1.0  D:\svn\chain\spc-moac-end\ -f all.Dockerfile

# docker build -t  sparkchain/ubuntu_moac_end  D:\code\github\k8s-new\13dockerfile\09moacEnd\ -f Dockerfile
# docker stop ubuntu_moac_end
# docker rm ubuntu_moac_end
# docker run -d --name ubuntu_moac_end -p 8200:8200 --env moacUrl="http://10.104.10.112:8545"  sparkchain/ubuntu_moac_end 
# docker logs -f  ubuntu_moac_end

#docker run -i -t sparkchain/ubuntu_moac_end /bin/bash
#docker run -d sparkchain/ubuntu_moac_end /bin/bash

#docker stop ubuntu_moac_end
#docker rm ubuntu_moac_end
#docker run -d --name ubuntu_moac_end -p 8200:8200 sparkchain/ubuntu_moac_end 
#docker logs -f  ubuntu_moac_end
