import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home/home'
import article from '@/components/article/article'
import me from '@/components/me/me'
import article_group from '@/components/article_group/article_group'
import article_detail from '@/components/article_detail/article_detail'
import article_new from '@/components/article_new/article_new'
import like from '@/components/like/like'
import imformation from '@/components/imformation/imformation'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        {
          path: ':id',
          component: article_new,
        }
      ]
    },
    {
      path: '/article',
      name: 'article',
      component: article,
      children: [
        {
          path: ':id',
          component: article_group,
          children: [
            {
              path: ':id',
              component: article_detail
            }
          ]
        }
      ]
    },
    {
      path: '/me',
      name: 'me',
      component: me,
      children: [
        {
          path: 'like',
          component: like,
          children: [
            {
              path: ':id',
              component: article_detail
            }
          ]
        },
        {
          path: 'imformation',
          component: imformation
        }
      ]
    }
  ]
})
