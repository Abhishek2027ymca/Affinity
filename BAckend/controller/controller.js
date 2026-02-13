import { User } from "../model/usermodel.js"
import bcrypt from "bcryptjs";
export const register = async (req, res) => {

    try {
        const { fullName, userName, password, confirmaPassword, gender } = req.body;
        if (!fullName || !userName || !password || !confirmaPassword || !gender) {
            return res.status(400).json({ message: "All fileds are required " });
        }
        if (password !== confirmaPassword) {
            return res.status(400).json({ message: "password and confirma password should be same " })
        }

        const user = await User.findOne({ userName });
        if (user) {
            return res.status(400).json({ message: " user already exist try diffrent username" });

        }


        const hashedPassword = await bcrypt.hash(password , 5)
        // now need to add hasjed password 

        const maleProfilePhoto = "https://avatar.iran.liara.run/public/boy?userName=${userName}"
        const femaleProfilePhoto = "https://avatar.iran.liara.run/public/girl?userName=${userName}"
        // const profilePhoto = gender === "male" ? maleProfilePhoto : femaleProfilePhoto;


        await User.create({
            fullName, userName, password: hashedPassword, profilePhoto : gender === "male" ? maleProfilePhoto : femaleProfilePhoto, gender 
        })

     
} 

catch (error){
console.log(error);

}
}