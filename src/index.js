const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

//connect to database

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "todo",
});

try {
  connection.connect();
} catch (e) {
  console.log("Ooops. Connection to MySQL failed.");
  console.log(e);
}

//run express and set a port to the api
const api = express();
api.listen("3000", () => {
  console.log("API up and running");
});

//set a folder for the api to serve
api.use(express.static(__dirname + "/public"));

//body parser
api.use(bodyParser.json());

//api requests

//post an item to the API
api.post("/tasks/add", (req, res) => {
  console.log(req.body);

  connection.query(
    "INSERT INTO tasks (description) VALUES (?) ",
    [req.body.item],
    (error, results) => {
      if (error) return res.json({ error: error });

      connection.query(
        "SELECT LAST_INSERT_ID() FROM tasks",
        (error, results) => {
          if (error) return res.json({ error: error });

          res.json({
            id: results[0]["LAST_INSERT_ID()"],
            description: req.body.item,
          });
        }
      );
    }
  );
});

//get all the API items

api.get("/tasks", (req, res) => {
  connection.query(
    "SELECT * FROM tasks ORDER BY created DESC",
    (error, results) => {
      if (error) return res.json({ error: error });
      res.json({
        todo: results.filter((item) => !item.completed),
        completed: results.filter((item) => item.completed),
      });
    }
  );
});

//delete item from the API

api.post("/tasks/:id/remove", (req, res) => {
  console.log(req.params.id);
  connection.query(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    (error, results) => {
      if (error) return res.json({ error: error });
      res.json({});
    }
  );
});

//update an API item

api.post("/tasks/:id/update", (req, res) => {
  connection.query(
    "UPDATE tasks SET completed =? WHERE id=?",
    [req.body.completed, req.params.id],
    (error, results) => {
      if (error) return res.json({ error: error });
      res.json({});
    }
  );
});
