import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

// Define constants
const app = express()
const port = 3000
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/"
const errorName = "Ain't Nothin Here That Goes By The Name Of"
const errorImage = "/images/booze.png"
const errorInstrunctions = "Don't cry over missing booze! Just search again or click the button below for a random drink"
const dontHave = "Either you know about a drink that we don't know about"
const youreDrunk = "Or, you've already a had a few and typo'd your search"

// Define middleware to parse ejs sheets and use static files
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))

// The API this project is using:
// https://www.thecocktaildb.com/api.php

/**
 * Get root directory to establish a home page
 */
app.get("/", async (req, res) => {
    let hMessage = "Get a Drink!"
    try{
        // Call API to get JSON details for a random drink
        const response = await axios.get(`${API_URL}random.php`)
        
        // Create local drinkObj from JSON 
        const drinkObj = response.data.drinks[0]
        
        // Method call to pull ingredients and amounts from JSON
        let ingredients = getIngredients(drinkObj)

        // Send data to index.ejs template to be displayed on website
        res.render("index.ejs", {
            drink: drinkObj,
            ingredients: ingredients
        })
    } catch (error){
        // Log any issues to the console
        console.log(error.message)
    }

})

/**
 * Call the API function to search for and return
 * a specific drinks based on user input. If
 * drink cannot be found display a meesage to user.
 */
app.post("/search", async (req, res) => {
    let drinkName = req.body.input
    try{
        const response = await axios.get(`${API_URL}search.php?s=${drinkName}`)
        // const result = response.data
        const drinkObj = response.data.drinks[0]

        let ingredients = getIngredients(drinkObj)

        res.render("index.ejs", {
            drink: drinkObj,
            ingredients: ingredients
        })
    } catch (error){
        // The error message to the server for developer research
        console.log(error.message)
        // Create error messages in the format to be displayed in the ejs template
        const noDrink = [
            {
                strDrink: `${errorName} "${drinkName}"`, 
                strDrinkThumb: `${errorImage}`, 
                strInstructions: `${errorInstrunctions}`
            }    
        ]
        const ingredients = [
            {amount: "", ingredient: `${dontHave}`},
            {amount: "", ingredient: `${youreDrunk}`}
        ]
        // Pass error messages to index.ejs template
        res.render("index.ejs", {
            drink: noDrink[0],
            ingredients: ingredients
        })
    }
})

/**
 * Take the JSON drinkObj and return filtered list of all ingrendients and 
 * required amounts which dos not include empty or null ingredients.
 * @param {*} drinkObj 
 * @returns 
 */
function getIngredients(drinkObj){
    //Instantiate a list of all ingredient JSON values
    let listIngredients = [
        {amount: drinkObj.strMeasure1, ingredient: drinkObj.strIngredient1},
        {amount: drinkObj.strMeasure2, ingredient: drinkObj.strIngredient2},
        {amount: drinkObj.strMeasure3, ingredient: drinkObj.strIngredient3},
        {amount: drinkObj.strMeasure4, ingredient: drinkObj.strIngredient4},
        {amount: drinkObj.strMeasure5, ingredient: drinkObj.strIngredient5},
        {amount: drinkObj.strMeasure6, ingredient: drinkObj.strIngredient6},
        {amount: drinkObj.strMeasure7, ingredient: drinkObj.strIngredient7},
        {amount: drinkObj.strMeasure8, ingredient: drinkObj.strIngredient8},
        {amount: drinkObj.strMeasure9, ingredient: drinkObj.strIngredient9},
        {amount: drinkObj.strMeasure10, ingredient: drinkObj.strIngredient10},
        {amount: drinkObj.strMeasure11, ingredient: drinkObj.strIngredient11},
        {amount: drinkObj.strMeasure12, ingredient: drinkObj.strIngredient12},
        {amount: drinkObj.strMeasure13, ingredient: drinkObj.strIngredient13},
        {amount: drinkObj.strMeasure14, ingredient: drinkObj.strIngredient14},
        {amount: drinkObj.strMeasure15, ingredient: drinkObj.strIngredient15}
    ]
    // Instantiate filtered list object
    let filteredList = []
    // Filter out null/empty ingredients
    listIngredients.forEach((ing) => {
        if(ing.ingredient != null && ing.ingredient != ""){
            filteredList.push({amount: ing.amount, ingredient: ing.ingredient})
        }
    })
    // Return the filtered list
    return filteredList
}


/**
 * Create a listener on a give port to run the application
 */
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

/**
 * Example json returned from API
 * 
    {
        "drinks": [
            {
                "idDrink": "178352",
                "strDrink": "Frosé",
                "strDrinkAlternate": null,
                "strTags": "Cold, Frozen, Summer",
                "strVideo": null,
                "strCategory": "Cocktail",
                "strIBA": null,
                "strAlcoholic": "Alcoholic",
                "strGlass": "Cocktail glass",
                "strInstructions": "Step 1\r\nPour rosé into a 13x9\" pan and freeze until almost solid (it won't completely solidify due to the alcohol), at least 6 hours.\r\n\r\nStep 2\r\nMeanwhile, bring sugar and ½ cup water to a boil in a medium saucepan; cook, stirring constantly, until sugar dissolves, about 3 minutes. Add strawberries, remove from heat, and let sit 30 minutes to infuse syrup with strawberry flavor. Strain through a fine-mesh sieve into a small bowl (do not press on solids); cover and chill until cold, about 30 minutes.\r\n\r\nStep 3\r\nScrape rosé into a blender. Add lemon juice, 3½ ounces strawberry syrup, and 1 cup crushed ice and purée until smooth. Transfer blender jar to freezer and freeze until frosé is thickened (aim for milkshake consistency), 25–35 minutes.\r\n\r\nStep 4\r\nBlend again until frosé is slushy. Divide among glasses.\r\n\r\nStep 5\r\nDo Ahead: Rosé can be frozen 1 week ahead.",
                "strInstructionsES": null,
                "strInstructionsDE": null,
                "strInstructionsFR": null,
                "strInstructionsIT": null,
                "strInstructionsZH-HANS": null,
                "strInstructionsZH-HANT": null,
                "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/b4cadp1619695347.jpg",
                "strIngredient1": "Rose",
                "strIngredient2": "Sugar",
                "strIngredient3": "Strawberries",
                "strIngredient4": "Lemon Juice",
                "strIngredient5": null,
                "strIngredient6": null,
                "strIngredient7": null,
                "strIngredient8": null,
                "strIngredient9": null,
                "strIngredient10": null,
                "strIngredient11": null,
                "strIngredient12": null,
                "strIngredient13": null,
                "strIngredient14": null,
                "strIngredient15": null,
                "strMeasure1": "750 ml",
                "strMeasure2": "1/2 cup",
                "strMeasure3": "8 oz",
                "strMeasure4": "2-3 oz",
                "strMeasure5": "",
                "strMeasure6": "",
                "strMeasure7": "",
                "strMeasure8": null,
                "strMeasure9": null,
                "strMeasure10": null,
                "strMeasure11": null,
                "strMeasure12": null,
                "strMeasure13": null,
                "strMeasure14": null,
                "strMeasure15": null,
                "strImageSource": "TheCocktailDB",
                "strImageAttribution": null,
                "strCreativeCommonsConfirmed": "Yes",
                "dateModified": null
            }
        ]
    }
 */