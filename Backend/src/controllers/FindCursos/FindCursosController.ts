import {Request, Response} from 'express'
import prismaClient from '../../prisma';

class FindCursosController{
    async getAllCourses(req: Request, res: Response) {
        try {
          const courses = await prismaClient.course.findMany();
          res.status(200).json(courses);
        } catch (error) {
          res.status(500).json({ error: "Erro ao buscar os cursos" });
        }
      }
    }


export {FindCursosController}