/*
 * @Date: 2019-10-22 18:55:01
 */
import Mock from 'mockjs'
import cjson from '../static/Cesium/Assets/approximateTerrainHeights.json'

Mock.setup({ timeout: '1000-2000' });

Mock.mock(RegExp('/v1/loginTest' + ".*"), 'post', (options) => {
  console.log(options) ;
  let data = JSON.parse(options.body);
  let name = data.name;
  let password = data.password;
  if (name === 'admin@admin.com' && password === "12345") {
    return {
      status: 1,
      message: '登录成功'
    }
  } else {
    return {
      status: 0,
      message: '账号或密码错误'
    }
  }
})

Mock.mock('/v1/getTest', 'get',  { IS_ERROR:0,data: "suc" })

Mock.mock('/cesium/', 'get',  cjson)
Mock.mock("//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer", 'get',  "//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer")