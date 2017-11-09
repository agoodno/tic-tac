// const serverTemplatesForEnv = (env) => {
//   if (env === 'inhouse') {
//     return [
//       {
//         "name": "dev2 -- 12 (Crawford)",
//         "url": "postgresql://viewer:viewer@165.219.80.102:5612/cc",
//         "domain": "CC",
//         "inhouse": true,
//         "countyNo": 12
//       },
//       {
//         "name": "dev2 -- 25 (Iowa)",
//         "url": "postgresql://viewer:viewer@165.219.80.102:5622/cc",
//         "domain": "CC",
//         "inhouse": true,
//         "countyNo": 25
//       }
//     ];
//   } else {
//     return [
//       {
//         "name": "ADAMS_sql -- 1",
//         "url": "postgresql://viewer:viewer@hotstandby:5401/cc",
//         "domain": "CC",
//         "inhouse": false,
//         "countyNo": 1
//       },
//       {
//         "name": "ASHLAND_sql -- 2",
//         "url": "postgresql://viewer:viewer@hotstandby:5402/cc",
//         "domain": "CC",
//         "inhouse": false,
//         "countyNo": 2
//       }
//     ];
//   }
// };

// const queryTemplatesForEnv = (env) => {
//   if (env === 'inhouse') {
//     return [
//       {
//         "name": "Counties Query",
//         "text": "SELECT \"countyNo\", \"countyName\", \"districtNo\" FROM \"County\" WHERE \"countyNo\" IN (SELECT cr.\"countyNo\" FROM \"ControlRecord\" AS cr);",
//         "environment": ["inhouse"]
//       },
//       {
//         "name": "County Query",
//         "text": "SELECT * FROM \"County\" WHERE \"countyNo\" = $countyNo;",
//         "environment": ["inhouse"]
//       }
//     ];
//   } else {
//     return [
//       {
//         "name": "ControlRecord Query",
//         "text": "SELECT * FROM \"ControlRecord\" WHERE \"countyNo\" = $countyNo;",
//         "environment": ["prod"]
//       },
//       {
//         "name": "ControlRecords Query",
//         "text": "SELECT * FROM \"ControlRecord\";",
//         "environment": ["prod"]
//       }
//     ];
//   }
// };

//serverTemplatesForEnv('inhouse'),
//queryTemplatesForEnv('inhouse'),

const initialState = {
  env: 'inhouse',
  serverTemplates: [],
  queryTemplates: [],
  serverTemplate: '',
  server: '',
  countyNo: '',
  queryTemplate: '',
  query: ''
};

// console.log(`initialState=${JSON.stringify(initialState)}`);

const sqlTool = (state = initialState, action) => {
  console.log('action: ' + JSON.stringify(action));
  switch (action.type) {
    case 'CHANGE_ENV':
      return {
        ...state,
        env: action.env
      };
    case 'LOAD_SERVER_TEMPLATES':
      return {
        ...state,
        serverTemplates: action.serverTemplates
      };
    case 'CHANGE_SERVER_TEMPLATE':
      return {
        ...state,
        serverTemplate: action.serverTemplate,
        server: action.serverTemplate,
        countyNo: action.countyNo
      };
    case 'CHANGE_SERVER':
      return {
        ...state,
        serverTemplate: '',
        server: action.value
      };
    case 'CHANGE_QUERY_TEMPLATE':
      return {
        ...state,
        queryTemplate: action.queryTemplate,
        query: action.queryTemplate
      };
    case 'CHANGE_QUERY':
      return {
        ...state,
        queryTemplate: '',
        query: action.value
      };
    default:
      return state;
  }
};

export default sqlTool;
