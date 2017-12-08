function utils() {
  this.fetchData = function(url, onSuccess) {
    console.log("fetching");
/*
    fetch(url)
      .then(function(response) {
        console.log("json");
        console.log(response.json());
        return response.json();
      })
      .then(onSuccess)
      .catch(function(ex) {
        console.error('parsing failed', ex);
      });
*/
  };
}

module.exports = utils;
