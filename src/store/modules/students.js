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
          .get(`/students?${queryParams}`)
          .then((response) => resolve(response))
          .catch(error => reject(error))
      })
    },
    show (context, { id }) {
      return new Promise((resolve, reject) => {
        http
          .get(`/students/${id}`)
          .then(({ data }) => resolve(data))
          .catch(error => reject(error))
      })
    },
    store (context, payload) {
      return new Promise((resolve, reject) => {
        http
          .post('/students', payload)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    },
    update (context, { id, payload }) {
      return new Promise((resolve, reject) => {
        http
          .put(`/students/${id}`, payload)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    },
    delete (context, { id }) {
      return new Promise((resolve, reject) => {
        http
          .delete(`/students/${id}`)
          .then((data) => resolve(data))
          .catch(error => reject(error))
      })
    }
  },
  getters: {

  }
}