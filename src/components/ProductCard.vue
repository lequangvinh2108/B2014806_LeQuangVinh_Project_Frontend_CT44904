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
<strong>Price:</strong>
{{ contact.price }}
</div>
<div class="p-1">
<strong>Tác giả:</strong>
{{ contact.writer }}
</div>
<div class="p-1">
<strong>Description:</strong>
{{ contact.description }}
</div>
<div class="p-1">
<strong>ImagUrl:</strong>
{{ contact.imgUrl }}
</div>
<div class="p-1">
<strong>Liên hệ yêu thích:&nbsp;</strong>
<i v-if="contact.favorite" class="fas fa-check"></i>
<i v-else class="fas fa-times"></i>
</div>
</div>
</template>
