// External dependencies
import { ObjectId } from "mongodb";

// Class Implementation
export default class Users {
    constructor(public username: string, public userid: number, public userphonenumber: number, public id?: ObjectId) {}
}