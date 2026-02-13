import { User } from "../model/usermodel.js"
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

        await User.create({
            fullName, userName, password, profilePhoto , gender
        })


} 

catch (error){
    res.status(500).json({ message : "Internal server error"})

}
}