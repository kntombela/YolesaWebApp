import { ENV } from "../core/env.config";

interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    RESPONSE_TYPE: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
    ROLE_NAMESPACE: string;
    PROFILE_NAMESPACE: string;
  };
  
  export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'VcWNz2N1x48Et4hS3Jd8Z4h5IhQP1jMB',
    CLIENT_DOMAIN: 'yolesa.auth0.com',
    RESPONSE_TYPE: 'token id_token',
    AUDIENCE: 'https://yolesa/api',
    REDIRECT: `${ENV.BASE_URI}/callback`,
    SCOPE: 'openid profile read:messages',
    ROLE_NAMESPACE: 'http://myapp.com/roles',
    PROFILE_NAMESPACE: 'http://myapp.com/profile'
  };