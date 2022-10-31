import VueRouter from 'vue-router'
import category0 from '../pages/0'
import category1 from '../pages/1'
import category2 from '../pages/2'
import category3 from '../pages/3'
import category4 from '../pages/4'
import category5 from '../pages/5'
import category6 from '../pages/6'
import payfee from '../pages/pay-fee'
export default new VueRouter({
    linkActiveClass: 'active',
    routes:[
        {
            path:'/',
            component:category0
    
        },
        {
            path:'/1',
            component:category1
    
        },
        {
            path:'/2',
            component:category2
        },
        {
            path:'/3',
            component:category3
        },
        {
            path:'/4',
            component:category4
        },
        {
            path:'/5',
            component:category5
        },
        {
            path:'/6',
            component:category6
        },
        {
            path:'/payfee',
            component:payfee
        }
    ]
})