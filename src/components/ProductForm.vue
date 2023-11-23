<template>
    <Form
    @submit="submitContact"
    :validation-schema="contactFormSchema"
    >
    <div class="form-group">
    <label for="name">Tên</label>
    <Field
    name="name"
    type="text"
    class="form-control"
    v-model="contactLocal.name"
    />
    <ErrorMessage name="name" class="error-feedback" />
    </div>  
    <div class="form-group">
    <label for="price">Price</label>
    <Field
    name="price"
    type="number"
    class="form-control"
    v-model="contactLocal.price"
    />
    <ErrorMessage name="price" class="error-feedback" />
    </div>
    <div class="form-group">
    <label for="writer">Writer</label>
    <Field
    name="writer"
    type="text"
    class="form-control"
    v-model="contactLocal.writer"
    />
    <ErrorMessage name="writer" class="error-feedback" />
    </div>
    <div class="form-group">
    <label for="description">Description</label>
    <Field
    name="description"
    type="text"
    class="form-control"
    v-model="contactLocal.description"
    />
    <ErrorMessage name="description" class="error-feedback" />
    </div>
    <div class="form-group">
    <label for="imgUrl">ImgUrl</label>
    <Field
    name="imgUrl"
    type="text"
    class="form-control"
    v-model="contactLocal.imgUrl"
    />
    <ErrorMessage name="imgUrl" class="error-feedback" />
    </div>
    
    <!-- <div class="form-group form-check">
    <input
    name="favorite"
    type="checkbox"
    class="form-check-input"
    v-model="contactLocal.favorite"
    />
    <label for="favorite" class="form-check-label">
    <strong>Liên hệ yêu thích</strong>
    </label>
    </div> -->
    <div class="form-group">
    <button class="btn btn-primary">Lưu</button>
    <button
    v-if="contactLocal._id"
    type="button"
    class="ml-2 btn btn-danger"
    @click="deleteContact"
    >
    Xóa
    </button>
    </div>
    </Form>
    </template>
    <script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    export default {
    components: {
    Form,
    Field,
    ErrorMessage,
    },
    emits: ["submit:contact", "delete:contact"],
    props: {
    contact: { type: Object, required: true }
    },
    data() {
    const contactFormSchema = yup.object().shape({
    name: yup
    .string()
    .required("Tên phải có giá trị.")
    .min(2, "Tên phải ít nhất 2 ký tự.")
    .max(50, "Tên có nhiều nhất 50 ký tự."),
    email: yup
    .string()
    .email("E-mail không đúng.")
    .max(50, "E-mail tối đa 50 ký tự."),
    address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
    phone: yup
    .string()
    .matches(
    /((09|03|07|08|05)+([0-9]{8})\b)/g,
    "Số điện thoại không hợp lệ."
    ),
    });
    return {
    // Chúng ta sẽ không muốn hiệu chỉnh props, nên tạo biến cục bộ
    // contactLocal để liên kết với các input trên form
    contactLocal: this.contact,
    contactFormSchema,
};
},
methods: {
submitContact() {
this.$emit("submit:contact", this.contactLocal);
},
deleteContact() {
this.$emit("delete:contact", this.contactLocal.id);
},
},
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>