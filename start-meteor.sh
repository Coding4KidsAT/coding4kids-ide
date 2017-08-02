#!/bin/sh

export MONGO_URL=mongodb://localhost:27017/plinker
export MONGO_OPLOG_URL=mongodb://localhost:27017/local 
meteor --settings settings.json
