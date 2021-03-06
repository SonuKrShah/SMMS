const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2');

const { isAdmin, isMallManager, isLoggedIn } = require('./MiddleWares/UtilityMiddlewares');
const { query } = require('express');
const PORT = 3010;
app.use(express.json());
app.use(cors());

// create the connection to database
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: "qwerty123",  // Password needed for connection
    database: 'mall_management_system'
});

// Checking if successfully connected
connection.connect((err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log("Connected");
});

// ********************************************LOGIN**********************************************
app.post('/login', (req, res) => {
    // Note by default the role will be empty
    connection.query(`INSERT INTO \`persons\` (Name, Age, Gender, C_No, Email_ID, Password, Address) VALUES ('${req.body.Name}', ${req.body.Age}, '${req.body.Gender}', '${req.body.C_No}','${req.body.Email_ID}','${req.body.Password}','${req.body.Address}');`,
        function (err, result) {
            if (err) {
                res.status(400)     // Resource Not Found
                return res.send("Error try again");
            }
            res.json(result);
        });
});


// Not Using
app.get('/mallid', (req, res) => {
    connection.query(`SELECT P_id FROM mall_manager WHERE Mall_id=${req.query.Id};`,
        function (err, result) {
            if (err) {
                res.status(400)     // Resource Not Found
                return res.send("Error try again");
            }
            console.log(result.data);
            res.json(result);
        });
});

// Table for view
app.get('/persons', (req, res) => {
    // Note by default the role will be empty
    connection.query(`SELECT * FROM persons WHERE P_id=${req.query.Id}`,
        function (err, result) {
            if (err) {
                res.status(400)     // Resource Not Found
                return res.send("Error try again");
            }
            res.json(result);
        });
});
// ********************************************LOGIN**********************************************


// ********************************************SIGNIN**********************************************
app.get('/signin', (req, res) => {
    const { Email_ID, Password } = { ...req.query };
    connection.query("SELECT P_id, Email_ID, Password, Role FROM `persons`;",
        function (err, result) {
            if (err) {
                // Resource Not Found
                return res.status(400).send(err);
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i].Email_ID == Email_ID && result[i].Password == Password) {
                    return res.json(result[i].Role);
                }
            }
            res.json("Cus");
        }
    )
});

// ********************************************SIGNIN**********************************************



// *****************************############ ROLES OF ADMIN ##################************************************

// ********************************************ADD New Mall *********************************************
// add new Malls 
app.post('/addMall', (req, res) => {
    const { Name, Email_ID, C_No, Address, Desc } = { ...req.body };
    connection.query(`INSERT INTO \`mall\` (Name, C_no, Email_ID, Address, Description) VALUES ('${Name}', '${C_No}', '${Email_ID}' '${Address}', '${Desc}');`,
        function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
        }
    );
});
// ********************************************ADD New Mall *********************************************

// ********************************************ADD New Mall Manager *********************************************

app.post('/addMallManager', (req, res) => {
    const { Name, Age, Gender, C_No, Email_ID, Address, Password, Mall_id } = { ...req.body };
    // Firstly interest into the Persons Database.
    connection.query(`INSERT INTO \`persons\` (Name, Age, Gender, C_No, Email_ID, Password, Address, Role) VALUES ('${Name}', ${Age}, '${Gender}', '${C_No}','${Email_ID}','${Password}','${Address}', 'MM');`,
        function (err, result) {
            if (err) {
                return res.status(400).send("Error Adding new Mall Manager try again");
            }
        }
    );

    // Then add to the admin database
    connection.query("SELECT P_id, Email_ID, Password, Role FROM `persons`;",
        function (err, result) {
            if (err) {
                // Resource Not Found
                return res.status(400).send(err);
            }
            for (var i = 0; i < result.length; i++) {
                if (result[i].Email_ID === Email_ID && result[i].Password === Password) {
                    console.log('INSERTING');
                    break;
                }
            }

            if (i < result.length) {
                console.log(result[i].P_id, Mall_id);
                connection.query(`INSERT INTO \`mall_manager\` (P_id, Mall_id) VALUES ('${result[i].P_id}', '${Mall_id}');`,
                    function (err, result) {
                        console.log("Entered here");
                        if (err) {
                            return res.status(400).send(err);
                        }
                    }
                );
            }
            res.json("Successfully added new Mall Manager");
        }
    );
});

// ********************************************ADD New Mall Manager*****************************************

// ********************************************Delete Mall *********************************************

// Here we will delete the mall as well as the mall manager
app.delete('/deleteMall', (req, res) => {
    const { Mall_id } = { ...req.query };
    // Deleting the Mall
    connection.query(`DELETE FROM \`mall\` WHERE Mall_id = ${Mall_id}`,
        function (err, result) {
            if (err) {
                return res.status(400).send("Couldn't Delete the Mall Data");
            }
        });

    // Now delete the details of the mall manager
    connection.query(`DELETE FROM \`mall_manager\` WHERE Mall_id = ${Mall_id}`,
        function (err, result) {
            if (err) {
                return res.status(400).send("Couldn't Delete the Mall Data");
            }
        });

    // Delete all the shop which has the were in this mall
    connection.query(`DELETE FROM \`shops\` WHERE Mall_id = ${Mall_id}`,
        function (err, result) {
            if (err) {
                return res.status(400).send("Couldn't Delete the Mall Data");
            }
        });
    res.send("Success");
})
// ********************************************Delete Mall *********************************************


