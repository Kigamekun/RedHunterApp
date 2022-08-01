const express = require('express')
const cors = require('cors')
require("dotenv").config()


const db = require('./app/models/')
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Database connection established');
}).catch((err) => {
    console.log('Error connecting to database: ' + err.message);
    proccess.exit()
});

const app = express()

app.use(cors({ credentials:true, origin:'http://localhost:3000' }));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const port = 5000;



require('./routes/auth.routes')(app)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
