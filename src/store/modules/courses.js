import http from '../../http';
import { serialize } from '../../utils';

export default {
  namespaced: true,
  state: {
  },
  mutations: {
    
  },
  actions: {
    all (context, payload) {
      let queryParams = serialize(payload)
      return new Promise((resolve, reject) => {
        http
          .get(`/courses?${queryParams}`)
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },    
    show (context, { id }) {
      return new Promise((resolve, reject) => {
        http
          .get(`/courses/${id}`)
          .then(({ data }) => resolve(data))
          .catch(error => reject(error))
      })
    },
    store (context, payload) {
      return new Promise((resolve, reject) => {
        http
          .post('/courses', payload)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    },
    update (context, { id, payload }) {
      return new Promise((resolve, reject) => {
        http
          .put(`/courses/${id}`, payload)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    },
    delete (context, { id }) {
      return new Promise((resolve, reject) => {
        http
          .delete(`/courses/${id}`)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    }
  },
  getters: {
    
  }
}