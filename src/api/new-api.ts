import { createAdminServiceClient } from './proto-http/admin';
import { createAuthServiceClient } from './proto-http/auth';
import { createFrontendServiceClient } from './proto-http/frontend';

interface RequestHandlerParams {
  path: string;
  method: string;
  body: string | null;
}

interface ProtoMetaParams {
  service: string;
  method: string;
}

export const requestHandler = async (
  { path, method, body }: RequestHandlerParams,
  { method: serviceMethod }: ProtoMetaParams,
) => {
  const token = localStorage.getItem('authToken');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Grpc-Metadata-Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/${path}`, {
      method,
      headers,
      body,
    });

    console.log('[BE] response: ', response.status, response.statusText);

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} - ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
    throw new Error(`Request failed: ${e}`);
  }
};

export const frontendService = createFrontendServiceClient(requestHandler);
export const adminService = createAdminServiceClient(requestHandler);
export const authService = createAuthServiceClient(requestHandler);
