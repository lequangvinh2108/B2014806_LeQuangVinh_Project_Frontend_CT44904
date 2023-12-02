<template>
    <div class="page">
        <h4>Thêm sản phẩm mới</h4>
        <ContactForm :contact="newContact" @submit:contact="createContact" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/ProductForm.vue";
import ContactService from "@/services/product.service";
export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            newContact: {
                name: "",
                price: "",
                writer: "",
                description: "",
                imgUrl: "",
                favorite: false,
            },
            message: "",
        };
    },
    methods: {
        async createContact(data) {
            try {
                await ContactService.create(data);
                this.message = "Sản phẩm được tạo thành công.";
                // Hiển thị thông báo trong 3 giây trước khi chuyển hướng
                setTimeout(() => {
                    // Sau khi chờ 3 giây, chuyển hướng đến đường dẫn "product"
                    this.$router.push({ name: "product" });
                }, 2000);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>