const express = require("express");
const morgan = require("morgan");
const app = express();
const port = 3000;
const { engine } = require("express-handlebars");
const path = require("path");
const methodOverride = require('method-override')
// const NewController = require('./NewController')
const route = require("./routes");
const db = require('./config/db'); 

//connect to db
db.connect(); 


app.use(express.static(path.join(__dirname, "public")));
app.use(
    express.urlencoded({
        extended: true,
    }) 
);
app.use(express.json());
app.use(methodOverride('_method'));



app.engine(
    ".hbs",
    engine({
        extname: ".hbs",
        helpers: {
            // foo() { return 'FOO!'; },
            // bar() { return 'BAR!'; }, 
            sum(a, b) {return a+b;}, 
        }
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources/views"));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`Example app listening at http: //localhost:${port}`)
);
