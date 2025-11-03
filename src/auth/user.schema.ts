import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


 export type UserDocument = User & Document ; 


 @Schema({
    timestamps : true , 
 })

 export class User  {
    @Prop({required : true , unique : true}) 
    email : string ; 

    @Prop()
    passwordHash : string ; 

    @Prop()
    name : string ; 

    @Prop()
    createdAt:Date ; 
    @Prop()

    updatedAt : Date ; 

 }

 export const UserSchema = SchemaFactory.createForClass(User);
 UserSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_doc : any, ret : any) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.passwordHash;
      return ret;
    },
  });
  