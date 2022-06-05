// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { user?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config({path: '../.env'});
 
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
            
    await client.connect();
        
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
   
    const userCollection: mongoDB.Collection = db.collection(process.env.USER_COLLECTION_NAME);
 
    collections.user = userCollection;
      
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${userCollection.collectionName}`);
}