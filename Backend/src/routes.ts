import {Router, Request, Response} from 'express';
import {CreateUserController} from './controllers/user/CreateUserController'
import { CreateTableAlunos } from './services/CreateTableAlunosService/CreateTableAlunosService';
import { FindCursosController } from './controllers/FindCursos/FindCursosController';
import { CreateMundoSENAI } from './controllers/MundoSENAI/CreateMundoSENAIController';
import { CreateListAlunos } from './controllers/CreateListAlunos/CreateListAlunos';

const router = Router();

//--Rotas Alunos --//

router.post("/students", new CreateUserController().handle) //Cria o aluno
router.get("/mundo-senai-aluno", new CreateListAlunos().handle)

//--Rotas Tables --//

router.get("/students/table", new CreateTableAlunos().handle);

//--Rotas Curso --//

router.get("/courses", new FindCursosController().getAllCourses) //Printa os cursos no aluno registro

//--Rotas Mundo SENAI --//

router.post("/mundo-senai", new CreateMundoSENAI().handle)

export {router};