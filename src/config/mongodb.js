import {MongoClient} from "mongodb"

let client;

export const connectToMongoDB =  () => {
     MongoClient.connect(process.env.DB_URL)
    .then(clientInstance => {
        client = clientInstance;
        console.log("Connected to MongoDB")
        createIndexes(client.db());
    })
    .catch(err => console.log(err))
}

export const getDb = () => {
    return client.db()
}

export const getClient = () => {
    return client;
}

export const createIndexes = async (db) => {
    try {
        await db.collection("products").createIndex({price : 1})
        await db.collection("products").createIndex({name : 1, category : -1})
        await db.collection("products").createIndex({desc: "text"})
    } catch (error) {
        console.log(error)
    }
    console.log("Indexes created")
}