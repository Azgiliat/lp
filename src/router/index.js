import Vue from 'vue'
import Router from 'vue-router'

import Main from "@/pages/Content.vue";
import Error from "@/pages/Error404.vue";
import Chat from "@/components/Chat.vue";
import OnlyChat from "@/components/OnlyChat.vue";

Vue.use(Router);

const routes = [
  {
    path: '/chat',
    component: OnlyChat,
    children: [
      {
        path: ':id',
        component: Chat
      },
      {
        path: '',
        component: Chat
      }
    ]
  },
  {
    path: '/',
    component: Main,
    children: [
      {
        path: ':id',
        component: Chat
      },
      {
        path: '',
        component: Chat
      }
    ]
  },
  {
    path: '*',
    component: Error
  }
];

export default new Router({
    //mode: 'history',
    routes
})
