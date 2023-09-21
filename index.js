import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
const port = 3000

/**
 * Get root to establish a home page
 */
app.get("/", (req, res) => {
    let hMessage = "Get a Drink!"
    res.render("index.ejs", {message: hMessage})

})

/**
 * Create a listener on a give port to run the application
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})