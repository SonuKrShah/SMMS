// app.get('/', (req, res) => {
//     console.log("Entered");
//     connection.query(
//         'SELECT * FROM `persons`',
//         function (err, results, fields) {
//             if (err) {
//                 res.status(404)     // Resource Not Found
//                 return res.send("Resource not found");
//             }

//             res.json(results);
//         }
//     );
// });


app.get('/signin', (req, res) => {
    const { Email_ID, Password } = { ...req.body };
    connection.query("SELECT P_id, Email_ID, Password, Role FROM `persons`;",
        function (err, result) {
            if (err) {
                // Resource Not Found
                return res.status(400).send(err);
            }
            result.forEach(item => {
                if (item.Email_ID === Email_ID && item.Password === Password)
                    return res.send(item.Role);
            });
            res.json("Customer");
        }
    )
})

// app.post("/per", (req, res) => {
//     connection.query("INSERT")
// })
app.get('/about', (req, res) => {
    res.send("This is about page");
});
app.get('/allmalls', (req, res) => {
    res.send("This is list of all malls");
})

app.get('/allmalls/mall', (req, res) => {
    res.send("This is a particular mall");
})

app.get('/allmalls/mall/id', (req, res) => {
    res.send("This is a mall with a particular id");
})



app.get('/personid', (req, res) => {
    res.send("This is a particular person id");
})

app.get('/persons', (req, res) => {
    res.send("This are the list of persons");
})