interface ManageAuthConfig {
    AUDIENCE: string;
    DOMAIN: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    GRANT_TYPE: string;
  };
  
  export const MANAGE_AUTH_CONFIG: ManageAuthConfig = {
    AUDIENCE: 'https://yolesa.auth0.com/api/v2/',
    DOMAIN: 'yolesa.auth0.com',
    CLIENT_ID: '54625ckl2sPi6mfdy413Yow4SlTxo8id',
    CLIENT_SECRET: 'mVeO0dLrxcvPSVWUt4MzJQRTL6MgCylX4eGKZFhe4dJW5KGoONKf1oxl-kVu5F8m',
    GRANT_TYPE: 'client_credentials',
  };