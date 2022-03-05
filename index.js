const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(cors());

let users = [
    {
        id: 0,
        firstName: "Bogdan",
        lastName: "Silvasan"
    },
    {
        id: 1,
        firstName: "Codrut",
        lastName: "Ursache"
    },
    {
        id: 2,
        firstName: "Teodor",
        lastName: "Sicoe"
    },
    {
        id: 3,
        firstName: "Brezniceanu",
        lastName: "Mihai"
    },
    {
        id: 4,
        firstName: "Dragos",
        lastName: "Gheorghioiu"
    },
    {
        id: 5,
        firstName: "Rares",
        lastName: "Munteanu"
    },
];

// Route to get all users
app.get('/users', (req, res) => {
    return res.status(200).send(users);
});

// Route to get user with id
app.get('/users/:id', (req, res) => {

    const foundUser = users.find((user) => user.id.toString() === req.params.id);

    if (foundUser) {
        return res.status(200).send(foundUser);
    } else {
        return res.status(404).send(`Couldn't find user with id ${req.params.id}`);
    }
});

// Route to add user
app.post('/users', (req, res) => {

    const newUser = {
        id: Math.max(...(users.map(user => user.id))) + 1,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };

    if (users.find((user) => user.firstName === newUser.firstName && user.lastName === newUser.lastName)) {
        return res.status(405).send("Not allowed to create duplciate users");
    }

    users.push(newUser);

    return res.status(200).send(newUser);
});

// Route to modify user
app.put('/users/:id', (req, res) => {
    const foundUserIdx = users.findIndex((user) => user.id.toString() === req.params.id);

    if (foundUserIdx) {
        users[foundUserIdx] = {
            ...users[foundUserIdx],
            ...req.body
        };

        return res.status(200).send(users[foundUserIdx]);
    }

    return res.status(404).send("User not found");
});

// Route to delete user
app.delete('/users/:id', (req, res) => {
    users = users.filter((user) => user.id.toString() !== req.params.id);
    console.log(users);
    return res.status(204).send();
})


app.listen(5000, () => {
    console.log("Server started on port 5000")
});