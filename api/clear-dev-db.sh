#!/usr/bin/env bash

docker exec -it mysql1 mysql -uroot -pwhatever -e "drop database candles; $(cat fixture.sql)";