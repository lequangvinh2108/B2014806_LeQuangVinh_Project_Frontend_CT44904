import { createWebHistory, createRouter } from "vue-router";
import Product from "@/views/Product.vue";
import NotFound from "@/views/NotFound.vue";
import ProductEdit from "@/views/ProductEdit.vue";
import ProductAdd from "@/views/ProductAdd.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import Register from "@/views/Register.vue";
import Login from "@/views/Login.vue";
import AdminEdit from "@/views/AdminEdit.vue";
import Cart from "@/views/Cart.vue";
import AdminUser from "@/views/AdminUser.vue";
import AdminOrder from "@/views/AdminOrder.vue";
import Order from "@/views/Order.vue";
import Contact from "@/views/Contact.vue";
import Introduce from "@/views/Introduce.vue";
import UserEdit from "@/views/UserEdit.vue";
import Transport from "@/views/Transport.vue";
import Ship from "@/views/ship.vue";
import Warehouse from "@/views/warehouse.vue";
import AdminEditForm from '@/components/AdminEditForm.vue';
import ListProduct from '@/views/listproduct.vue';
import AdminTransport from "@/views/admintransport.vue";
import FormAdd from "@/components/FormAdd.vue";
import WarehosueList from "@/views/warehouseList.vue";
import ReView from "@/views/review.vue";
import AdminContact from "@/views/AdminContact.vue";
import Discount from "@/views/discount.vue";


const routes = [{
        path: "/",
        name: "product",
        component: Product,
    },
    {
        path: '/discount',
        name: 'discount',
        component: Discount,
    },
    {
        path: '/admincontact',
        name: 'admincontact',
        component: AdminContact,
    },
    {
        path: '/review',
        name: 'review',
        component: ReView,
    },
    {
        path: '/warehouselist',
        name: 'warehouselist',
        component: WarehosueList,
    },
    {
        path: '/formadd',
        name: 'formadd',
        component: FormAdd,
    },
    {
        path: '/admintransport',
        name: 'admintransport',
        component: AdminTransport,
    },
    {
        path: '/listproduct',
        name: 'listproduct',
        component: ListProduct,
    },
    {
        path: '/admin/edit/:id',
        name: 'admin.edit',
        component: AdminEditForm,
        props: true
    },
    {
        path: '/warehouse',
        name: 'warehouse',
        component: Warehouse,
    },
    {
        path: '/ship',
        name: 'ship',
        component: Ship,
    },
    {
        path: "/transport",
        name: "transport",
        component: Transport,
    },
    {
        path: "/useredit",
        name: "useredit",
        component: UserEdit,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/introduce",
        name: "introduce",
        component: Introduce,
    },
    {
        path: "/contact",
        name: "contact",
        component: Contact,
    },
    {
        path: "/order",
        name: "order",
        component: Order,
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart,

    },
    {
        path: "/adminuser",
        name: "AdminUser",
        component: AdminUser,

    },
    {
        path: "/adminorder",
        name: "AdminOrder",
        component: AdminOrder,

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