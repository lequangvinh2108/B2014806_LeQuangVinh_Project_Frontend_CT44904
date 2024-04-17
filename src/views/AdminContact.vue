<template>
    <div>
      <h2 class="text-center">Danh sách Liên hệ</h2>
      <div class="table-responsive">
        <table >
          <thead>
            <tr>
              <th scope="col">Họ và tên</th>
              <th scope="col">Email</th>
              <th scope="col">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(contact, index) in contacts" :key="index" style="background-color: aliceblue;">
              <td>{{ contact.fullname }}</td>
              <td>{{ contact.email }}</td>
              <td>{{ contact.content }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import ContactService from '../services/contact.service';
  
  export default {
    data() {
      return {
        contacts: [],
      };
    },
    async mounted() {
      await this.fetchContacts();
    },
    methods: {
      async fetchContacts() {
        try {
          this.contacts = await ContactService.getAll();
        } catch (error) {
          console.error('Error fetching contacts:', error);
          // Handle error if needed
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  .text-center {
    text-align: center;
  }
  </style>
  