// ********************************************Delete Mall Manager *********************************************
// Here we will delete the mall as well as the mall manager
app.delete('/deleteMallManager', isAdmin, (req, res) => {
    const { MM_id } = { ...req.body };
    // Get the person Id for the deletion of the person details as well
    connection.query(`SELECT P_id FROM \`mall_manager\` WHERE MM_id = ${MM_id};`,
        function (err, result) {
            if (err)
                return res.status(400).send("Try again");
            connection.query(`DELETE FROM \`persons\` WHERE P_id = '${result[0].P_id}'`,
                function (err, result) {
                    if (err) {
                        return res.status(400).send("Couldn't Delete the Mall Data");
                    }
                });
        });
    // Deleting the Mall Manager
    connection.query(`DELETE FROM \`mall_manager\` WHERE MM_id = ${MM_id}`,
        function (err, result) {
            if (err) {
                return res.status(400).send("Couldn't Delete the Mall Data");
            }
        });
    // Deleting the person

    res.send("Deleted Successfully");
})
// ********************************************Delete Mall Manager *********************************************
// *****************************############ ROLES OF ADMIN ##################************************************

// ******************************************* Updates Mall Details ***********************************************
app.post('/UpdateMall', (req, res) => {
    const { Name, C_no, Email_ID, Address, Desc, Mall_id } = { ...req.body };
    connection.query(`UPDATE \`mall\` SET Name = '${Name}', C_no = '${C_no}', Email_ID='${Email_ID}' Address = '${Address}', Description = '${Desc}' WHERE Mall_id = ${Mall_id};`,
        function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            res.send(result);
        }
    );
});

// *****************************############ ROLES OF MALL MANAGER ##################************************************

// ************************************* Add Shops ***********************************************
app.post('/addShop', (req, res) => {

    const { Name, C_no, Email, Address, Mall_id } = { ...req.body };
    connection.query(`INSERT INTO shops (Name, C_no, Email, Address, Mall_id) VALUES ('${Name}','${C_no}','${Email}', '${Address}', '${Mall_id}');`,
        function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            res.send("Successfully Added Shop");
        }
    );
});
// ************************************* Add Shops ***********************************************


// ************************************* Remove Shops ***********************************************
app.delete('/deleteShop', (req, res) => {
    const { Shop_id } = { ...req.query };
    connection.query(`DELETE FROM \`shops\` WHERE Shop_id = ${Shop_id}`,
        function (err, result) {
            if (err)
                res.status(400).send("Error while deleting Try again");

            res.send("Successfully Deleted");
        }
    );

})
// ************************************* Remove Shops ***********************************************

// ************************************* Update Shop Details ***********************************************

// Only the mall manager can update this

app.post('/UpdateShop', (req, res) => {
    const { Shop_id, Name, C_no, Email, Address } = { ...req.body };
    connection.query(`UPDATE shops SET Name='${Name}', C_no='${C_no}', Email='${Email}', Address='${Address}' WHERE Shop_id='${Shop_id}';`,
        function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            res.send(result);
        }
    );
});

// ************************************* Update Shop Details ***********************************************

// ************************************* Edit Profile **********************************************
app.post('/EditProfile', isLoggedIn, (req, res) => {
    const { P_id, Name, Age, Gender, C_No, Email_ID, Address, Password, Role } = { ...req.body };
    let sqlQuery = `UPDATE \`persons\` SET Name = '${Name}', Age = ${Age}, Gender = '${Gender}', C_No = '${C_No}', Email_ID = '${Email_ID}', Password = '${Password}', Address = '${Address}', Role = '${Role}' WHERE P_id = ${P_id}`;
    // Firstly interest into the Persons Database.
    connection.query(sqlQuery, function (err, result) {
        if (err) {
            return res.status(400).send("Error Adding new Mall Manager try again");
        }
        res.send("Successfully Updated");
    }
    );
})

// ********************************** Reading the Data from the database *********************************

app.get("/AllPersons", (req, res) => {
    connection.query(`SELECT * FROM \'persons\'`, function (error, result) {
        if (error)
            return res.status(404).json("")
        res.json(result);
    })
})

// Get List of all Malls

app.get('/malls', (req, res) => {
    connection.query("SELECT * FROM mall;", function (error, result) {
        if (error)
            return res.status(404).send("Data not found")
        res.json(result);
    })
})

app.get('/lastAdded', (req, res) => {
    const { Name } = { ...req.body };
    connection.query(`SELECT Mall_id FROM mall WHERE Name='${Name}';`, function (error, result) {
        if (error)
            return res.status(404).send("Data not found")
        res.json(result);
    })
})
app.get('/specificmall', (req, res) => {
    connection.query(`SELECT * FROM mall WHERE Mall_id=${req.query.Id};`, function (error, result) {
        if (error)
            return res.status(404).send("Data not found")
        res.json(result);
    })
})

app.get('/mallManagers', (req, res) => {
    connection.query(`SELECT * FROM \'mall_manager\'`, function (error, result) {
        if (error)
            return res.status(404).json("")
        res.json(result);
    })
})

app.get('/Shops', (req, res) => {

    connection.query(`SELECT * FROM \'shops\'`, function (error, result) {
        if (error)
            return res.status(404).json("")
        res.json(result);
    })
});
app.get('/shopsmall', (req, res) => {
    connection.query(`SELECT * FROM shops WHERE Mall_id=${req.query.Id};`, function (error, result) {
        if (error)
            return res.status(404).json("")
        console.log(result);
        res.json(result);
    })
});
app.get('/specificshop', (req, res) => {
    connection.query(`SELECT * FROM shops WHERE Shop_id=${req.query.Id};`, function (error, result) {
        if (error)
            return res.status(404).json("")
        res.json(result);
    })
});

// Not using
app.get('/ShopOwners', (req, res) => {
    connection.query(`SELECT * FROM \'shops\'`, function (error, result) {
        if (error)
            return res.status(404).json("")
        res.json(result);
    })
});
app.listen(PORT, () => {
    console.log('Server has started...');
});

