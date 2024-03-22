const http = require('http');
const express = require('express');
const bodyparser = require('body-parser');

const app = express();

app.get("/", (request, result) => {
    result.send(`<h1>Hello World!</h1>`);
});

app.get("/about", (request, result) => {
    let TextArray = `<ul>`;
    const userNames = request.query.name;
    for (username in userNames) {
        TextArray += `<li>${userNames[username]}</li>`;
    }
    TextArray += `</ul>`;
    result.send(TextArray);
});

app.listen(8080);
