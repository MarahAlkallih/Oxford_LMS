
export interface Course {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  code: string;
  img: string;
  hours: number;
  fee: number;
  status: "UPCOMING" | "ONGOING" | "COMPLETED" | string;
  isActive: boolean;
  isAdd: boolean;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  paymentDeadline: string;
  categoryId: number;
  categoryName: string;
  languageId: number;
  locationId: number;
  locationName: string;
  venueId: number;
  venueName: string;
  createdById: number;
}


export interface EventExam {
  id: number;
  title: string;
  subTitle: string | null;
  code: string;
  examTime: number;
  gradePercentage: number;
  image: string;
  status: "Active" | "Inactive" | string;
  showCorrection: boolean;
  categoryId: number;
  examTypeId: number;
  languageId: number;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: number;
  examId: number;
  examInstanceId: number;
  courseId: number; // 🌟 تم إضافته بناءً على الداتا الجديدة
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  
  // العلاقات المضمنة القادمة من السيرفر (Relations)
  course: Course;    // 🌟 كائن الكورس الكامل المضاف حديثاً
  exam: EventExam;   // تفاصيل الامتحان المرفق بالحدث
}

// 4. معلومات الصفحات (Pagination Meta)
export interface PaginationMeta {
  totalRecords: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

// 5. الاستجابة الكاملة الراجعة من راوت /exam-events
export interface EventResponse {
  data: Event[];
  meta: PaginationMeta;
}