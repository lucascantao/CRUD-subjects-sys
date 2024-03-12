import * as packageJson from '../../package.json';

export const environment = {
    production: false,
    serverUrl: 'http://rh-portaria-api-homolog.apps.ocp.semas.local/rh-portaria-api/',
    ssoDomain: '.apps.ocp.semas.local',
    idSistema: 2,
    version: packageJson.version,
    name: 'homologacao',
    systemName: packageJson.name
};