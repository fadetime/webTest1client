import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import House from '@/components/House'
import Edithouse from '@/components/Edithouse'
import Room from '@/components/Room'
import Landlord from '@/components/Landlord'
import Editlandlord from '@/components/Editlandlord'
import Clerk from '@/components/Clerk'
import Editclerk from '@/components/Editclerk'
import Tenant from '@/components/Tenant'
import Edittenant from '@/components/Edittenant'
import Dashboard from '@/components/Dashboard'
import Viewhouse from '@/components/Viewhouse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path:'/dashboard',
      name:'Dashboard',
      component:Dashboard
    },
    {
      path: '/houses',
      name: 'House',
      component: House
    },
    {
      path:'/viewhouse/:houseId',
      name:'Viewhouse',
      component:Viewhouse
    },
    {
      path:'/edithouse/:houseId',
      name:'Edithouse',
      component:Edithouse
    },
    {
      path:'/rooms/:roomId',
      name:'Room',
      component:Room
    },
    {
      path: '/landlords',
      name: 'Landlord',
      component: Landlord
    },
    {
      path:'/editlandlord/:landlordId',
      name:'Editlandlord',
      component:Editlandlord
    },
    {
      path: '/clerks',
      name: 'Clerk',
      component: Clerk
    },
    {
      path:'/editclerk/:clerkId',
      name:'Editclerk',
      component:Editclerk
    },
    {
      path: '/tenants',
      name: 'Tenant',
      component: Tenant
    },
    {
      path:'/edittenant/:tenantId',
      name:'Edittenant',
      component:Edittenant
    }
  ]
})
