import { Request, Response } from "express";
import prismaClient from "../../prisma";

class CreateListAlunos{
    async handle(req:Request, res:Response){
        try{
            const aluno = await prismaClient.student.findMany({
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    courseId: true,
                }
            })
            res.status(200).json(aluno);
        } catch (error){
            res.status(500).json({ error: "Erro ao buscar os alunos" });
        }


}}

export {CreateListAlunos}