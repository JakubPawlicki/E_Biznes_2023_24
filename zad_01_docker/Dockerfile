FROM ubuntu:22.04
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update \
   && apt-get install -y software-properties-common \
   && add-apt-repository ppa:deadsnakes/ppa \
   && apt-get update \
   && apt install -y python3.8 \ 
   && apt-get clean \
   && rm -rf /var/lib/apt/lists/* \
   && apt-get update \
   && apt-get install -y openjdk-8-jdk \
   && apt install curl zip unzip -y
   
RUN curl -s "https://get.sdkman.io" | bash
RUN /bin/bash -c " \
    source /root/.sdkman/bin/sdkman-init.sh && \
    sdk install kotlin && \
    sdk install gradle \
"

ENV SDKMAN_DIR=/root/.sdkman
ENV PATH="${SDKMAN_DIR}/candidates/gradle/current/bin:${PATH}"
ENV PATH="${SDKMAN_DIR}/candidates/kotlin/current/bin:${PATH}"

COPY ./HelloWorldApp .
CMD python3.8 --version; java -version; kotlin -version; gradle --version; gradle run
