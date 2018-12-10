const _isDev = window.location.port.indexOf('4200') > -1;
const getHost = () => {
    const protocol = window.location.protocol;
    const host = window.location.host;
    return `${protocol}//${host}`;
};
const apiURI = _isDev ? 'https://localhost:44314/api/' : `/api/`;
const mgmtApiURI = 'https://yolesa.auth0.com/api/v2/';

export const ENV = {
    BASE_URI: getHost(),
    BASE_API: apiURI,
    MGMT_API: mgmtApiURI
};

