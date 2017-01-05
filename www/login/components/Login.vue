<template>
    <el-card class="login-form" id="login-form">
        <h1 class="login-form__title">点点快富系统</h1>
        <el-form ref="form" :model="login" label-width="80px">
            <el-form-item label="登录名">
                <el-input v-model="login.name" autofocus="true" @keyup.13="watchEnter"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="login.password" @keyup.13="watchEnter"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-checkbox-group v-model="login.remember">
                    <el-checkbox label="记住密码" name="remember"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登 录</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>
<script>
    import Vue from 'vue';
    import VueResource from 'vue-resource';
    import { ApiUrl } from "../../common/config.js";
    import md5 from 'md5';
    import { Message } from 'element-ui';
    Vue.use(VueResource);
    Vue.http.options.emulateJSON = true;
    export default {
        data() {
            var data = {};
            var login = {};
            if (localStorage.password) {
                login.name = localStorage.name;
                login.password = localStorage.password;
                login.remember = true;
            } else {
                login.name = localStorage.name;
                login.password = '';
                login.remember = false;
            }
            data.login = login;
            return data;
        },
        methods: {
            onSubmit() {
                if (!this.login.name) {
                    Message({
                        message: '请输入登录名！',
                        type: 'warning'
                    });
                    return;
                }
                if (!this.login.password) {
                    Message({
                        message: '请输入密码！',
                        type: 'warning'
                    });
                    return;
                }
                // 是否记住密码
                if (this.login.remember == true) {
                    localStorage.name = this.login.name;
                    localStorage.password = this.login.password;
                } else {
                    localStorage.name = this.login.name;
                    localStorage.password = '';
                }
                this.$http.post(ApiUrl + 'login/login', { userid: this.login.name, pwd: md5(this.login.password) }, {
                    credentials: false
                }).then(
                    (response) => {
                        if (response.body.code == 0) {
                            localStorage.userInfo = JSON.stringify(response.body.data);
                            // 是否已登录标识
                            sessionStorage.setItem('isLogin', true);
                            window.location.href = 'baseManagement.html';
                        } else {
                            Message.error(response.body.message);
                        }
                    },
                    (response) => {
                        Message.error('请求错误！');
                    }
                    );
            }
        }
    }
</script>
<style>
    body {
        background-color: #51DAF4;
    }
    .el-card__body {
        padding: 0;
    }
    .el-form {
        padding-right: 25px;
    }
    .login-form {
        display: block;
        width: 400px;
        margin: 80px auto;
        box-shadow: 2px 2px 50px 10px rgba(0,0,0,.2);
    }
    .login-form__title {
        display: block;
        width: 100%;
        text-align: center;
        margin-top: 0;
        margin-bottom: 20px;
        border-bottom: 1px solid #27B9EB;
        color: #12B7F5;
        font-size: 22px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .el-button {
        width: 90%;
        background-color: #12B7F5;
        font-size: 20px;
    }
</style>