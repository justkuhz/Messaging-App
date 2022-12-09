/* jsonwebtoken is an package that uses jwt.io to generate an encrypted webtoken.
    This gets sent into userControlled for the registerUser function. 
    When a new user a created, a unique webtoken gets attached to the json data.
*/

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    }); 
};

module.exports = generateToken;