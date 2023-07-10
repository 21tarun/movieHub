import mongoose from "mongoose"

const MONGODB_URL = "mongodb+srv://tarun21:tarun1616@cluster0.h0l8mir.mongodb.net/movieHub";




let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {con: null, promise: null}
}

const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }


// If a connection does not exist, we check if a promise is already in progress. If a promise is already in progress, we wait for it to resolve to get the connection
    if (!cached.promise) {
        const opts = {
            bufferCommands : false
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;