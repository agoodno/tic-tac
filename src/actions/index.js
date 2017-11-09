export const loadServerTemplates = (serverTemplates) => ({
  type: 'LOAD_SERVER_TEMPLATES',
  serverTemplates: serverTemplates
});

export const apologize = () => ({
  type: 'APOLOGIZE'
});

export const changeEnvironment = (env) => ({
  type: 'CHANGE_ENV',
  env: env
});

export const changeServerTemplate = (serverTemplate, countyNo) => ({
  type: 'CHANGE_SERVER_TEMPLATE',
  serverTemplate: serverTemplate,
  countyNo: countyNo
});

export const changeQueryTemplate = (queryTemplate) => ({
  type: 'CHANGE_QUERY_TEMPLATE',
  queryTemplate: queryTemplate
});
