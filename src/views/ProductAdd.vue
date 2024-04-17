<template>
    <div class="page">
        <!-- <h4>Thêm sản phẩm mới</h4> -->
        <ProductForm :contact="newContact" @submit:contact="createContact" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ProductForm from "@/components/ProductFormAdd.vue";
import ListProductService from "@/services/listproduct.service";

export default {
    components: {
        ProductForm,
    },
    data() {
        return {
            newContact: {
                code: "",
                name: "",
                price: "",
                quantity: "",
                mass: "",
                imgUrl: "",
                description: "",
                expiry: "",
                importday: "",
                placeproduction: "",
            },
            message: "",
        };
    },
    methods: {
        async createContact(data) {
            try {
                await ListProductService.createProduct(data);
                this.message = "Sản phẩm được tạo thành công.";
                // Hiển thị thông báo trong 3 giây trước khi chuyển hướng
                setTimeout(() => {
                    // Sau khi chờ 3 giây, chuyển hướng đến đường dẫn "warehouse" (hoặc đường dẫn mà bạn muốn)
                    this.$router.push({ name: "warehouse" });
                }, 1000);
            } catch (error) {
                console.error("Error creating product:", error.message);
                this.message = "Đã xảy ra lỗi khi tạo sản phẩm.";
            }
        },
    },
};
</script>
