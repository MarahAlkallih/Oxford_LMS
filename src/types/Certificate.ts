export type CertificateElementKey =
  | 'logo'
  | 'title'
  | 'congratulations'
  | 'recognition'
  | 'studentName'
  | 'courseName'
  | 'grade'
  | 'completionDate'
  | 'issueDate'
  | 'certificateId';

export type CertificateTemplateStatus = 'Draft' | 'Published';

export type CertificateLayoutField = {
  x: number;
  y: number;
  fontSize: number;
  align: 'left' | 'center' | 'right';
  enabled: boolean;
  label?: string;
};

export type CertificateLayout = {
  page: {
    size: 'A4';
    orientation: 'landscape' | 'portrait';
    backgroundColor: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  texts: {
    title: string;
    congratulations: string;
    recognition: string;
  };
  textFields: {
    title: CertificateLayoutField;
    congratulations: CertificateLayoutField;
    recognition: CertificateLayoutField;
  };
  fields: {
    studentName: CertificateLayoutField;
    courseName: CertificateLayoutField;
    grade: CertificateLayoutField;
    completionDate: CertificateLayoutField;
    issueDate: CertificateLayoutField;
    certificateId: CertificateLayoutField;
  };
  logo: {
    x: number;
    y: number;
    width: number;
    height: number;
    enabled: boolean;
  };
  backgroundImage: {
    opacity: number;
    enabled: boolean;
  };
};

export type CertificateTemplate = {
  id: number;
  name: string;
  description: string | null;
  status: CertificateTemplateStatus;
  isDefault: boolean;
  layout: CertificateLayout;
  backgroundImagePath: string | null;
  logoPath: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type CertificateRecord = {
  id: number;
  certificateCode: string;
  assignmentUserId: number;
  userId: number;
  courseId: number;
  examId: number;
  templateId: number;
  studentFullName: string;
  courseName: string;
  examTitle: string;
  grade: number;
  totalGrade: number | null;
  completionDate: string;
  issuedAt: string;
  filePath: string;
  createdAt?: string;
  updatedAt?: string;
};

export type PaginationMeta = {
  totalRecords: number;
  currentPage: number;
  perPage?: number;
  limit?: number;
  totalPages: number;
};

export type CertificateTemplatesResponse = {
  data: CertificateTemplate[];
  meta: PaginationMeta;
};

export type CertificatesResponse = {
  data: CertificateRecord[];
  meta: PaginationMeta;
};

export type GetCertificateTemplatesParams = {
  page?: number;
  limit?: number;
  status?: CertificateTemplateStatus;
};

export type GetCertificatesParams = {
  page?: number;
  limit?: number;
  userId?: number;
  courseId?: number;
  examId?: number;
};

export type CreateCertificateTemplateInput = {
  name: string;
  description?: string;
  status?: CertificateTemplateStatus;
  isDefault?: boolean;
  layout?: CertificateLayout;
};

export type UpdateCertificateTemplateInput = Partial<CreateCertificateTemplateInput>;

export type CertificateSampleData = {
  studentFullName?: string;
  courseName?: string;
  examTitle?: string;
  grade?: number;
  totalGrade?: number;
  completionDate?: string;
  issueDate?: string;
  certificateCode?: string;
};

export const DEFAULT_CERTIFICATE_LAYOUT: CertificateLayout = {
  page: {
    size: 'A4',
    orientation: 'landscape',
    backgroundColor: '#ffffff',
  },
  colors: {
    primary: '#1a365d',
    secondary: '#4a5568',
    accent: '#c9a227',
  },
  texts: {
    title: 'Certificate of Completion',
    congratulations: 'Congratulations on successfully completing this course.',
    recognition: 'This certificate is awarded in recognition of your achievement.',
  },
  textFields: {
    title: { x: 421, y: 130, fontSize: 28, align: 'center', enabled: true },
    congratulations: { x: 421, y: 175, fontSize: 14, align: 'center', enabled: true },
    recognition: { x: 421, y: 420, fontSize: 14, align: 'center', enabled: true },
  },
  fields: {
    studentName: { x: 421, y: 240, fontSize: 32, align: 'center', enabled: true },
    courseName: {
      x: 421,
      y: 300,
      fontSize: 18,
      align: 'center',
      enabled: true,
      label: 'Course:',
    },
    grade: { x: 421, y: 350, fontSize: 16, align: 'center', enabled: true, label: 'Final Grade:' },
    completionDate: {
      x: 200,
      y: 475,
      fontSize: 12,
      align: 'left',
      enabled: true,
      label: 'Completion Date:',
    },
    issueDate: {
      x: 500,
      y: 475,
      fontSize: 12,
      align: 'right',
      enabled: true,
      label: 'Issue Date:',
    },
    certificateId: {
      x: 421,
      y: 515,
      fontSize: 10,
      align: 'center',
      enabled: true,
      label: 'Certificate ID:',
    },
  },
  logo: { x: 371, y: 55, width: 100, height: 60, enabled: false },
  backgroundImage: { opacity: 0.15, enabled: false },
};