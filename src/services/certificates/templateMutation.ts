import { baseApi } from '../../api/baseApi';
import type {
  CertificateTemplate,
  CreateCertificateTemplateInput,
  UpdateCertificateTemplateInput,
} from "../../types/Certificate";

const templateMutationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCertificateTemplate: builder.mutation<
      CertificateTemplate,
      CreateCertificateTemplateInput
    >({
      query: (body) => ({
        url: '/certificate-templates',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CertificateTemplate'],
    }),
    updateCertificateTemplate: builder.mutation<
      CertificateTemplate,
      { id: number; data: UpdateCertificateTemplateInput }
    >({
      query: ({ id, data }) => ({
        url: `/certificate-templates/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['CertificateTemplate'],
    }),
    deleteCertificateTemplate: builder.mutation<{ message: string }, number>({
      query: (id) => ({
        url: `/certificate-templates/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CertificateTemplate'],
    }),
    setDefaultCertificateTemplate: builder.mutation<CertificateTemplate, number>({
      query: (id) => ({
        url: `/certificate-templates/${id}/set-default`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['CertificateTemplate'],
    }),
    uploadCertificateTemplateAsset: builder.mutation<
      CertificateTemplate,
      { id: number; formData: FormData }
    >({
      query: ({ id, formData }) => ({
        url: `/certificate-templates/${id}/assets`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['CertificateTemplate'],
    }),
  }),
});

export const {
  useCreateCertificateTemplateMutation,
  useUpdateCertificateTemplateMutation,
  useDeleteCertificateTemplateMutation,
  useSetDefaultCertificateTemplateMutation,
  useUploadCertificateTemplateAssetMutation,
} = templateMutationApi;
