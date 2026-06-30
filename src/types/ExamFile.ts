import type { Exam } from "./Exam";

export interface ExamFile{
     id: number;
    examId: number;
    createdAt: string,
    updatedAt: string,
    path: string,
    exam:Exam
}

