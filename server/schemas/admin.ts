import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

const AdminSchema = new Schema({
  login: {type: String, required: true},
  password: {type: String, required: true},
});
module.exports=mongoose.model<IAdmin>('AdminSchema', AdminSchema);


export interface IAdmin extends mongoose.Document{
    login:string
    password:string,
}
