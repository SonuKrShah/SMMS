const express = require('express');
const app = express();
const cors = require('cors')
const mysql = require('mysql2');

const { isAdmin, isMallManager, isLoggedIn } = require('./MiddleWares/UtilityMiddlewares');
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
    console.log(req.body);
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
// ********************************************LOGIN**********************************************


// ********************************************SIGNIN**********************************************
app.get('/signin', (req, res) => {
    const { Email_ID, Password } = { ...req.body };
    connection.query("SELECT P_id, Email_ID, Password, Role FROM `persons`;",
        function (err, result) {
            if (err) {
                // Resource Not Found
                return res.status(400).send(err);
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i].Email_ID === Email_ID && result[i].Password === Password)
                    return res.json(result[i].Role);
            }
            res.json("Customer");
        }
    )
});

// ********************************************SIGNIN**********************************************



// *****************************############ ROLES OF ADMIN ##################************************************


// ********************************************ADD New Admin *********************************************

// Here the admin can add new Admins if he wants
app.post('/addAdmin', isAdmin, (req, res) => {

    const { Name, Age, Gender, C_No, Email_ID, Address, Password } = { ...req.body };
    // Firstly interst into the Persons Database.
    connection.query(`INSERT INTO \`persons\` (Name, Age, Gender, C_No, Email_ID, Password, Address, Role) VALUES ('${Name}', ${Age}, '${Gender}', '${C_No}','${Email_ID}','${Password}','${Address}', 'admin');`,
        function (err, result) {
            if (err) {
                return res.status(400).send("Error Adding new Admins try again");
            }
            // res.send(result);
        }
    );

    // Then add to the admin database
    connection.query("SELECT P_id, Email_ID, Password, Role FROM `persons`;",
        function (err, result) {
            if (err) {
                // Resource Not Found
                return res.status(400).send(err);
            }
            for (let i = 0; i < result.length; i++) {
                if (result[i].Email_ID === Email_ID && result[i].Password === Password) {
                    connection.query(`INSERT INTO \`admin\` (P_id) VALUES ('${result[i].P_id}');`,
                        function (err, result) {
                            if (err) {
                                return res.status(400).send(err);
                            }
                        }
                    );
                }
            }
            res.json("Successfully added new Admin");
        }
    )
});
// ********************************************ADD New Admin *********************************************


// ********************************************ADD New Mall *********************************************
// add new Malls 
app.post('/addMall', isAdmin, (req, res) => {
    const { Name, C_No, Address, Desc } = { ...req.body };
    connection.query(`INSERT INTO \`mall\` (Name, C_no, Address, Description) VALUES ('${Name}', '${C_No}', '${Address}', '${Desc}');`,
        function (err, result) {
            if (err) {
                console.log(err);
                return res.status(400).send(err);
            }
            res.send(result);
        }
    );
});
// ********************************************ADD New Mall *********************************************


// ********************************************ADD New Mall Manager *********************************************

app.post('/addMallManager', isAdmin, (req, res) => {
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

// ********************************************ADD New Mall Manager *********************************************




// ********************************************Delete Mall *********************************************

// Here we will delete the mall as well as the mall manager
app.delete('/deleteMall', isAdmin, (req, res) => {
    const { Mall_id } = { ...req.body };
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

    res.send("Deleted Successfully");
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
app.post('/UpdateMall', isAdmin, isMallManager, (req, res) => {
    const { Name, C_no, Address, Desc, Mall_id } = { ...req.body };
    connection.query(`UPDATE \`mall\` SET Name = '${Name}', C_no = '${C_no}', Address = '${Address}', Description = '${Desc}' WHERE Mall_id = ${Mall_id};`,
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
app.post('/addShop', isMallManager, (req, res) => {
    const { Name, C_no, Email, Address, Mall_id } = { ...req.body };
    connection.query(`INSERT INTO \`shops\` (Name, C_no, Email, Address, Mall_id) VALUES ('${Name}','${C_no}','${Email}', '${Address}', '${Mall_id}');`,
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
app.delete('/deleteShop', (isMallManager, (req, res) => {
    const { Shop_id } = { ...req.body };
    console.log(Shop_id);
    connection.query(`DELETE FROM \`shops\` WHERE Shop_id = ${Shop_id}`,
        function (err, result) {
            if (err)
                res.status(400).send("Error while deleting Try again");

            res.send("Successfully Deleted");
        }
    );

}))
// ************************************* Remove Shops ***********************************************

// ************************************* Update Shop Details ***********************************************

// Only the mall manager can update this

app.post('/UpdateShops', isMallManager, (req, res) => {
    const { Shop_id, Name, C_no, Email, Address } = { ...req.body };
    connection.query(`UPDATE \`shops\` SET Name = '${Name}', C_no = '${C_no}', Email = '${Email}', Address = '${Address}' WHERE Shop_id = ${Shop_id};`,
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

app.get("/AllPersons", isAdmin, (req, res) => {
    connection.query(`SELECT * FROM \'persons\'`, function (error, result) {
        if (error)
            return res.status(404).json("")
        res.json(result);
    })
})

app.get('/malls', (req, res) => {
    connection.query(`SELECT * FROM \'mall\'`, function (error, result) {
        if (error)
            return res.status(404).json("")
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

