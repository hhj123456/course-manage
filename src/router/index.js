import Vue from 'vue'
import Router from 'vue-router'
import routes from './router.js'

Vue.use(Router)

const router = new Router({
	routes,
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
		    return savedPosition
		} else {
		    return { x: 0, y: 0 }
		}
	}
})
/*全局前置守卫*/
router.beforeEach( (to, from, next) => {
  /*动态设置html中的title*/
  if(to.meta.title) {
      document.title = to.meta.title;
  }
  next()
})
export default router
