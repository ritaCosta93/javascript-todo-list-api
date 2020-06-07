# To-do

A todo list using an API connected to a mySQL database.

### Create a connection to mySQL using express

`const express = require("express"); const bodyParser = require("body-parser"); const mysql = require("mysql2");`

#### Connect to database -- Use your server details

`const connection = mysql.createConnection({ host: "localhost", user: "root", password: "123456789", database: "todo", });`

### Create a promise to check if your connection is working

`try { connection.connect(); } catch (e) { console.log("Ooops. Connection to MySQL failed."); console.log(e); }`

### Set a PORT for your API to work on

`const api = express(); api.listen("3000", () => { console.log("API up and running"); });`

### Set a folder for your API to serve

`api.use(express.static(\_\_dirname + "/public"));`

### Write your API routes

`api.post("/tasks/add", (req, res) => { });`

### Add the SQL commands to your api routes

`connection.query( “SELECT LAST_INSERT_ID() FROM tasks”, (error, results) => { if (error) return res.json({ error: error }); res.json({id: results[0][“LAST_INSERT_ID()”], description: req.body.item, }); });`

### Create a services file with your requests

`function getTasks(callback) { var req = new XMLHttpRequest(); req.open("GET", "/tasks"); req.send(); req.addEventListener("load", () => { var results = JSON.parse(req.responseText); if (results.error) return console.log(results.error); if (callback) callback(results); }); }`

### Create an element in the UI to use the requests

`<button onclick="getTasks(item)">List tasks</button>``

## License

[MIT](LICENSE.md) © [Rita Costa](https://github.com/ritaCosta93)
