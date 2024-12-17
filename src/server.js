const dbloader = require("better-sqlite3");
const express = require('express');
const fs = require("fs");
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname)));
app.use(express.json());

const db = dbloader (
    path.resolve(__dirname, "database.db")
);

const schema = fs.readFileSync (
    path.resolve(__dirname, "schema.sql"),
    "utf-8"
);
db.exec(schema);

// read
app.get('/api/animals', (req, res) => {
    const data = db.prepare("SELECT * FROM animals").all();
    console.log("animals fetched:", data);
    res.json(data);
});

// create by form
app.post('/api/animals', (req, res) => {
    const { name, species, breed, days_sheltered, is_here } = req.body;
    console.log(req.body);

    if (!name || !species || typeof days_sheltered !== 'number') {
        console.error('Missing required fields:', req.body);
        return res.sendStatus(400); 
    }

    try {
        const query = `
            INSERT INTO animals (name, species, breed, days_sheltered, is_here)
            VALUES (?, ?, ?, ?, ?)
        `;
        db.prepare(query).run(name, species, breed || null, days_sheltered, is_here);
        res.sendStatus(200);
    } catch (err) {
        console.error('backend create error', err);
        res.sendStatus(500);
    }
});

// delete by id
app.delete("/api/animals/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.sendStatus(400);
        console.error('id error', err);
        return;
    }

    const data = db.prepare("DELETE FROM animals WHERE id = ?").run(id);

    if (data.changes === 0) {
        res.sendStatus(404);
        console.log('not found');
        return;
    }

    res.sendStatus(200);
});

app.listen(3000);
console.log("Server is running on http://localhost:3000");