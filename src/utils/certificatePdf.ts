import { getAccessToken } from '../features/admin/auth/authStorage';
import type { CertificateSampleData } from "../types/certificate";

const API_BASE_URL = import.meta.env.VITE_API_URL as string;

async function fetchPdfBlob(path: string, init?: RequestInit): Promise<Blob> {
  const token = getAccessToken();
  const headers: Record<string, string> = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  if (init?.body) {
    headers['Content-Type'] = 'application/json';
  }
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers as Record<string, string> | undefined),
    },
    credentials: 'include',
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'PDF request failed');
  }
  return response.blob();
}

export async function fetchCertificatePdfUrl(certificateId: number): Promise<string> {
  const blob = await fetchPdfBlob(`/certificates/${certificateId}/download`);
  return URL.createObjectURL(blob);
}

export async function downloadCertificatePdf(
  certificateId: number,
  fileName: string,
): Promise<void> {
  const objectUrl = await fetchCertificatePdfUrl(certificateId);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

export async function openCertificatePdf(certificateId: number): Promise<void> {
  const objectUrl = await fetchCertificatePdfUrl(certificateId);
  window.open(objectUrl, '_blank', 'noopener,noreferrer');
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
}

export async function openCertificateTemplatePdf(
  templateId: number,
  sampleData: CertificateSampleData,
): Promise<void> {
  const blob = await fetchPdfBlob(`/certificate-templates/${templateId}/preview`, {
    method: 'POST',
    body: JSON.stringify({ sampleData }),
  });
  const objectUrl = URL.createObjectURL(blob);
  window.open(objectUrl, '_blank', 'noopener,noreferrer');
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
}
