import * as packageJson from '../../package.json';

export const environment = {
    production: true,
    serverUrl: 'http://rh-portaria-api-homolog.apps.ocp.semas.local/rh-portaria-api/',
    version: packageJson.version,
    ssoDomain: '.semas.pa.gov.br',
    name: 'producao',
    systemName: packageJson.name
};
