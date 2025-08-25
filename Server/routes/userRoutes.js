import UserController from "../controllers/userController.js";

const userRoutes=(router)=>{
 router.post("/register", UserController.register);
router.get("/login", UserController.login);
router.get("/logout", UserController.logout);
}
export default userRoutes