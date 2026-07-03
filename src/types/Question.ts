export interface OptionField {
  field: string;
  isCorrect: boolean;
}

export interface QuestionField {
  id: number;
  createdAt: string;
  updatedAt: string;
  questionId: number;
  field: string;
  isCorrect: boolean;
}

export interface QuestionFile {

    id:number;
    createdAt:string;
    updatedAt:string;
    questionId:number;

    path:string;

}

export interface Question {
  id: number;
  createdAt: string;
  updatedAt: string;
  examInstanceId: number;
  questionTypeId: number;
  questionText: string;
  questionNumber: number;
  correctAnswerGrade: number;
  wrongAnswerGrade: number;
  hint: string;
  showGrade: boolean;
  fields: QuestionField[];
  files: QuestionFile[];
}

export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface QuestionsResponse {
  data: Question[];
  meta: PaginationMeta;
}