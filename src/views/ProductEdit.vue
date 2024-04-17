<template>
    <div v-if="contact" class="page">
        <h4>Cập nhật sản phẩm</h4>
        <ContactForm
            :contact="contact"
            @submit:contact="updateContact"
            @delete:contact="deleteContact"
        />
        <p>{{ message }}</p>
    </div>
</template>

<script>
    import ContactForm from "@/components/ProductForm.vue";
    import ListProductService from "@/services/listproduct.service";

    export default {
        components: {
            ContactForm,
        },

        props: {
            id: { type: String, required: true },
        },

        data() {
            return {
                contact: null,
                message: "",
            };
        },

        methods: {
            // Hàm lấy thông tin sản phẩm cần chỉnh sửa
        async getContact(id) {
            try {
                this.contact = await ListProductService.getProduct(id);
            } catch (error) {
                console.error(error);
                // Chuyển hướng sang trang NotFound nếu không tìm thấy sản phẩm
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },

        // Hàm cập nhật thông tin sản phẩm
        async updateContact(data) {
            try {
                await ListProductService.updateId(this.contact._id, data);
                this.message = "Sản phẩm được cập nhật thành công.";
                
            } catch (error) {
                console.error(error);
                this.message = "Cập nhật sản phẩm không thành công.";
            }
        },

            async deleteContact() {
                if (confirm("Bạn muốn xóa sản phẩm này?")) {
                    try {
                        await ListProductService.deleteProduct(this.contact._id);
                        this.$router.push({ name: "product" });
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
        },

        created() {
            this.getContact(this.id);
            this.message = "";
            
        },
    };
</script>
