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
tmux send-keys -t candle-client:vim "v ." Enter

# Server
tmux new-window -t candle-client -n server
tmux send-keys -t candle-client:server "cd api && npm start 2>&1 | tee ../test" Enter
#tmux capture-pane -p -S -t candle-client:server 
#tmux show-buffer
IT=$(tmux capture-pane -p -t candle-client:server)
echo "echo results: $IT"

# https://superuser.com/questions/270529/monitoring-a-file-until-a-string-is-found
wait_str() {
  local file="$1"; shift
  echo "Search Term $1"
  local search_term="$1"; shift
  local wait_time="${1:-5m}"; shift # 5 minutes as default timeout

  (timeout $wait_time tail -F -n0 "$file" &) | grep -q "$search_term" && return 0

  echo "Timeout of $wait_time reached. Unable to find '$search_term' in '$file'"
  return 1
}
wait_server() {
  echo "Waiting for server... $1"
  local server_log="$1"; shift
  local wait_time="$1"; shift

  wait_file "$server_log" 10 || { echo "Server log file missing: '$server_log'"; return 1; }

  wait_str "$server_log" "Connected" "$wait_time"
}

wait_file() {
  local file="$1"; shift
  local wait_seconds="${1:-10}"; shift # 10 seconds as default timeout

  until test $((wait_seconds--)) -eq 0 -o -f "$file" ; do sleep 1; done

  ((++wait_seconds))
}
wait_server "test" 100m && echo -n "Connected" 


# Client
tmux new-window -t candle-client -n client
tmux send-keys -t candle-client:client "cd client && npm start" Enter

# DB
tmux new-window -t candle-client -n db
tmux send-keys -t candle-client:db "docker exec -it mysql1 mysql -u$MYSQL_DEV_SERVER_USER -p$MYSQL_DEV_SERVER_PASSWORD" Enter

# Shell
#tmux new-window -t candle-client -n shell




tmux attach -t candle-client:vim

