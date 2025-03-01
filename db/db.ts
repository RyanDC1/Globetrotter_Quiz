import mongoose, { Connection } from "mongoose";

let connection: Connection | null = null;

export default async function connectToDB() {
    if (connection) {
        return connection;
    }
    try {
        mongoose.set('strictQuery', true)   // Validate against schema
        const mongoDb = await mongoose.connect(process.env.MONGO_DB_URI, { dbName: process.env.DB_NAME });
        connection = mongoDb.connection;
        console.log("New mongodb connection established");
        return connection;
    } catch (error) {
        console.log(error);
        throw error;
    }
}