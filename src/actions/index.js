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
