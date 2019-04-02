# Lapor.in backend

## Installation

Clone
```
git clone https://github.com/igarramaddhan/lapor.in.git
```

Install node_modules
```
yarn
```

Create `.env` in root folder
```
NODE_ENV=development
PORT=7000

DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=8889
DB_NAME=laporin
DB_USER=root
DB_PASSWORD=root

JWT_ENCRYPTION=YOUR_OWN_SECRET
JWT_EXPIRATION=86400
```

Run this first
```
yarn fire
```

Create your database first, then run this
```
npx sequelize db:migrate
```

## Run

Development
```
yarn dev
```

## Deployment
This will create `dist` static folder
```
yarn build

yarn start
```
