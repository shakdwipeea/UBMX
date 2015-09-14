# The Urban Mechanic Api

## Prerequisite
- mysql
- nodejs

## Installation instruction
- clone the repo
- cd to Directory
- npm install
- npm install -g db-migrate
- Specify correct credential in database.json
- db-migrate up
- node bin/www

## Viewing documentation
- After running server as mentioned above 
- Go to http://localhost:3000/doc

## Running test
- Install mocha npm install mocha -g
- npm test

## Updating documentation
- npm install -g apidoc
- rm -rf public/doc
- npm doc
