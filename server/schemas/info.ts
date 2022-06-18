import {Schema} from 'mongoose';
import * as mongoose from 'mongoose';

const InfoSchema = new Schema({
  image: {type: String, required: true},
  name: {type: String, required: true},
  job: {type: String, required: true},
  desc: {type: String, required: true},
  workWidthTittle: {type: String, required: true},
  workWidth: {type: String, required: true},
  contacts: [{type: Object}],
});
module.exports=mongoose.model<IInfo>('InfoSchema', InfoSchema);

export interface IInfo extends mongoose.Document{
    image:string
    name:string
    desc:string,
    workWidth:string,
    contacts:object,
    links:object,
}
