import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const app = express()
const port = 3000

// Define middleware to parse ejs sheets and use static files
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

// The API this project is using:
// https://www.thecocktaildb.com/api.php

/**
 * Get root to establish a home page
 */
app.get("/", async (req, res) => {
    let hMessage = "Get a Drink!"
    try{
        const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        const result = response.data
        const drinkObj = result.drinks[0]
        res.render("index.ejs", {
            message: hMessage,
            drink: drinkObj
        })
    } catch (error){
        console.log(error.message)
    }

})

/**
 * Create a listener on a give port to run the application
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})