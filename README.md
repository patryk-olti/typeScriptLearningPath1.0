
# install node with typescript
npm install -D typescript tsx @types/node

# configuration
npx tsc --init

# run server
npx tsx src/index.ts

# postgreSQL init and connect
npm install pg dotenv
npm install --save-dev typescript @types/node @types/pg ts-node