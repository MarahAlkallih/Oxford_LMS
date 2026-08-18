import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../../../../../../../Oxford_LMS_front/src/components/Buttons/SubmitBtn';
import { CancelBtn } from '../../../../../../../Oxford_LMS_front/src/components/Buttons/CancelBtn';
import { CertificateCanvas } from '../../../../../../../Oxford_LMS_front/src/components/Exam/Certificates/CertificateCanvas';
import { CertificateEditorSidebar } from '../../../../../../../Oxford_LMS_front/src/components/Exam/Certificates/CertificateEditorSidebar';
import { BACKEND_URL } from '../../../../../../../Oxford_LMS_front/src/config/env';
import {
  useCreateCertificateTemplateMutation,
  useUpdateCertificateTemplateMutation,
  useUploadCertificateTemplateAssetMutation,
} from '../../../../../../../Oxford_LMS_front/src/services/certificates/templateMutation';
import { useGetCertificateTemplateByIdQuery } from '../../../../../../../Oxford_LMS_front/src/services/certificates/templateQuery';
import type {
  CertificateElementKey,
  CertificateLayout,
  CertificateTemplateStatus,
  CreateCertificateTemplateInput,
} from '../../../../../../../Oxford_LMS_front/src/types/Certificate';
import { DEFAULT_CERTIFICATE_LAYOUT } from '../../../../../../../Oxford_LMS_front/src/types/Certificate';
import { ErrorHandler } from '../../../../../../../Oxford_LMS_front/src/utils/ErrorHandler';
import { mergeCertificateLayout } from '../../../../../../../Oxford_LMS_front/src/utils/certificateLayout';

function buildAssetUrl(path: string | null): string | null {
  if (!path) {
    return null;
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  return `${BACKEND_URL}/${path}`;
}

export function CertificateTemplateEditorPage() {
  const { id } = useParams();
  const templateId = id ? Number(id) : null;
  const isEditing = Boolean(templateId);
  const navigate = useNavigate();
  const { data: template, isLoading } = useGetCertificateTemplateByIdQuery(templateId ?? 0, {
    skip: !templateId,
  });
  const [createTemplate, { isLoading: isCreating }] = useCreateCertificateTemplateMutation();
  const [updateTemplate, { isLoading: isUpdating }] = useUpdateCertificateTemplateMutation();
  const [uploadAsset] = useUploadCertificateTemplateAssetMutation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<CertificateTemplateStatus>('Draft');
  const [isDefault, setIsDefault] = useState(false);
  const [layout, setLayout] = useState<CertificateLayout>(DEFAULT_CERTIFICATE_LAYOUT);
  const [selectedKey, setSelectedKey] = useState<CertificateElementKey | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [backgroundFile, setBackgroundFile] = useState<File | null>(null);
  const isSaving = isCreating || isUpdating;

  useEffect(() => {
    if (!template) {
      return;
    }
    setName(template.name);
    setDescription(template.description ?? '');
    setStatus(template.status);
    setIsDefault(template.isDefault);
    setLayout(mergeCertificateLayout(template.layout));
  }, [template]);

  const logoUrl = useMemo(() => {
    if (logoFile) {
      return URL.createObjectURL(logoFile);
    }
    return buildAssetUrl(template?.logoPath ?? null);
  }, [logoFile, template?.logoPath]);

  const backgroundUrl = useMemo(() => {
    if (backgroundFile) {
      return URL.createObjectURL(backgroundFile);
    }
    return buildAssetUrl(template?.backgroundImagePath ?? null);
  }, [backgroundFile, template?.backgroundImagePath]);

  useEffect(() => {
    return () => {
      if (logoUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(logoUrl);
      }
    };
  }, [logoUrl]);

  useEffect(() => {
    return () => {
      if (backgroundUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(backgroundUrl);
      }
    };
  }, [backgroundUrl]);

  async function uploadAssets(savedId: number): Promise<void> {
    if (logoFile) {
      const formData = new FormData();
      formData.append('assetType', 'logo');
      formData.append('file', logoFile);
      await uploadAsset({ id: savedId, formData }).unwrap();
    }
    if (backgroundFile) {
      const formData = new FormData();
      formData.append('assetType', 'background');
      formData.append('file', backgroundFile);
      await uploadAsset({ id: savedId, formData }).unwrap();
    }
  }

  async function handleSave(): Promise<void> {
    if (!name.trim()) {
      toast.error('Template name is required');
      return;
    }
    try {
      const payload: CreateCertificateTemplateInput = {
        name: name.trim(),
        description: description.trim() || undefined,
        status,
        isDefault,
        layout,
      };
      const saved = isEditing && templateId
        ? await updateTemplate({ id: templateId, data: payload }).unwrap()
        : await createTemplate(payload).unwrap();
      await uploadAssets(saved.id);
      toast.success(isEditing ? 'Template updated' : 'Template created');
      navigate('/assignments/certificates/templates');
    } catch (error) {
      ErrorHandler.show(error);
    }
  }

  if (isEditing && isLoading) {
    return <p className="p-6 text-gray-500">Loading template...</p>;
  }

  return (
    <div className="p-2 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">
            {isEditing ? 'Edit Certificate Template' : 'Add Certificate Template'}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Drag the logo and texts with your mouse. Change size, colors, and wording from the panel.
          </p>
        </div>
        <div className="flex w-full max-w-md">
          <Button name={isSaving ? 'Saving...' : 'Save'} onClick={() => void handleSave()} />
          <CancelBtn name="Cancel" onClick={() => navigate('/assignments/certificates/templates')} />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 items-start">
        <div className="flex-1 w-full bg-gray-100 rounded-2xl border border-gray-200 min-h-[520px]">
          <CertificateCanvas
            layout={layout}
            selectedKey={selectedKey}
            logoUrl={logoUrl}
            backgroundUrl={backgroundUrl}
            onSelect={setSelectedKey}
            onChange={setLayout}
          />
        </div>
        <CertificateEditorSidebar
          name={name}
          description={description}
          status={status}
          isDefault={isDefault}
          layout={layout}
          selectedKey={selectedKey}
          onNameChange={setName}
          onDescriptionChange={setDescription}
          onStatusChange={setStatus}
          onDefaultChange={setIsDefault}
          onLayoutChange={setLayout}
          onLogoFileChange={setLogoFile}
          onBackgroundFileChange={setBackgroundFile}
        />
      </div>
    </div>
  );
}
