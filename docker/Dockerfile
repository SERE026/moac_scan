
FROM  sparkchain/moac_node10:0.8.2

#COPY .  /app/
COPY bin/  /app/bin/
COPY client/  /app/client/
COPY modules/  /app/modules/
COPY app.js  /app/app.js
COPY package.json  /app/package.json
#COPY package-lock.json  /app/package-lock.json
COPY routes.js  /app/routes.js
COPY docker/startup.sh  /app/startup.sh

RUN chmod +x /app/startup.sh && \
    sed -i 's/\r$//' /app/startup.sh

WORKDIR /app/
RUN npm install

EXPOSE 8200
# Define default command.
#CMD ["npm", "start"]
#CMD [ "/bin/bash", "/app/startup.sh"]
ENTRYPOINT /app/startup.sh


#Environment="HTTP_PROXY=http://[proxy-addr]:[proxy-port]/" "HTTPS_PROXY=https://[proxy-addr]:[proxy-port]/"

# HTTP_PROXY="http://localhost:8118/"
# HTTPS_PROXY="https://localhost:8118/"
# NO_PROXY="localhost,127.0.0.1,docker-registry.somecorporation.com"

#  export HTTP_PROXY HTTPS_PROXY  NO_PROXY

# Environment="HTTP_PROXY=http://localhost:8118/" "HTTPS_PROXY=https://localhost:8118/"



# [Service]    
# Environment="HTTPS_PROXY=https://localhost:8118/" "HTTP_PROXY=http://localhost:8118/" "NO_PROXY=localhost,127.0.0.1,docker-registry.somecorporation.com"

# systemctl show --property=Environment docker Environment=HTTP_PROXY=http://localhost:8118/