// al the token generate  is being sotored in cookeies 
// i will ge ttoken from cokkies and autheticatre the user with the help of secret key and token generrated 
import jwt from "jsonwebtoken";
// cookies is inside the requestbidy 

const isAuthenticate = async (req, res, next) => {

    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "user not authenticated. " })
        }

        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
       console.log(decode);
       
        if (!decode) {
            return res.status(401).json({
                message: "invalid token"
            })
        }

        req.id = decode.userId;
        next();

    }
    catch (error) {
        console.log(error);

    } // any error ?
    //  if there is any error in the process of token verification or any other error it will be catched here and logged to the console.
    // if there is no error and the token is valid, the user ID extracted from the token will be attached to the request object (req.id) for further use in the application, and the next() function will be called to pass control to the next middleware or route handler.
}
export default isAuthenticate;



const req = {
    id: "",

}
req.id = "1234567890"