import bcrypt from 'bcrypt';
class HashPassword {
    static async hash(password) {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    static async compare(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default HashPassword;