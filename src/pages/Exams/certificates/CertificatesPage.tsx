import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IconButton, Stack, Tooltip } from '@mui/material';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { type GridColDef } from '@mui/x-data-grid';
import CustomDataGrid from '../../../components/DataGrid/DataGrid';

import { Button } from '../../../components/Buttons/SubmitBtn';
import { useRegenerateCertificateMutation } from '../../../services/certificates/certificateMutation';
import { useGetCertificatesQuery } from '../../../services/certificates/certificateQuery';
import { ErrorHandler } from '../../..//utils/ErrorHandler';
import { downloadCertificatePdf } from '../../../utils/certificatePdf';
import { useGetActiveUncompingCourseQuery
  
 } from '../../../services/courses/Admin-courses/coursesQuery';
 import { useGetTraineesQuery } from '../../..//services/users/GetTrainees';
 import { useGetExamsQuery } from '../../../services/exams/exams/examQuery';
import CustomDropdown from '../../../components/Fields/DropDown';
export function CertificatesPage() {
  const {data:trainees}=useGetTraineesQuery({
    page:1,
    limit:100
  })
  const {data:exams}=useGetExamsQuery({})
  const {data:courses}=useGetActiveUncompingCourseQuery()
  console.log(exams)
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();
  const [draftFilters, setDraftFilters] = useState({
    userId: '',
    courseId: '',
    examId: '',
  });
  const [filters, setFilters] = useState({
    userId: undefined as number | undefined,
    courseId: undefined as number | undefined,
    examId: undefined as number | undefined,
  });
  const { data, isLoading, refetch } = useGetCertificatesQuery({
    page: page + 1,
    limit: pageSize,
    userId: filters.userId,
    courseId: filters.courseId,
    examId: filters.examId,
  });
  const [regenerateCertificate, { isLoading: isRegenerating }] = useRegenerateCertificateMutation();
 console.log("data",data)
  function applyFilters(): void {
    setFilters({
      userId: draftFilters.userId ? Number(draftFilters.userId) : undefined,
      courseId: draftFilters.courseId ? Number(draftFilters.courseId) : undefined,
      examId: draftFilters.examId ? Number(draftFilters.examId) : undefined,
    });
    setPage(0);
  }

  async function handleDownload(certificateId: number, certificateCode: string): Promise<void> {
    try {
      await downloadCertificatePdf(certificateId, `${certificateCode}.pdf`);
    } catch (error) {
      ErrorHandler.show(error);
    }
  }

  async function handleRegenerate(certificateId: number): Promise<void> {
    try {
      await regenerateCertificate(certificateId).unwrap();
      toast.success('Certificate regenerated');
      void refetch();
    } catch (error) {
      ErrorHandler.show(error);
    }
  }

  const columns: GridColDef[] = [
    { field: 'studentFullName', headerName: 'Student', flex: 1, minWidth: 160 },
    { field: 'courseName', headerName: 'Course', flex: 1, minWidth: 160 },
    { field: 'examTitle', headerName: 'Exam', flex: 1, minWidth: 140 },
    {
      field: 'grade',
      headerName: 'Grade',
      width: 120,
      valueGetter: (_value, row) =>
        row.totalGrade !== null && row.totalGrade !== undefined
          ? `${row.grade} / ${row.totalGrade}`
          : String(row.grade),
    },
    { field: 'certificateCode', headerName: 'Certificate ID', flex: 1, minWidth: 180 },
    {
      field: 'issuedAt',
      headerName: 'Issued',
      width: 130,
      valueGetter: (_value, row) => new Date(row.issuedAt).toLocaleDateString(),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="View">
            <IconButton
              size="small"
              onClick={() => navigate(`/assignments/certificates/${params.row.id}`)}
            >
              <VisibilityOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Download">
            <IconButton
              size="small"
              onClick={() => void handleDownload(params.row.id, params.row.certificateCode)}
            >
              <DownloadOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Regenerate">
            <IconButton
              disabled={isRegenerating}
              size="small"
              onClick={() => void handleRegenerate(params.row.id)}
            >
              <AutorenewOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      ),
    },
  ];

  const rows = (data?.data ?? []).map((certificate) => ({
    ...certificate,
    id: certificate.id,
  }));

  return (
    <div className="p-2">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Issued Certificates</h1>
        <p className="text-sm text-gray-500 mt-1">
          View certificates generated after students pass certifying exams.
        </p>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 p-4 mb-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
       <CustomDropdown
  options={exams?.data.map((e) => e.title) || []}
  placeholder="Select Exam"
  onSelect={(value) => {
    const selected = exams?.data.find(
      (e) => e.title === value
    );

    setFilters({
      ...filters,
      examId: selected?.id || 0,
    });
  }}
/>
    <CustomDropdown
  options={trainees?.data.map((t) => t.account.userName) || []}
  placeholder="Select Trainee"
  onSelect={(value) => {
    const selected = trainees?.data.find(
      (t) => t.account.userName === value
    );

    setFilters({
      ...filters,
      userId: selected?.id || 0,
    });
  }}
/>
 <CustomDropdown
  options={courses?.map((c) =>c.title) || []}
  placeholder="Select Course"
  onSelect={(value) => {
    const selected = courses?.find(
      (c) => c.title === value
    );

    setFilters({
      ...filters,
      courseId: selected?.id || 0,
    });
  }}
/>
       
       
        <Button name="Apply Filters" onClick={applyFilters} />
      </div>
      <CustomDataGrid
        columns={columns}
        loading={isLoading}
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        rowCount={data?.meta?.totalRecords ?? 0}
        rows={rows}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
      />
    </div>
  );
}
