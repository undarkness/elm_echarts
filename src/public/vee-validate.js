import VeeValidate, {
  localize, extend 
} from 'vee-validate'
import zh from 'vee-validate/dist/locale/zh_CN'

// 自定义validate
/* const dict = {
  zh_CN: {
    messages: {
      email: () => '请输入正确的邮箱格式',
      required: (field) => '请输入' + field
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      task_name: '任务名称',
      phone: '手机',
      task_type: '任务类型',
      task_template: '任务模板',
      task_tine_type: '时间类型',
      task_tine_value: '时间类型值',
      assisting_department: '协助单位',
      responsible_department: '责任单位',
      target_area: '目标新增面积',
      target_cahnge_number: '目标改造数量',
      implementation_plan: '实施方案',
      assessment_standard: '考核指标',
      grading_standard: '评分标准',
      score: '考核分值',
      
    }
  }
}

Validator.updateDictionary(dict) */

const dict = {
  　　after: (field, [target]) => ` ${field}必须在${target}之后`,
  　　alpha_dash: (field) => ` ${field}能够包含字母数字字符，包括破折号、下划线`,
  　　alpha_num: (field) => `${field} 只能包含字母数字字符.`,
  　　alpha_spaces: (field) => ` ${field} 只能包含字母字符，包括空格.`,
  　　alpha: (field) => ` ${field} 只能包含字母字符.`,
  　　before: (field, [target]) => ` ${field} 必须在${target} 之前.`,
  　　between: (field, [min, max]) => ` ${field} 必须在${min}~${max}之间.`,
  　　confirmed: (field, [confirmedField]) => ` ${field} 不能和${confirmedField}匹配.`,
  　　date_between: (field, [min, max]) => ` ${field}必须在${min}和${max}之间.`,
  　　date_format: (field, [format]) => ` ${field}必须在在${format}格式中.`,
  　　decimal: (field, [decimals] = ['*']) => ` ${field} 必须是数字的而且最多包含${decimals === '*' ? '' : decimals}位小数.`,
  　　digits: (field, [length]) => ` ${field} 必须是${length}位数字`,
  　　dimensions: (field, [width, height]) => ` ${field}必须是 ${width} 像素到 ${height} 像素.`,
  　　email: (field) => ` ${field} 必须是有效的邮箱.`,
  　　ext: (field) => ` ${field} 必须是有效的文件.`,
  　　image: (field) => ` ${field} 必须是图片.`,
  　　in: (field) => ` ${field} 必须是一个有效值.`,
  　　ip: (field) => ` ${field} 必须是一个有效的地址.`,
  　　max: (field, [length]) => ` ${field} 不能大于${length}个字.`,
  　　mimes: (field) => ` ${field} 必须是有效的文件类型.`,
  　　min: (field, [length]) => ` ${field} 不能少于${length}个字.`,
  　　not_in: (field) => ` ${field}必须是一个有效值.`,
  　　numeric: (field) => ` ${field}只能包含数字.`,
  　　regex: (field) => ` ${field} 格式无效.`,
  　　required: (field) => `${field}不能为空.`,
  　　size: (field, [size]) => ` ${field} 必须小于 ${size} KB.`,
  　　url: (field) => ` ${field}不是有效的url.`,
  　　phone: (field) => ` ${field} 格式不正确.`,
  　　msgCode: (field) => ` ${field} 格式不正确.`,
  　　nickname: (field) => ` ${field} 只能包含字母、数字或中文.`,
  　　minChar: (field, [length]) => ` ${field}不能小于${length}个字符.`,
  　　maxChar: (field, [length]) => ` ${field}不能大于${length}个字符.`
  }

//手机号码
extend('phone', {
  messages: {
    zh_CN: field => field + '必须是11位手机号码'
  },
  validate: value => {
    return value.length === 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)
  }
})
//6位手机短信验证码
extend('msgCode', {
  　　getMessage: field => field + ' 格式不正确',
  　　validate: value => !!/^[a-zA-Z0-9]{6}$/.test(value)
  });
  //昵称
  extend('nickname', {
  　　getMessage: field => field + ' 只能包含字母、数字或中文',
  　　validate: value => !!/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(value)
  });
  //最小字符
  extend('minChar', {
  　　getMessage:(field,params) => {
  　　return field+ '不能小于'+params[0]+'个字符.'
  },
  validate: (value,params) => {
  　　return !(value.replace(/[^\x00-\xff]/g, 'xx').length<parseInt(params[0]))
  }
  })
  // 最大字符
  extend('maxChar', {
  　　getMessage:(field,params) => {
  　　return field+ '不能大于'+params[0]+'个字符.'
  },
  validate: (value,params) => {
  　　return !(value.replace(/[^\x00-\xff]/g, 'xx').length>parseInt(params[0]))
  　　}
  })


// 配置
export const config = {
  errorBagName: 'errors', // change if property conflicts.
  fieldsBagName: 'fieldBags', // 报冲突时 可自定义修改字段名称
  delay: 0, // 错误提示的延迟时间
  strict: true, // 没有设置规则的表单不进行校验，
  enableAutoClasses: false,
  locale: 'zh_CN', // 对语言（中文）的配置
  dictionary: {// 自定义提示
    zh_CN: {
      messages: dict
    }
  },
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  },
  events: 'blur', //* *input|blur** 在用户输入和表单失去焦点时都进行校验 可单独写  blur或input
  inject: true
}
export default validate