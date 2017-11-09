const GET_OPTIONS = {
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

export const POST_OPTIONS = {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'ContentType': 'application/json'
  }
};

export const fetchData = (url, options, handler) => {
  fetch(url, options)
    .then(function(response) {
      return response.json();
    })
    .then(handler)
    .catch(function(ex) {
      console.error(`Something went wrong: ${ex}`);
    });
};

export const fetchServerTemplatesForEnv = (env, storesServerTemplates) => {
  fetchData(`http://localhost:3001/server_templates?env=${env}`, GET_OPTIONS, storesServerTemplates);
};

export const fetchQueryTemplatesForEnv = (env, storesQueryTemplates) => {
  fetchData(`http://localhost:3001/query_templates?env=${env}`, GET_OPTIONS, storesQueryTemplates);
};
