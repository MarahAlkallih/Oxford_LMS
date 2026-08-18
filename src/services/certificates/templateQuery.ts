import { baseApi } from '../../api/baseApi';
import type {
  CertificateTemplate,
  CertificateTemplatesResponse,
  GetCertificateTemplatesParams,
} from "../../types/Certificate";

const templateQueryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCertificateTemplates: builder.query<
      CertificateTemplatesResponse,
      GetCertificateTemplatesParams | void
    >({
      query: (params) => ({
        url: '/certificate-templates',
        params: params ?? {},
      }),
      providesTags: ['CertificateTemplate'],
    }),
    getCertificateTemplateById: builder.query<CertificateTemplate, number>({
      query: (id) => `/certificate-templates/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'CertificateTemplate', id }],
    }),
  }),
});

export const {
  useGetCertificateTemplatesQuery,
  useGetCertificateTemplateByIdQuery,
} = templateQueryApi;
