---
title: 'Docker Compose'
sidebar_label: 'Docker Compose'
sidebar_position: 3
---

There are 2 reasons that we should't start TiDB inside container:
1. Performance loss on disk/network/cpu;
2. Posibility of changing database from TiDB to other like MySQL for comparison.

## 0. Install TiDB

It's easy to setup a TiDB Cluster in your laptop (Mac or Linux) with the official cli tools: [tiup](https://tiup.io/)(inspired by rustup)

```bash
# Install tiup
curl --proto '=https' --tlsv1.2 -sSf https://tiup-mirrors.pingcap.com/install.sh | sh
# Install & Start TiDB Server.
tiup playground -T ossinsight
```

Expected output:
```bash
CLUSTER START SUCCESSFULLY, Enjoy it ^-^
To connect TiDB: mysql --comments --host 127.0.0.1 --port 4000 -u root -p (no password)
To view the dashboard: http://127.0.0.1:2379/dashboard
PD client endpoints: [127.0.0.1:2379]
To view the Prometheus: http://127.0.0.1:9090
To view the Grafana: http://127.0.0.1:3000
```

:::note
If you want to use another MySQL compatible database, please change settings in `ossinsight/docker-compose.yml`:

```
...
services:
  data:
    environment:
      - DATABASE_URL=tidb://root:@host.docker.internal:4000/gharchive_dev
...
  api:
    environment:
      - DB_HOST=host.docker.internal
      - DB_PORT=4000
      - DB_USER=root
      - DB_DATABASE=gharchive_dev
      - DB_PASSWORD=
...
:::

## 1. Install Docker Compose

:::note
We suppose you have knowledge about Docker/Container/Docker Compose.
:::

If you haven't installed Docker Compose, please install it with this [doc](https://docs.docker.com/compose/install/), then verfiy it:

```bash
docker-compose --version
```

## 2. Start mini OSS Insight!

[Create GitHub personal access token](/workshop/mini-ossinsight/step-by-step/find-data-source#creating-a-personal-access-token) first, then clone repo:
```bash
git clone --depth=1 https://github.com/pingcap/ossinsight.git;
cd ossinsight/;
export GITHUB_TOKEN=(personal access token);
docker-compose pull;
docker-compose up;
```

then open another terminal tab to load sample events data:
```bash
# Load about 5 million sample events data
wget https://github.com/pingcap/ossinsight/releases/download/sample/sample5m.sql.zip;
unzip sample5m.sql.zip;
mysql --host 127.0.0.1 --port 4000 -u root -p gharchive_dev < sample5m.sql
```

The importing task would cost about 10 minutes.

:::note
if you want to get different size of data please visit: 
https://github.com/pingcap/ossinsight/releases/tag/sample
:::

## 3. Well Done!

Visit [http://localhost:3001](http://localhost:3001);
