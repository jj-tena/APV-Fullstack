import express from "express";
import connectDB from "./config/db.js";
import dotenv from 'dotenv';
import cors from 'cors';
import veterinaryRoutes from './routes/veterinaryRoutes.js';
import patientRoutes from './routes/patientRoutes.js'; 

const app = express();

app.use(express.json())

dotenv.config();

connectDB();

const allowedDomains = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback) {
        if(allowedDomains.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Request not allowed by CORS'))
        }
    }
};

app.use(cors(corsOptions));

app.use('/api/veterinaries', veterinaryRoutes);

app.use('/api/patients', patientRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Server listening in port ${PORT}`)
})
