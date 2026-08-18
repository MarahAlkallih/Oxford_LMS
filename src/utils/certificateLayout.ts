import type {
  CertificateElementKey,
  CertificateLayout,
  CertificateLayoutField,
} from '../types/certificate';
import { DEFAULT_CERTIFICATE_LAYOUT } from '../types/certificate';

export type CertificatePageSize = {
  width: number;
  height: number;
};

const LANDSCAPE_SIZE: CertificatePageSize = { width: 842, height: 595 };
const PORTRAIT_SIZE: CertificatePageSize = { width: 595, height: 842 };

const TEXT_FIELD_KEYS = ['title', 'congratulations', 'recognition'] as const;
const DYNAMIC_FIELD_KEYS = [
  'studentName',
  'courseName',
  'grade',
  'completionDate',
  'issueDate',
  'certificateId',
] as const;

export const CERTIFICATE_PREVIEW_VALUES: Record<(typeof DYNAMIC_FIELD_KEYS)[number], string> = {
  studentName: 'Jane Doe',
  courseName: 'Introduction to Web Development',
  grade: '92 / 100',
  completionDate: 'August 15, 2026',
  issueDate: 'August 15, 2026',
  certificateId: 'CERT-20260815-ABC12345',
};

export const CERTIFICATE_ELEMENT_LABELS: Record<CertificateElementKey, string> = {
  logo: 'Logo',
  title: 'Title',
  congratulations: 'Congratulations text',
  recognition: 'Recognition text',
  studentName: 'Student name',
  courseName: 'Course name',
  grade: 'Grade',
  completionDate: 'Completion date',
  issueDate: 'Issue date',
  certificateId: 'Certificate ID',
};

export function getCertificatePageSize(
  orientation: CertificateLayout['page']['orientation'],
): CertificatePageSize {
  if (orientation === 'portrait') {
    return PORTRAIT_SIZE;
  }
  return LANDSCAPE_SIZE;
}

function mergeField(
  fallback: CertificateLayoutField,
  source?: CertificateLayoutField,
): CertificateLayoutField {
  return { ...fallback, ...source };
}

export function mergeCertificateLayout(layout?: CertificateLayout | null): CertificateLayout {
  const source = layout ?? DEFAULT_CERTIFICATE_LAYOUT;
  return {
    page: { ...DEFAULT_CERTIFICATE_LAYOUT.page, ...source.page },
    colors: { ...DEFAULT_CERTIFICATE_LAYOUT.colors, ...source.colors },
    texts: { ...DEFAULT_CERTIFICATE_LAYOUT.texts, ...source.texts },
    textFields: {
      title: mergeField(DEFAULT_CERTIFICATE_LAYOUT.textFields.title, source.textFields?.title),
      congratulations: mergeField(
        DEFAULT_CERTIFICATE_LAYOUT.textFields.congratulations,
        source.textFields?.congratulations,
      ),
      recognition: mergeField(
        DEFAULT_CERTIFICATE_LAYOUT.textFields.recognition,
        source.textFields?.recognition,
      ),
    },
    fields: {
      studentName: mergeField(DEFAULT_CERTIFICATE_LAYOUT.fields.studentName, source.fields?.studentName),
      courseName: mergeField(DEFAULT_CERTIFICATE_LAYOUT.fields.courseName, source.fields?.courseName),
      grade: mergeField(DEFAULT_CERTIFICATE_LAYOUT.fields.grade, source.fields?.grade),
      completionDate: mergeField(
        DEFAULT_CERTIFICATE_LAYOUT.fields.completionDate,
        source.fields?.completionDate,
      ),
      issueDate: mergeField(DEFAULT_CERTIFICATE_LAYOUT.fields.issueDate, source.fields?.issueDate),
      certificateId: mergeField(
        DEFAULT_CERTIFICATE_LAYOUT.fields.certificateId,
        source.fields?.certificateId,
      ),
    },
    logo: { ...DEFAULT_CERTIFICATE_LAYOUT.logo, ...source.logo },
    backgroundImage: {
      ...DEFAULT_CERTIFICATE_LAYOUT.backgroundImage,
      ...source.backgroundImage,
    },
  };
}

export function isTextElementKey(
  key: CertificateElementKey,
): key is (typeof TEXT_FIELD_KEYS)[number] {
  return TEXT_FIELD_KEYS.includes(key as (typeof TEXT_FIELD_KEYS)[number]);
}

export function isDynamicFieldKey(
  key: CertificateElementKey,
): key is (typeof DYNAMIC_FIELD_KEYS)[number] {
  return DYNAMIC_FIELD_KEYS.includes(key as (typeof DYNAMIC_FIELD_KEYS)[number]);
}

export function moveCertificateElement(
  layout: CertificateLayout,
  key: CertificateElementKey,
  x: number,
  y: number,
): CertificateLayout {
  if (key === 'logo') {
    return { ...layout, logo: { ...layout.logo, x, y } };
  }
  if (isTextElementKey(key)) {
    return {
      ...layout,
      textFields: {
        ...layout.textFields,
        [key]: { ...layout.textFields[key], x, y },
      },
    };
  }
  return {
    ...layout,
    fields: {
      ...layout.fields,
      [key]: { ...layout.fields[key], x, y },
    },
  };
}

export function resizeCertificateLogo(
  layout: CertificateLayout,
  width: number,
  height: number,
): CertificateLayout {
  return {
    ...layout,
    logo: {
      ...layout.logo,
      width: Math.max(24, width),
      height: Math.max(16, height),
    },
  };
}

export function getDynamicFieldPreview(key: (typeof DYNAMIC_FIELD_KEYS)[number], field: CertificateLayoutField): string {
  const value = CERTIFICATE_PREVIEW_VALUES[key];
  if (field.label) {
    return `${field.label} ${value}`;
  }
  return value;
}
