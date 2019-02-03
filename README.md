# INTERNET BANKING SERVICE :moneybag: :credit_card:

>![responsive web app](https://github.com/grynyk/internet-banking-service/blob/master/client/src/assets/1.png)

**Internet banking SPA, which allows user to:** 
Deposit, withdraw money, transfer money between user's accounts, process domestic and external transactions, add custom transactions, hide transactions from list, export specific transactions details to .pdf , manage recipients(create/read/update/delete), view statistics (for spendings, accounts etc.).

**Admin-panel allows to:**
View all users list, create/update/activate/block/unblock users, view users details, view users transactions, view all transactions list in system, export specific transactions details to .pdf, view system statistics.

## TECHNOLOGIES

**Front-end:** Angular 7, TypeScript 3.2, JavaScript ES6, Angular Material Design, Html/CSS, FxLayout.

**Back-end:** Node.js, Express.js, PostgreSQL, node-postgres client, babel, moment.js, bcrypt.

**others:** ngx-mask, angular2-notifications, jsPDF, countdown-timer.

# HOW TO RUN
- Clone this repo.
- Run 'npm install' in the internet-banking-service(root) directory to install Node/Express dependencies.
- Run 'npm install' in the client directory to install Angular dependencies.
- Install PostgreSQL on your computer.
- Run 'npm install --save pg dotenv' to install node-postgres package.
- Run psql 'createdb bank_db' in console to create postgres database for project.
- Create .env file in root folder and declare an url to database in it (postgres://{db_username}:{db_password}@{host}:{port}/{db_name}).
- Run 'node db createTables' in root folder to create all required tables in database.
- Add "dev-start": "babel-watch server.js" to your package.json under scripts section.
- Running 'npm run dev-start' in root directory should start your server.
- Create proxyconfig.json in client directory to skip CORS issues and add the following code into:
```
{
    "/api":{
        "target":"http://localhost:3000",
        "secure": false,
        "changeOrigin":true
    }
}
```
- Edit "start" to "ng serve --proxy-config proxyconfig.json" in client/package.json under scripts section.
- Start Angular app with 'npm start' in client directory using another terminal.
- Voilà ! Our application is working on http://localhost:4200/ and server is working on http://localhost:3000/

# TASKS
- [x] Implement activation of users account by admin
- [x] Count commission before processing transaction from savings account
- [ ] Rewrite backend using Typescript (ev. Nest.js)
- [ ] Improve user interface
- [ ] Code refactoring, split app to separate modules
- [ ] Create bank logo
