(function(global) {

  const LIST_URL = global.LIST_URL || '/';
  const fetch = global.fetch;

  class ListModel {
    constructor() { }
    // async create(content) {
    //   const response = await fetch(LIST_URL, {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       content,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   const json = await response.json();
    //   return json;
    // }

    async getTodos() {
      const response = await fetch(LIST_URL);
      const json = await response.json();
      return json;
    }

    // async done(id, done) {
    //   const response = await fetch(LIST_URL + `/${id}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify({
    //       done: done,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   const json = await response.json();
    //   return json;
    // }

    // async updateContent(id, content) {
    //   const response = await fetch(LIST_URL + `/${id}`, {
    //     method: 'PATCH',
    //     body: JSON.stringify({
    //       content: content,
    //     }),
    //     headers: {
    //       "Content-Type": "application/json"
    //     }
    //   });
    //   const json = await response.json();
    //   return json;
    // }

    // async remove(id) {
    //   const response = await fetch(LIST_URL + `/${id}`, {
    //     method: 'DELETE',
    //   });
    //   const ok = response.ok;
    //   return ok;
    // }
  };

  global.todo.model = new ListModel();
}(typeof window === 'undefined' ? global : window));
