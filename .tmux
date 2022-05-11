#!/bin/sh

echo "starting"

set -e

# this might not handle a more complicated .env file with comments
# also should check to see that the .env file exists and return a meaningful message on fail
source .env

echo $MYSQL_DEV_SERVER_PASSWORD

if tmux has-session -t=candle-client 2> /dev/null; then
	tmux attach -t candle-client
	exit
fi

tmux new-session -d -s candle-client -n vim -x $(tput cols) -y $(tput lines)
# Vim
tmux send-keys -t candle-client:vim "vim ." Enter

# Server
tmux new-window -t candle-client -n server
tmux send-keys -t candle-client:server "cd api && npm start" Enter
#tmux capture-pane -p -S -t candle-client:server 
#tmux show-buffer

# Client
tmux new-window -t candle-client -n client
tmux send-keys -t candle-client:client "cd client && npm start" Enter

# DB
tmux new-window -t candle-client -n db
tmux send-keys -t candle-client:db "docker exec -it mysql1 mysql -u$MYSQL_DEV_SERVER_USER -p$MYSQL_DEV_SERVER_PASSWORD" Enter

# Shell
tmux new-window -t candle-client -n shell




tmux attach -t candle-client:vim

