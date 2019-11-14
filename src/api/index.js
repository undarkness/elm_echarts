/*
 * @Date: 2019-10-22 18:48:14
 */
import service from './config'


const login = function login(data) {
  return service.post('/loginTest', data);
}

const getTest = function getTest(params) {
  return service.get('/getTest', params);
}

export {
  login,
  getTest
}
