import Home from '@/components/home/home.vue';
import ExDetial from '@/components/detial-content/exdetial.vue';
import Test from '@/components/HelloWorld.vue';
import ExContent from '@/components/detial-content/excontent';

const routes = [
	{
		path : '/login',
		name : 'login',
		component : resolve => require(['@/components/login/login.vue'],resolve),
		meta:{
			title:"登录"
		}
	},
	{
        path: '*',
        hidden: true,
        redirect: { path: '/login' }
    },
    {
    	path : '/',
    	name : '首页',
    	component : resolve =>require(['@/components/mian.vue'],resolve),
    	redirect: '/home',
    	meta:{
    		title:"实验过程管理"
    	},
    	children:[
    		{path: 'home', component: Home, name: '',meta:{title:"首页"}},
    		{path: 'detial/:num', component: ExDetial, name: '实验课程' ,meta:{title:"实验课程"}},
            {path: 'course/:num/:id', component: ExContent, name: '开始试验' ,meta:{title:"开始试验"}}
    	]
    }
]

export default routes;