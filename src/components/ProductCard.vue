<script>
export default {
props: {
contact: { type: Object, required: true },
},
};
</script>
<template>
<div>
<div class="p-1">
<strong>Tên:</strong>
{{ contact.name }}
</div>
<div class="p-1">
<strong>Giá:</strong>
{{ contact.price }}
</div>
<div class="p-1">
<strong>Khối lượng:</strong>
{{ contact.mass }}
</div>
<div class="p-1">
<strong>Mô tả:</strong>
{{ contact.description }}
</div>
<div class="p-1">
<strong>Hình ảnh:</strong>
{{ contact.imgUrl }}
</div>
<div class="p-1">
<strong>Liên hệ yêu thích:&nbsp;</strong>
<i v-if="contact.favorite" class="fas fa-check"></i>
<i v-else class="fas fa-times"></i>
</div>
</div>
</template>
