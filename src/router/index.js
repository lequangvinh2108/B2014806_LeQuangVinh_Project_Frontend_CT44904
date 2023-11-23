// router/index.js

import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/Product.vue";
import NotFound from "@/views/NotFound.vue";
import ProductEdit from "@/views/ProductEdit.vue";
import ProductAdd from "@/views/ProductAdd.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import AdminEdit from "@/views/AdminEdit.vue";
import Cart from "@/views/Cart.vue";
// import OrderComponent from "@/views/Order.vue";
import AdminUser from '@/views/AdminUser.vue';
import AdminOrder from '@/views/AdminOrder.vue';

const routes = [{
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart,
    },
    {
        path: '/adminuser',
        name: 'AdminUser',
        component: AdminUser,
    },
    {
        path: '/adminorder',
        name: 'AdminOrder',
        component: AdminOrder,
    },
    // {
    //     path: '/order/userId/orderId',
    //     name: 'order',
    //     component: OrderComponent,
    // },

    {
        path: "/contactbook",
        name: "contactbook",
        component: ContactBook,
    },
    {
        path: "/contacts/:id",
        name: "contact.edit",
        component: ProductEdit,
        props: true,
    },
    {
        path: "/contacts/add",
        name: "contact.add",
        component: ProductAdd,
        props: true,
    },
    {
        path: "/contacts/:id/detail",
        name: "contact.detail",
        component: ProductDetail,
        props: true,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },

    {
        path: "/adminedit",
        name: "adminedit",
        component: AdminEdit,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },

];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});

export default router;