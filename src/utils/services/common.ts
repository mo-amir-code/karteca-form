import mongoose from "mongoose"
import { connectToDB } from "../db/connectToDB";
import { ObjectType } from "../types/server/form";


export const isDBConnected = async () => {
    if(mongoose.connection.readyState !== 1) await connectToDB()
    return;
}

export const arrayToObject = (arr:[ObjectType]) => {
    const obj: {[field:string]:string} = {};
    arr.forEach(({field, value}:ObjectType) => {
        obj[field] = value;
    });
    return obj;
}