import { createUser } from "../models/User_model.js";
import HashPassword from "../services/HashPassword.js";
class UserController {
   async register(req, res){
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }
         const Hash_password = await HashPassword.hash(password);
       const resp=await createUser(username, email, Hash_password)
       res.send(resp);
    }
    login(req, res) {
        res.send("User logged in successfully ✅");
    }

    logout(req, res) {
        res.send("User logged out successfully ✅");
    }
}

export default new UserController();
