import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import QuizIcon from '@mui/icons-material/Quiz';
import GradeIcon from '@mui/icons-material/Grade';
import BadgeIcon from '@mui/icons-material/Badge';
import EventIcon from '@mui/icons-material/Event';
import { Button } from '../../../components/Buttons/SubmitBtn';
import { CancelBtn } from '../../../components/Buttons/CancelBtn';
import { useGetCertificateByIdQuery } from '../../../services/certificates/certificateQuery';
import { ErrorHandler } from '../../../utils/ErrorHandler';
import { downloadCertificatePdf, fetchCertificatePdfUrl, openCertificatePdf } from '../../../utils/certificatePdf';

function formatDate(value?: string | null): string {
  if (!value) {
    return 'Not recorded';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Not recorded';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function OneCertificatePage() {
  const { id } = useParams();
  const certificateId = Number(id);
  const navigate = useNavigate();
  const { data: certificate, isLoading, isError } = useGetCertificateByIdQuery(certificateId, {
    skip: !certificateId,
  });
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    async function loadPdf(): Promise<void> {
      if (!certificateId) {
        return;
      }
      try {
        const objectUrl = await fetchCertificatePdfUrl(certificateId);
        if (isActive) {
          setPdfUrl(objectUrl);
        } else {
          URL.revokeObjectURL(objectUrl);
        }
      } catch (error) {
        ErrorHandler.show(error);
      }
    }
    void loadPdf();
    return () => {
      isActive = false;
    };
  }, [certificateId]);

  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  async function handleDownload(): Promise<void> {
    if (!certificate) {
      return;
    }
    try {
      await downloadCertificatePdf(certificate.id, `${certificate.certificateCode}.pdf`);
    } catch (error) {
      ErrorHandler.show(error);
    }
  }

  async function handleOpenPreview(): Promise<void> {
    try {
      await openCertificatePdf(certificateId);
    } catch (error) {
      ErrorHandler.show(error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-(--color-watermelon)"></div>
      </div>
    );
  }

  if (isError || !certificate) {
    return (
      <div className="max-w-xl mx-auto text-center py-20 space-y-4">
        <div className="text-red-500 font-bold text-xl">Certificate not found</div>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-xs"
        >
          Go Back
        </button>
      </div>
    );
  }

  const gradeText =
    certificate.totalGrade !== null && certificate.totalGrade !== undefined
      ? `${certificate.grade} / ${certificate.totalGrade}`
      : String(certificate.grade);

  return (
    <div className="p-2 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <button
            onClick={() => navigate('/assignments/certificates')}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 mb-2"
          >
            <ArrowBackIcon fontSize="small" />
            Back to certificates
          </button>
          <h1 className="text-2xl font-bold">Certificate details</h1>
          <p className="text-sm text-gray-500 mt-1">{certificate.certificateCode}</p>
        </div>
        <div className="flex w-full max-w-md">
          <Button name="Open PDF" onClick={() => void handleOpenPreview()} />
          <CancelBtn name="Download" onClick={() => void handleDownload()} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 p-4 space-y-3">
          <InfoRow icon={<PersonIcon fontSize="small" />} label="Student" value={certificate.studentFullName} />
          <InfoRow icon={<SchoolIcon fontSize="small" />} label="Course" value={certificate.courseName} />
          <InfoRow icon={<QuizIcon fontSize="small" />} label="Exam" value={certificate.examTitle} />
          <InfoRow icon={<GradeIcon fontSize="small" />} label="Grade" value={gradeText} />
          <InfoRow icon={<BadgeIcon fontSize="small" />} label="Certificate ID" value={certificate.certificateCode} />
          <InfoRow icon={<EventIcon fontSize="small" />} label="Completion date" value={formatDate(certificate.completionDate)} />
          <InfoRow icon={<EventIcon fontSize="small" />} label="Issued at" value={formatDate(certificate.issuedAt)} />
        </div>
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden min-h-[640px]">
          {pdfUrl ? (
            <iframe title="Certificate preview" src={pdfUrl} className="w-full h-[760px] border-0" />
          ) : (
            <div className="flex items-center justify-center h-[760px] text-gray-500">
              Loading certificate preview...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
      <div className="text-gray-400 mt-0.5">{icon}</div>
      <div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{label}</p>
        <p className="text-sm text-gray-800 font-bold">{value}</p>
      </div>
    </div>
  );
}
