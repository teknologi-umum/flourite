import { test } from 'uvu';
import * as assert from 'uvu/assert';
import detectLang from '../src/index';

test('teknum bot', () => {
  const code = detectLang(`
FROM node:16.6-buster

WORKDIR /app

COPY . .

RUN npm install --production

EXPOSE 8080

CMD ["npm", "start"]`);

  assert.equal(code.language, 'Dockerfile');
});

test('botnet', () => {
  const code = detectLang(`
#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/nightly/aspnet:6.0.0-rc.1-bullseye-slim-amd64 AS base
RUN apt-get update && apt-get install -y libc6-dev libgdiplus
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["BotNet/BotNet.csproj", "BotNet/"]
RUN dotnet restore "BotNet/BotNet.csproj"
COPY . .
WORKDIR "/src/BotNet"
RUN dotnet build "BotNet.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "BotNet.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "BotNet.dll"]`);

  assert.equal(code.language, 'Dockerfile');
});

test('casperjs dockerfile', () => {
  const code = detectLang(`
#
# Dockerfile for casperjs
#

FROM debian:jessie
MAINTAINER kev <noreply@easypi.pro>

ENV PHANTOM_VER 2.1.1
ENV PHANTOM_URL https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-\${PHANTOM_VER}-linux-x86_64.tar.bz2
ENV PHANTOM_DIR /usr/local/bin

ENV CASPER_VER 1.1.4-1
ENV CASPER_URL https://github.com/casperjs/casperjs/archive/\${CASPER_VER}.tar.gz
ENV CASPER_DIR /usr/local/casperjs

RUN set -xe \
    && apt-get update \
    && apt-get install -y bzip2 \
                          curl \
                          libfontconfig \
                          libicu52 \
                          libsqlite3-0 \
                          python \
    && curl -sSL $PHANTOM_URL | tar xj -C $PHANTOM_DIR --strip 2 --wildcards '*/bin/phantomjs' \
    && chmod +x /usr/local/bin/phantomjs \
    && mkdir -p $CASPER_DIR \
    && curl -sSL $CASPER_URL | tar xz --strip 1 -C $CASPER_DIR \
    && ln -sf $CASPER_DIR/bin/casperjs /usr/local/bin/ \
    && apt-get remove -y bzip2 \
                         curl \
    && rm -rf /var/lib/apt/lists/*

COPY ./sample.js /app/

VOLUME /app/
WORKDIR /app/

ENTRYPOINT ["casperjs"]
CMD ["--help"]
`);

  assert.equal(code.language, 'Dockerfile');
});

test('kafka dockerfile', () => {
  const code = detectLang(`
    FROM azul/zulu-openjdk-alpine:8u292-8.54.0.21

ARG kafka_version=2.7.1
ARG scala_version=2.13
ARG glibc_version=2.31-r0
ARG vcs_ref=unspecified
ARG build_date=unspecified

LABEL org.label-schema.name="kafka" \
      org.label-schema.description="Apache Kafka" \
      org.label-schema.build-date="\${build_date}" \
      org.label-schema.vcs-url="https://github.com/wurstmeister/kafka-docker" \
      org.label-schema.vcs-ref="\${vcs_ref}" \
      org.label-schema.version="\${scala_version}_\${kafka_version}" \
      org.label-schema.schema-version="1.0" \
      maintainer="wurstmeister"

ENV KAFKA_VERSION=$kafka_version \
    SCALA_VERSION=$scala_version \
    KAFKA_HOME=/opt/kafka \
    GLIBC_VERSION=$glibc_version

ENV PATH=\${PATH}:\${KAFKA_HOME}/bin

COPY download-kafka.sh start-kafka.sh broker-list.sh create-topics.sh versions.sh /tmp/

RUN apk add --no-cache bash curl jq docker \
 && chmod a+x /tmp/*.sh \
 && mv /tmp/start-kafka.sh /tmp/broker-list.sh /tmp/create-topics.sh /tmp/versions.sh /usr/bin \
 && sync && /tmp/download-kafka.sh \
 && tar xfz /tmp/kafka_\${SCALA_VERSION}-\${KAFKA_VERSION}.tgz -C /opt \
 && rm /tmp/kafka_\${SCALA_VERSION}-\${KAFKA_VERSION}.tgz \
 && ln -s /opt/kafka_\${SCALA_VERSION}-\${KAFKA_VERSION} \${KAFKA_HOME} \
 && rm /tmp/* \
 && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/\${GLIBC_VERSION}/glibc-\${GLIBC_VERSION}.apk \
 && apk add --no-cache --allow-untrusted glibc-\${GLIBC_VERSION}.apk \
 && rm glibc-\${GLIBC_VERSION}.apk

COPY overrides /opt/overrides

VOLUME ["/kafka"]

# Use "exec" form so that it runs as PID 1 (useful for graceful shutdown)
CMD ["start-kafka.sh"]`);

  assert.equal(code.language, 'Dockerfile');
});

test.run();
