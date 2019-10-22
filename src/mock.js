import Mock from 'mockjs'

Mock.mock('/login', 'POST', (options) => {
  // console.log(options) 
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
