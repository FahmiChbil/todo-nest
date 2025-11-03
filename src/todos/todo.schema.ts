import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TodoDocument = Todo & Document;  

@Schema( {
    timestamps : true
})
export class Todo {
    @Prop({required : true}) 
    title : string ; 


    @Prop() 
    description?:string ; 

    @Prop({default :false})
    isDone : boolean ;   

    readonly createdAt?: Date;
    readonly updatedAt?: Date;


  

    

} 
export const TodoSchema = SchemaFactory.createForClass(Todo);


TodoSchema.set('toJSON', {
  virtuals: true,        // include virtuals if any later
  versionKey: false,     // removes __v
  transform: (_doc: any, ret: any) => {
    // ret is the plain object that will be sent as JSON
    ret.id = ret._id?.toString();    // create "id" field from "_id"
    delete ret._id;                  // remove _id
    return ret;
  },
});