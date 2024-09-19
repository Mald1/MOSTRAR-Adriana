import {Request, Response} from 'express'
import {CreateUserService} from '../../services/user/CreateUserService'

class CreateUserController{
    async handle(req: Request, res: Response){
        const {first_name, last_name, matricula, courseid} = req.body
        
        const createUserService = new CreateUserService();

        const student = await createUserService.execute({
            first_name, last_name, matricula, courseid
        });

        return res.json(student)
    }
}

export {CreateUserController}