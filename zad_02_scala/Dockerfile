FROM ubuntu:22.04
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
    && apt-get install -y curl zip unzip \
    && apt-get install -y default-jre \
    && apt-get install -y default-jdk
    
RUN curl -s "https://get.sdkman.io" | bash
RUN /bin/bash -c " \
    source /root/.sdkman/bin/sdkman-init.sh && \
    sdk install scala 2.13.13 && \
    sdk install sbt \
    "

ENV SDKMAN_DIR=/root/.sdkman
ENV PATH="${SDKMAN_DIR}/candidates/scala/current/bin:${PATH}"
ENV PATH="${SDKMAN_DIR}/candidates/sbt/current/bin:${PATH}"

WORKDIR /EB02
COPY ./EB02 .
CMD sbt run
