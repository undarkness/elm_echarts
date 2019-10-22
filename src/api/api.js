import service from './config'


// class Login {
//   login(params) {
//     return service.post('login', params)
//   }
// }
// const login = new Login();

// export default {
//   login (params) {
//     return service.post('/login', params)
//   };
// }
export function login(params) {
  return service.post('/login', params)
};
