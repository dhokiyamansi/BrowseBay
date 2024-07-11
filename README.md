# browse-bay
"BrowseBay" is an e-commerce platform built with ReactJS, Bootstrap, ExpressJS, NodeJS, PostgreSQL, and Redux. It supports user registration, product management, and various payment options.

## How to setup
First of all, install Postgresql, Node if not already installed.
Create a database named `browsebay`.

Clone project repository.
```bash
git clone https://github.com/dhokiyamansi/BrowseBayEcommerce
```

Go inside project directory.
```bash
cd browse-bay
```
Now go inside frontend folder, and run following command
```bash
cd frontend
npm install
```
Go insde backend directory, and run same command
```bash 
cd ..
cd backend
npm install
```
Now, update the `.env` file accordingly. Enter `PORT`, `DB_PORT`, `DB_USER` and `DB_PASSWORD`.
```text
PORT=8000 # port on which server will run
DB_PORT=5432 # port on which your postgres server is running
DB_USER=postgres # db user name
DB_PASSWORD=postgres # db password
```
Now, run migrations by following command.
```bash
npm run migrate
```
Run seeders.
```bash
npm run seed
```
Now, open a terminal and go inside frontend directory and run following command.
```bash
npm run dev
```
Go inside backend direcory, and following command
```bash
npm start
```

### Admin Configuration
There's one Admin already created as which you can login.
- Email: `john.wick@browsebay.com`
- Password: `john@browsebay99`
