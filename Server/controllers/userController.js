class UserController {
    register(req, res) {
        res.send("User registered successfully ✅");
    }

    login(req, res) {
        res.send("User logged in successfully ✅");
    }

    logout(req, res) {
        res.send("User logged out successfully ✅");
    }
}

// Export class ka instance
export default new UserController();
