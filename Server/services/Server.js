
import conectDb from '../config/db.js';
const startServer = async (app) => {
    try {
       await conectDb(); 
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });
       
    } catch (error) {
        console.error('Error starting the server:', error.message);
    }
};
export default startServer