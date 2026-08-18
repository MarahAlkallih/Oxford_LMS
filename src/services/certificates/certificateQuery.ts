import { baseApi } from '../../api/baseApi';
import type { CertificateRecord, CertificatesResponse, GetCertificatesParams } from "../../types/Certificate";

const certificateQueryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCertificates: builder.query<CertificatesResponse, GetCertificatesParams | void>({
      query: (params) => ({
        url: '/certificates',
        params: params ?? {},
      }),
      providesTags: ['Certificate'],
    }),
    getCertificateById: builder.query<CertificateRecord, number>({
      query: (id) => `/certificates/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Certificate', id }],
    }),
  }),
});

export const { useGetCertificatesQuery, useGetCertificateByIdQuery } = certificateQueryApi;
