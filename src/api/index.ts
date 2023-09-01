import axios, { AxiosResponse } from 'axios';

import { createAuthClient, LoginRequest, LoginResponse } from './proto-http/auth/index';
// NFTMintRequestListArray -> NFTMintResponseListArray should rename in GO part ?
// import { createNftClient, NFTMintRequestListArray } from './proto-http/nft';

// export enum QUERIES {
//   getNftRequests = 'getNftRequests',
// }

export enum MUTATIONS {
  login = 'login',
}

// copy of type inside generated file (no export, need to define explicitly)
type RequestType = {
  path: string;
  method: string;
  body: string | null;
};

// const getAuthHeaders = (authToken: string) => ({
//   'Grpc-Metadata-Authorization': `Bearer ${authToken}`,
// });

// export const API_ENDPOINTS = {
//   login: 'http://backend.grbpwr.com:8081/api/login', // Replace with the actual backend URL
// };



export function login(username: string, password: string): Promise<LoginResponse> {
  const authClient = createAuthClient(({ path, body }: RequestType): Promise<LoginResponse> => {
    const url = 'http://backend.grbpwr.com:8081/api/auth/login';
    return axios
      .post<LoginRequest, AxiosResponse<LoginResponse>>(url, body && JSON.parse(body))
      .then((response) => response.data);
  });

  return authClient.Login({ username, password });
}



// const createAuthorizedNftClient = (authToken: string) => {
//   return createNftClient(
//     ({ path, method, body }: RequestType): Promise<NFTMintRequestListArray> => {
//       console.log(body);
//       switch (method.toLowerCase()) {
//         case 'get':
//         default:
//           return axios
//             .get<NFTMintRequestListArray>(path, { headers: getAuthHeaders(authToken) })
//             .then((response) => response.data);
//       }
//     },
//   );
// };

// export function getNftRequests(authToken: string): Promise<NFTMintRequestListArray> {
//   const nftClient = createAuthorizedNftClient(authToken);
//   return nftClient.ListNFTMintRequests(authToken);
// }