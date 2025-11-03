import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './todo.schema';
import { Model } from 'mongoose';

@Injectable()
export class TodosService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}


findAllTodos()  : Promise<Todo[]> {
    return this.todoModel.find().exec() ; 
}

createTodo(todo : Omit<Todo, 'id' > ) : Promise<Todo> {
   const newTodo = new this.todoModel(todo) ; 
   return newTodo.save() ; 




}

async updateTodo(id: string , updatedData : Partial<Todo>) : Promise<Todo> {
    const updatedTodo = await this.todoModel.findByIdAndUpdate(id , updatedData ,  {new : true});
    if (!updatedTodo) throw new NotFoundException(`Todo with id ${id} not found`); 
    return updatedTodo;

   
}

async deleteTodo(id: string) : Promise<Todo> {
    const deleted = await this.todoModel.findByIdAndDelete(id);
    if(!deleted ) throw new NotFoundException('todo with id ${id} not found') ; 
    return deleted ; 
}
}