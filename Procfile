server:     sh -c 'cd server && bundle exec rails s -p 3000 && cd ..'
client:     sh -c 'cd client && ember serve --proxy http://localhost:3000 && cd ..'
#client:     sh -c 'cd client && ember serve --proxy http://api.ember-cli-101.com && cd ..'
#server:     sh -c 'cd .. && cd borrowers-backend && bundle exec rails s -p 3000 && cd ..'
server_log: sh -c 'cd server && tail -f log/development.log'
