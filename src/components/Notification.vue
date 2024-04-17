<template>
    <div v-if="message" class="alert success">
      {{ message }}
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        message: ''
      };
    },
    methods: {
      showMessage(message) {
        this.message = message;
        setTimeout(() => {
          this.message = '';
        }, 3000); // 3 seconds
      }
    }
  };
  </script>
  
  <style scoped>
  .alert {
    padding: 10px;
    margin-bottom: 10px;
  }
  
  .success {
    background-color: #d4edda;
    border-color: #c3e6cb;
    color: #155724;
  }
  </style>
  