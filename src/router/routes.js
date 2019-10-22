import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
import Index from '../views/Index.vue'
import Home from '../views/home.vue'
import Main from '../views/main.vue'
// import Table from '../views/nav1/Table.vue'
// import Form from '../views/nav1/Form.vue'
// import user from '../views/nav1/user.vue'
// import Page4 from '../views/nav2/Page4.vue'
// import Page5 from '../views/nav2/Page5.vue'
// import Page6 from '../views/nav3/Page6.vue'
// import echarts from '../views/charts/echarts.vue'

let routes = [{
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/index',
        component: Index,
        name: '',
        hidden: true
    },
    {
        path: '/home',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message', //图标样式class
        // children: [
        //     { path: '/main', component: Main, name: '主页', hidden: true },
        //     { path: '/table', component: Table, name: 'Table' },
        //     { path: '/form', component: Form, name: 'Form' },
        //     { path: '/user', component: user, name: '列表' },
        // ],
    }, {
        path: '/main',
        component: Main
    },
    {
        path: '/',
        redirect: '/login',
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/page6', component: Page6, name: '导航三' }
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;