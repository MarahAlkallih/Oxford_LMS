import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import { Button } from '../../../components/Buttons/SubmitBtn';
import { CertificatePreviewModal } from '../../../components/Exam/Certificates/CertificatePreviewModal';
import { CustomPagination } from '../../../components/global/CustomPagination';
import {
  useDeleteCertificateTemplateMutation,
  useSetDefaultCertificateTemplateMutation,
} from '../../../services/certificates/templateMutation';
import { useGetCertificateTemplatesQuery } from '../../../services/certificates/templateQuery';
import type { CertificateSampleData } from "../../../types/Certificate";
import { ErrorHandler } from '../../../utils/ErrorHandler';
import { openCertificateTemplatePdf } from '../../../utils/certificatePdf';

export function CertificateTemplatesPage() {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [previewTemplateId, setPreviewTemplateId] = useState<number | null>(null);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetCertificateTemplatesQuery({ page, limit });
  const [deleteTemplate] = useDeleteCertificateTemplateMutation();
  const [setDefaultTemplate] = useSetDefaultCertificateTemplateMutation();

  async function handleDelete(templateId: number): Promise<void> {
    if (!window.confirm('Delete this certificate template?')) {
      return;
    }
    try {
      await deleteTemplate(templateId).unwrap();
      toast.success('Template deleted');
      void refetch();
    } catch (error) {
      ErrorHandler.show(error);
    }
  }

  async function handleSetDefault(templateId: number): Promise<void> {
    try {
      await setDefaultTemplate(templateId).unwrap();
      toast.success('Default template updated');
      void refetch();
    } catch (error) {
      ErrorHandler.show(error);
    }
  }

  async function handlePreview(sampleData: CertificateSampleData): Promise<void> {
    if (!previewTemplateId) {
      return;
    }
    try {
      setIsPreviewLoading(true);
      await openCertificateTemplatePdf(previewTemplateId, sampleData);
      setPreviewTemplateId(null);
    } catch (error) {
      ErrorHandler.show(error);
    } finally {
      setIsPreviewLoading(false);
    }
  }

  const templates = data?.data ?? [];
  const totalPages = data?.meta?.totalPages ?? 1;

  return (
    <div className="p-2">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Certificate Templates</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage certificate layouts used when exams issue certificates.
          </p>
        </div>
        <div>
           <Button name="Add Template" onClick={() => navigate('/assignments/certificates/templates/new')} />
   </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {isLoading ? <p className="p-6 text-gray-500">Loading templates...</p> : null}
        {!isLoading && templates.length === 0 ? (
          <p className="p-6 text-gray-500">No certificate templates yet.</p>
        ) : null}
        {!isLoading && templates.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-xs uppercase tracking-wide text-gray-500">
                <th className="p-4">Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Default</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((template) => (
                <tr key={template.id} className="border-b border-gray-100">
                  <td className="p-4">
                    <div className="font-semibold">{template.name}</div>
                    {template.description ? (
                      <div className="text-sm text-gray-500">{template.description}</div>
                    ) : null}
                  </td>
                  <td className="p-4">{template.status}</td>
                  <td className="p-4">{template.isDefault ? 'Yes' : 'No'}</td>
                  <td className="p-4">
                    <Stack direction="row" spacing={0.5}>
                      <Tooltip title="Edit">
                        <IconButton size="small" onClick={() => navigate(`/assignments/certificates/templates/${template.id}/edit`)}>
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Preview">
                        <IconButton size="small" onClick={() => setPreviewTemplateId(template.id)}>
                          <PreviewOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      {!template.isDefault ? (
                        <Tooltip title="Set default">
                          <IconButton size="small" onClick={() => void handleSetDefault(template.id)}>
                            <StarOutlineOutlinedIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                      <Tooltip title="Delete">
                        <IconButton size="small" onClick={() => void handleDelete(template.id)}>
                          <DeleteOutlineOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
      <div className="mt-4">
        <CustomPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
      <CertificatePreviewModal
        open={previewTemplateId !== null}
        isLoading={isPreviewLoading}
        onClose={() => setPreviewTemplateId(null)}
        onPreview={(sampleData) => void handlePreview(sampleData)}
      />
    </div>
  );
}
