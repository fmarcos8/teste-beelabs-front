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
          .get(`/registrations?${queryParams}`)
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },
    show (context, { id }) {
      return new Promise((resolve, reject) => {
        http
          .get(`/registrations/${id}`)
          .then(({ data }) => resolve(data))
          .catch(error => reject(error))
      })
    },
    store (context, payload) {
      return new Promise((resolve, reject) => {
        http
          .post('/registrations', payload)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    },
    update (context, { id, payload }) {
      return new Promise((resolve, reject) => {
        http
          .put(`/registrations/${id}`, payload)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    },
    delete (context, { id }) {
      return new Promise((resolve, reject) => {
        http
          .delete(`/registrations/${id}`)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    }
  },
  getters: {
  }
}