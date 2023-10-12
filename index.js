const express = require("express");
const app = express();
const port = 3000;
const mysql = require("./connection").con

app.set("view engine", "hbs")
app.use(express.static(__dirname + "/public"))

app.get("/", (req, res) => {
    res.render("main")
})

app.get("/add", (req, res) => {
    res.render("add")
})

app.get("/search", (req, res) => {
    res.render("search")
})

app.get("/update", (req, res) => {
    res.render("update")
})

app.get("/delete", (req, res) => {
    res.render("delete")
})

app.get("/view", (req, res) => {
    let qry = "SELECT * FROM test";
    mysql.query(qry, (err, results) => {
        if (err)
            throw err;
        else {
            console.log(results);
            res.render("view", { data: results });
        }
    });
});


app.get("/addfees", (req, res) => {
    res.render("addfees")
})


app.get("/viewfees", (req, res) => {
    res.render("viewfees")
})


app.get("/addstandard", (req, res) => {
    res.render("addstandard")
})

app.get("/searchstandrard", (req, res) => {
    res.render("searchstandrards")
})

app.get("/updatestandard", (req, res) => {
    res.render("updatestandards")
})

app.get("/deletestandard", (req, res) => {
    res.render("deletestandards")
})

app.get("/viewstandard", (req, res) => {
    let qry = "SELECT * FROM standards";
    mysql.query(qry, (err, results) => {
        if (err)
            throw err;
        else {
            console.log(results);
            res.render("viewstandards", { data: results });
        }
    });
});


app.get("/addfees1", (req, res) => {
    const { student_unique_no, payment_amount, fee_type, academic_year, payment_status }  = req.query
    let qry = "INSERT INTO transaction ( student_unique_no, payment_amount, fee_type, academic_year, payment_status ) VALUES (?, ?, ?, ?, ?)";
    mysql.query(qry, [ student_unique_no, payment_amount, fee_type, academic_year, payment_status ], (err, results) => {
        if (err) throw err;
        else if (results.affectedRows > 0) {
            res.render("addfees", { mesg: true });
        }
    });
});


app.get("/addstandards", (req, res) => {
    const { name, teacher, division, max_students} = req.query
    let qry = "INSERT INTO standards (name, teacher, division, max_students) VALUES (?, ?, ?, ?)";
    mysql.query(qry, [name, teacher, division, max_students], (err, results) => {
        if (err) throw err;
        else if (results.affectedRows > 0) {
            res.render("addstandard", { mesg: true });
        }
    });
});


app.get("/searchstandard", (req, res) => {
    const { name } = req.query
    let qry = "SELECT * from standards where name=?"
    mysql.query(qry, [name], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("searchstandards", { mesg1: true, mesg2: false })
            }
            else {
                res.render("searchstandards", { mesg1: false, mesg: true })
            }
        }
    })
})


//update standard ---------------------------------------------------------//

app.get("/updatestandardsearch", (req, res) => {
   
    const { name } = req.query;
    let qry = "SELECT * FROM standards WHERE name=?";
    mysql.query(qry, [name], (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {

                 res.render("updatestandards", { mesg1: true, mesg2: false, data: results})
                 
            } else {
                console.log(results);
                res.render("updatestandards", { mesg1: false, mesg2: true });
            }
        }
    });
});


app.get("/viewfees1", (req, res) => {
   
    const { student_unique_no } = req.query;
    let qry = "SELECT * FROM transaction WHERE student_unique_no=?";
    mysql.query(qry, [student_unique_no], (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {

                 res.render("viewfees", { mesg1: true, mesg2: false, data: results})
                 
            } else {
                console.log(results);
                res.render("viewfees", { mesg1: false, mesg2: true });
            }
        }
    });
});


app.get("/viewresults1", (req, res) => {
   
    const { student_unq_no } = req.query;
    let qry = "SELECT * FROM results WHERE student_unq_no=?";
    mysql.query(qry, [student_unq_no], (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {

                 res.render("viewresults", { mesg1: true, mesg2: false, data: results})
                 
            } else {
                console.log(results);
                res.render("viewresults", { mesg1: false, mesg2: true });
            }
        }
    });
});



app.get("/updatestandard1", (req, res) => {
    const { name, teacher, division, max_students } = req.query;
    
    let qry = "UPDATE standards SET teacher=?, division=?, max_students=? WHERE name=?";
   
    mysql.query(qry, [teacher, division, max_students, name], (err, results) => {
        if (err) throw err;
        else
         {
            if (results.affectedRows > 0) {
                res.render("updatestandards", { umesg: true });
            }
        }
    });


});



//update standard ---------------------------------------------------------------//

//delete stanndard------------------------------------------------------------------//

app.get("/deletestandard1", (req, res) => {
    const { name } = req.query;
    let qry = "DELETE FROM standards WHERE name=?";
    mysql.query(qry, [name], (err, results) => {
        if (err) throw err;
        else {
            if (results.affectedRows > 0) {
                res.render("deletestandards", { mesg: true });
            } else {
                res.render("deletestandards", { mesg2: true });
            }
        }
    });
});

