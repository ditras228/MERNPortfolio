import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

const WorkSchema = new Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
  tags: {type: Array},
  mark: {type: Array},
  links: {type: Object},
});
module.exports=mongoose.model<IWork>('WorkSchema', WorkSchema);


export interface IWork extends mongoose.Document{
    name:string
    desc:string,
    tags:Array<any>,
}
