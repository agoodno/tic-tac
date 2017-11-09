const initialState = {
  env: 'inhouse',
  server_template: '',
  server: '',
  query_template: '',
  query: ''
};

const sqlTool = (state = initialState, action) => {
  console.log('action: ' + JSON.stringify(action));
  var new_state;
  switch (action.type) {
    case 'CHANGE_ENV':
      new_state = {
        ...state,
        env: action.value
      };
      break;
    case 'CHANGE_SERVER_TEMPLATE':
      new_state = {
        ...state,
        server_template: action.value,
        server: action.value
      };
      break;
    case 'CHANGE_SERVER':
      new_state = {
        ...state,
        server_template: '',
        server: action.value
      };
      break;
    case 'CHANGE_QUERY_TEMPLATE':
      new_state = {
        ...state,
        query_template: action.value,
        query: action.value
      };
      break;
    case 'CHANGE_QUERY':
      new_state = {
        ...state,
        query_template: '',
        query: action.value
      };
      break;
    default:
      new_state = state;
  }
  console.log('state after: ' + JSON.stringify(new_state));
  return new_state;
};

const { createStore } = Redux;
const store = createStore(sqlTool);

const render = () => {
  document.body.innerText = JSON.stringify(store.getState());
};
store.subscribe(render);
render();

store.dispatch({
  type: 'CHANGE_ENV',
  value: 'prod'
});

store.dispatch({
  type: 'CHANGE_SERVER_TEMPLATE',
  value: 'postgresql://viewer:viewer@step-db:5412/step'
});

store.dispatch({
  type: 'CHANGE_QUERY_TEMPLATE',
  value: 'SELECT * FROM "Message";'
});

store.dispatch({
  type: 'CHANGE_ENV',
  value: 'inhouse'
});

store.dispatch({
  type: 'CHANGE_SERVER_TEMPLATE',
  value: 'postgresql://viewer:viewer@dev6-db:5612/cc'
});

store.dispatch({
  type: 'CHANGE_QUERY_TEMPLATE',
  value: 'SELECT * FROM "ControlRecord";'
});