// delete standard---------------------------------------------------------------------------------------//


app.get("/addsubjects", (req, res) => {
    res.render("addsubjects")
})

app.get("/searchsubjects", (req, res) => {
    res.render("searchsubjects")
})

app.get("/updatesubjects", (req, res) => {
    res.render("updatesubjects")
})

app.get("/deletesubjects", (req, res) => {
    res.render("deletesubjects")
})


app.get("/addresults", (req, res) => {
    res.render("addresults")
})


app.get("/viewresults", (req, res) => {
    res.render("viewresults")
})
  

app.get("/addresults1", (req, res) => {
    const {student_unq_no, year, marks, status} = req.query
    let qry = "INSERT INTO results (student_unq_no, year, marks, status) VALUES (?, ?, ?, ?)";
    mysql.query(qry, [ student_unq_no, year, marks, status], (err, results) => {
        if (err) throw err;
        else if (results.affectedRows > 0) {
            res.render("addresults", { mesg: true });
        }
    });
});



app.get("/viewsubjects", (req, res) => {
    let qry = "SELECT * FROM subjects";
    mysql.query(qry, (err, results) => {
        if (err)
            throw err;
        else {
            console.log(results);
            res.render("viewsubjects", { data: results });
        }
    });
});


app.get("/addsubjects1", (req, res) => {
    const { name, standard, teacher} = req.query
    let qry = "INSERT INTO subjects ( name, standard, teacher) VALUES (?, ?, ?)";
    mysql.query(qry, [ name, standard, teacher], (err, results) => {
        if (err) throw err;
        else if (results.affectedRows > 0) {
            res.render("addsubjects", { mesg: true });
        }
    });
});

//---------------------------------------------------------------------------update subject

app.get("/updatesubjectsearch", (req, res) => {
   
    const { standard } = req.query;
    let qry = "SELECT * FROM subjects WHERE standard=?";
    mysql.query(qry, [standard], (err, results) => {
        if (err) throw err;
        else {
            if (results.length > 0) {

                 res.render("updatesubjects", { mesg1: true, mesg2: false, data: results})
                 
            } else {
                res.render("updatesubjects", { mesg1: false, mesg2: true });
            }
        }
    });
});

app.get("/updatesubject1", (req, res) => {
    const { name, standard, teacher} = req.query;
    console.log(req.query);
    let qry = "UPDATE subjects SET name=?, teacher=? WHERE standard=?";
   
    mysql.query(qry, [name, teacher, standard], (err, results) => {
        if (err) throw err;
        else
         {
            if (results.affectedRows > 0) {
                res.render("updatesubjects", { umesg: true });
            }
        }
    });


});

//----------------------------------------------------------------------------delete subject


app.get("/deletesubjects1", (req, res) => {
    const { name } = req.query;
    let qry = "DELETE FROM subjects WHERE name=?";
    mysql.query(qry, [name], (err, results) => {
        if (err) throw err;
        else {
            if (results.affectedRows > 0) {
                res.render("deletesubjects", { mesg: true });
            } else {
                res.render("deletesubjects", { mesg2: true });
            }
        }
    });
});


//----------------------------------------------------------------------------delete subject


app.get("/searchsubject", (req, res) => {
    const { name } = req.query
    let qry = "SELECT * from subjects where name=?"
    mysql.query(qry, [name], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("searchsubjects", { mesg1: true, mesg2: false })
            }
            else {
                res.render("searchsubjects", { mesg1: false, mesg: true })
            }
        }
    })
})



app.get("/addstudent", (req, res) => {
    const { name, phone, email, gender } = req.query;
    let qry = "SELECT * FROM test WHERE email=? OR phone=?";
    mysql.query(qry, [email, phone], (err, results) => {
        if (err) throw err;
        else if (results.length > 0) {
            res.render("add", { chkmesg: true });
        } else {
            let qry2 = "INSERT INTO test (name, phone, email, gender) VALUES (?, ?, ?, ?)";
            mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                if (err) throw err;
                else if (results.affectedRows > 0) {
                    res.render("add", { mesg: true });
                }
            });
        }
    });
});



app.get("/searchstudent", (req, res) => {
    const { phone } = req.query
    let qry = "SELECT * from test where phone=?"
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            }
            else {
                res.render("search", { mesg1: false, mesg: true })
            }
        }
    })
})

app.get("/updatesearch", (req, res) => {
    const { phone } = req.query
    let qry = "SELECT * from test where phone=?"
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            }
            else {
                res.render("update", { mesg: false, mesg2: true })
            }
        }
    })
})

app.get("/updatestudent", (req, res) => {
    const { name, phone, email, gender } = req.query
    let qry = "UPDATE test set name=?, email=?, gender=? where phone=?"
    mysql.query(qry, [name, email, gender, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })
})

app.get("/deletestudent", (req, res) => {
    const { phone } = req.query;
    let qry = "DELETE FROM test WHERE phone=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err;
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg: true });
            } else {
                res.render("delete", { mesg2: true });
            }
        }
    });
});



app.listen(port, (err) => {
    if (err) throw err;
    else
        console.log("server is running at :%d", port);
})

