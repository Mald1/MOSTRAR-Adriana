import { Request, Response } from 'express';
import prismaClient from '../../prisma';

class CreateTableAlunos {
  async handle(req: Request, res: Response) {

    const students = await prismaClient.student.findMany({
      include: {
        course: true, 
      },
    });

    return res.json(students);
  }
}

export { CreateTableAlunos };
