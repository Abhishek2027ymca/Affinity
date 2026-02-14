// al the token generate  is being sotored in cookeies 
// i will ge ttoken from cokkies and autheticatre the user with the help of secret key and token generrated 
import jwt from "jsonwebtoken";
// cookies is inside the requestbidy 

const isAuthenticate = async (req, res, next) => {

    try {
        const token = req.cookies.token;

        if(!token){
            return res.status(401).json({message : "user not authenticated. "})
        }

        const decode = await jwt.verify(token , process.env.JWT_SECRET_KEY );
     
        if(!decode){
            return res.status(401).json({
                message : "invalid token"
            })
        }

        req.id = decode.userId;
        next();

    }
    catch (error) {
        console.log(error);

    }

}
export default isAuthenticate;



const req ={
    id :"" ,

}
req.id ="1234567890"