import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';



@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
    constructor(private readonly todosService: TodosService) {}


    
    @Get()
    getAllTodos() :  Promise<Todo[]>{
        return this.todosService.findAllTodos();
 
    }

    @Post() 
    addTodo (@Body() body : CreateTodoDto ) {
        console.log('📩 Received body:', body); 
        const dataToCreate= {
            title : body.title,
            description : body.description,
            isDone : typeof body.isDone === 'boolean' ? body.isDone : false,
        }
   
       return this.todosService.createTodo(dataToCreate);
    } 

    @Put(':id') 
    updateTodo(@Param('id')  id  : string   , @Body() body : UpdateTodoDto ) {
        return this.todosService.updateTodo(id , body);

}   

@Delete(':id')
deleteTodo(@Param('id')  id  : string   ) {
    return this.todosService.deleteTodo(id);
}
}
