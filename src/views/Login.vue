<!--
 * @Date: 2019-10-20 16:54:15
 -->
<template>
  <div class="login">
    <div class="l-form">
      <!-- <div class="l-tip">xxx平台</div> -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm">
        <el-form-item prop="name" label="邮箱">
          <el-input v-model="loginForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="loginForm.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm('loginForm')"
            :loading="isLogining"
            :disable="isLogining"
          >登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login, getTest } from "../api/index.js";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        name: "",
        password: ""
      },
      isLogining: false,
      rules: {
        name: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
          // {
          //   type: "password",
          //   message: "密码错误",
          //   trigger: "blur,change"
          // }
        ]
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLogining = true;
          login(this.loginForm)
            .then(res => {
              console.log(res);
              this.isLogining = false;
              if (res.data.status === 1) {
                this.$router.push("/home");
              } else {
                this.$message({
                  message: res.data.message,
                  type: "error",
                  duration: 5000
                });
              }
            })
            .catch(error => {
              console.log(error);
              this.isLogining = false;
              this.$message({
                message: error,
                type: "error",
                duration: 5000
              });
            });
        } else {
          return false;
        }
      });
    }
  },
  computed: {}
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #333;

  .l-form {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    transform: translate(-50% -50%);

    width: 25rem;
    padding: 1.5rem;
    margin: auto;
    border-radius: 0.5rem;
    background: #d7dde4;

    .l-tip {
      text-align: center;
      font-size: 2rem;
      font-weight: 700;
    }

    .el-form {
      width: 100%;
      margin: auto;
      margin-top: 20px;

      /deep/ .is-danger input {
        border-color: #ec3156;
      }

      .el-form-item {
        button {
          width: 100%;
        }
      }
    }
  }
}
</style>
