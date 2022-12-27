import VueRouter from 'vue-router'
import OperationConfig from '../views/operation-config/index.vue' 
import PlanConfig from '../views/plan-config/index.vue' 
import CreativeWorkshop from '../views/creative-workshop/index.vue' 
import category0 from '../views/creative-workshop/pages/0'
import category1 from '../views/creative-workshop/pages/1'
import category2 from '../views/creative-workshop/pages/2'
import category3 from '../views/creative-workshop/pages/3'
import category4 from '../views/creative-workshop/pages/4'
import category5 from '../views/creative-workshop/pages/5'
import category6 from '../views/creative-workshop/pages/6'

export default new VueRouter({
    mode:'history',
    base:'/keyfrommeta',
    linkActiveClass: 'active',
    routes:[
        {
            path:'/',
            component:OperationConfig,
            meta:{
                title:'操作配置',
            }
        },
        {
            path:'/plan',
            component:PlanConfig,
            meta:{
                title:'方案配置'
            }
        },
        {
            path:'/creative',
            component:CreativeWorkshop,
            meta:{
                title:'创意社区',
            },
            children:[
            {
                path:'/',
                component:category0
        
            },
            {
                path:'1',
                component:category1
        
            },
            {
                path:'2',
                component:category2
            },
            {
                path:'3',
                component:category3
            },
            {
                path:'4',
                component:category4
            },
            {
                path:'5',
                component:category5
            },
            {
                path:'6',
                component:category6
            },
            ]
        }


        
    ]
})