import * as packageJson from '../../package.json';
export const environment = {
    production: false,
    serverUrl: 'http://localhost:8080/',
    version: packageJson.version,
    name: 'local',
    ssoDomain: 'localhost',
    systemName: packageJson.name,
    defaultLanguage: 'pt-br'
};
