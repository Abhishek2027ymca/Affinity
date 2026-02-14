import User from "../model/usermodel.js"  // Remove the curly braces
import bcrypt from "bcryptjs"; // is this coorect 
import jwt from "jsonwebtoken"
export const register = async (req, res) => {

    try {
        const { fullName, username , password, confirmaPassword, gender } = req.body;
        if (!fullName || !username || !password || !confirmaPassword || !gender) {
            return res.status(400).json({ message: "All fileds are required " });
        }
        if (password !== confirmaPassword) {
            return res.status(400).json({ message: "password and confirma password should be same " })
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: " user already exist try diffrent username" });

        }


        const hashedPassword = await bcrypt.hash(password , 5)
        // now need to add hasjed password 

        const maleProfilePhoto = "https://avatar.iran.liara.run/public/boy?userName=${userName}"
        const femaleProfilePhoto = "https://avatar.iran.liara.run/public/girl?userName=${userName}"
        // const profilePhoto = gender === "male" ? maleProfilePhoto : femaleProfilePhoto;


        await User.create({
            fullName, username, password: hashedPassword, profilePhoto : gender === "male" ? maleProfilePhoto : femaleProfilePhoto, gender 
        })

  return res.status(201).json({message : "user registered succesfully "})

     
} 

catch (error){
console.log(error);

}
}
// what does this controller do 
// this controller is responsible for registering a user in our database

//________________LOGIN CONTROLLER____________________

export const login = async (req,res)=>{


    try{
        const {username ,password} = req.body;
        if(!username || !password ){
            return res.status(400).json({message : 
            " All filed are required "  })
        }
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({
                message:"incorrect username or password",
                success:false 
            })

        }

        const isPasswordMatch = await bcrypt.compare(password, user.password); // t or false
        if(!isPasswordMatch){ // corected  the logic 
            return res.status(400).json({
                message:"incorrect username or password",
                success : false 
            })
        }
 
        // toekndata is an  object arrya 
        const tokenData = {
            userId:user._id
        }

        const token = await jwt.sign(tokenData , process.env. JWT_SECRET_KEY , {expiresIn : '1d'});
     return res.status(200).cookie("token" , token , {maxAge: 1*24*60*60*1000, httpOnly : true , sameSite :"strict"}).json({

      _id : user._id, // getting refrence from userschema 
        username : user.username,
        fullName : user.fullName,
        profilePhoto : user.profilePhoto,
     })  // response on clinet iside 

    }
    catch(error){
        console.log(error );
        
    }
}
