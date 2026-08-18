import { useState } from 'react';
import { Button } from '../../Buttons/SubmitBtn';
import { CancelBtn } from '../../Buttons/CancelBtn';
import { InputField } from '../../Fields/InputField';
import { Modal } from '../../global/Modals';
import type { CertificateSampleData } from "../../../types/certificate";

type CertificatePreviewModalProps = {
  open: boolean;
  isLoading: boolean;
  onClose: () => void;
  onPreview: (sampleData: CertificateSampleData) => void;
};

const DEFAULT_SAMPLE_DATA: CertificateSampleData = {
  studentFullName: 'aya almzayek',
  courseName: 'Nest js',
  examTitle: 'senior Nest js',
  grade: 100,
  totalGrade: 100,
  completionDate: '2026-02-22',
  issueDate: '2026-02-22',
  certificateCode: 'ENG-AYA',
};

export function CertificatePreviewModal({
  open,
  isLoading,
  onClose,
  onPreview,
}: CertificatePreviewModalProps) {
  const [sampleData, setSampleData] = useState<CertificateSampleData>(DEFAULT_SAMPLE_DATA);

  function updateField<K extends keyof CertificateSampleData>(
    key: K,
    value: CertificateSampleData[K],
  ): void {
    setSampleData((current) => ({ ...current, [key]: value }));
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col gap-3 p-2 min-w-[420px] max-w-[520px]">
        <h2 className="text-xl font-semibold text-center">Preview Certificate</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter sample values to preview this template.
        </p>
        <InputField
          label="Student full name"
          value={sampleData.studentFullName ?? ''}
          onChange={(event) => updateField('studentFullName', event.target.value)}
        />
        <InputField
          label="Course name"
          value={sampleData.courseName ?? ''}
          onChange={(event) => updateField('courseName', event.target.value)}
        />
        <InputField
          label="Exam title"
          value={sampleData.examTitle ?? ''}
          onChange={(event) => updateField('examTitle', event.target.value)}
        />
        <div className="flex gap-2">
          <InputField
            label="Grade"
            type="number"
            value={String(sampleData.grade ?? '')}
            onChange={(event) => updateField('grade', Number(event.target.value))}
          />
          <InputField
            label="Total grade"
            type="number"
            value={String(sampleData.totalGrade ?? '')}
            onChange={(event) => updateField('totalGrade', Number(event.target.value))}
          />
        </div>
        <InputField
          label="Completion date"
          type="date"
          value={sampleData.completionDate ?? ''}
          onChange={(event) => updateField('completionDate', event.target.value)}
        />
        <InputField
          label="Issue date"
          type="date"
          value={sampleData.issueDate ?? ''}
          onChange={(event) => updateField('issueDate', event.target.value)}
        />
        <InputField
          label="Certificate code"
          value={sampleData.certificateCode ?? ''}
          onChange={(event) => updateField('certificateCode', event.target.value)}
        />
        <div className="flex pt-2">
          <div className="flex-1">
            <Button
              name={isLoading ? 'Opening...' : 'Preview'}
              onClick={() => onPreview(sampleData)}
            />
          </div>
          <div className="flex-1">
            <CancelBtn name="Cancel" onClick={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
}
