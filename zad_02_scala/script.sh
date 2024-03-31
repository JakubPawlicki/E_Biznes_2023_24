#!/bin/bash

export AUTH_TOKEN=2eSAnMT1xkmxdmzgwOc40UcfAEv_7ZK4mewiUMWQ76ma11yj3

docker network create ngrok_net

docker run --rm --detach \
  -e NGROK_AUTHTOKEN=$AUTH_TOKEN \
  --network ngrok_net \
  --name ngrok \
  ngrok/ngrok:alpine \
  http backend:9000

docker run --rm --detach \
  --network ngrok_net \
  --name backend \
  zad02
