// router/index.js

import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "@/views/Product.vue";
import NotFound from "@/views/NotFound.vue";
import ProductEdit from "@/views/ProductEdit.vue";
import ProductAdd from "@/views/ProductAdd.vue";
import Payment from "@/views/Payment.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Checkout from "@/views/Checkout.vue";
import Register from "@/views/Register.vue"; // Import Register component
import Login from "@/views/Login.vue"; // Import Login component
import AdminEdit from "@/views/AdminEdit.vue"; // Import AdminEdit component
import Cart from "@/views/Cart.vue";
import OrderComponent from "@/views/Order.vue";

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
    // router.js or where your routes are defined
    {
        path: '/order/userId/orderId',
        name: 'order',
        component: OrderComponent,
    },

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
        path: "/adminedit", // Define the route for AdminEdit
        name: "adminedit",
        component: AdminEdit,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: NotFound,
    },
    {
        path: "/payment",
        name: "payment",
        component: Payment,
    },
    {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});

export default router;