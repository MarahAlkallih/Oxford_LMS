import { baseApi } from '../../api/baseApi';
import type { CertificateRecord } from "../../types/Certificate";

const certificateMutationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    regenerateCertificate: builder.mutation<CertificateRecord, number>({
      query: (id) => ({
        url: `/certificates/${id}/regenerate`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['Certificate'],
    }),
  }),
});

export const { useRegenerateCertificateMutation } = certificateMutationApi;
