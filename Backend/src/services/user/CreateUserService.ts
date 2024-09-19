import prismaClient from "../../prisma";

interface UserRequest{
    first_name: string;
    last_name: string,
    matricula: number;
    courseid: number;
}


class CreateUserService{
    async execute({first_name, last_name, matricula, courseid, }: UserRequest){

        if(!matricula){
            throw new Error("Email Incorrect")
        }

        const userAlreadyExists = await prismaClient.student.findFirst({
            where:{
                matricula: matricula
            }
        })

        if(userAlreadyExists){
            throw new Error("User Already exists")
        }

        //Criação do Usuário
        const student = await prismaClient.student.create({
            data:{
                first_name: first_name,
                last_name:last_name,
                matricula:matricula,
                courseId:courseid
            }
        })

        return {
            student
        }
    }
}

export {CreateUserService}