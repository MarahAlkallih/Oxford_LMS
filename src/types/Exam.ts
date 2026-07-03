export interface File{
     id: number;
    examId: number;
    createdAt: string,
    updatedAt: string,
    path: string,
   
}
// 1. نموذج التصنيف (Category)
export interface Category {
  id: number;
  title: string;
  imagePath: string;
  createdAt: string;
  updatedAt: string;
}

// 2. نموذج نوع الامتحان (ExamType)
export interface ExamType {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 3. نموذج اللغة (Language)
export interface Language {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 4. نموذج الملفات المرفقة (ExamFile)
export interface ExamFile {
  id: number;
  examId: number;
  path: string;
  createdAt: string;
  updatedAt: string;
}

// 5. نموذج مالك الامتحان (ExamOwner)
export interface ExamOwner {
  id: number;
  accountId: number;
  createdAt: string;
  updatedAt: string;
  account?: Record<string, any>; // كائن الحساب الفرعي
}

// 6. النموذج الرئيسي للامتحان (Exam Model)
export interface Exam {
  id: number;
  title: string;
  subTitle: string | null; // معرف كـ null بناءً على الداتا المرسلة
  code: string;
  examTime: number; // بالدقائق
  gradePercentage: number; // نسبة النجاح
  image: string; // رابط الصورة الأساسية
  status: "Active" | "Inactive" | string; // تحديد دقيق للحالة
  showCorrection: boolean;
  
  // المعرفات (Foreign Keys)
  categoryId: number;
  examTypeId: number;
  languageId: number;
  ownerId: number;
  
  // الكائنات المضمنة (Relations)
  category: Category;
  examType: ExamType;
  language: Language;
  owner: ExamOwner;
  files: ExamFile[];
  examEvents: any[]; // مصفوفة الأحداث (فارغة حالياً ويمكن تحديد نوعها لاحقاً)
  
  // طوابع الوقت
  createdAt: string;
  updatedAt: string;
}

// export interface Exam{
//             id: number,
//             createdAt: string,
//             updatedAt: string,
//             code: string,
//             ownerId: number,
//             title: string,
//             subTitle: string | null,
//             image:string ,
//             gradePercentage: number,
//             languageId: number,
//             status: string,
//             categoryId: number,
//             examTypeId: number,
//             examTime: number,
//             showCorrection: boolean,
//             files:File[]
// }
export interface GetExamsParams {
  page?: number;
  limit?: number;

  languageId?: number;
  categoryId?: number;
  examTypeId?: number;
  status?: string;
}

export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface ExamsResponse {
  data: Exam[];
  meta: PaginationMeta;
}