<template>
    
  <h2 class="text-center">Liên Hệ</h2>

  
    <div class="row ">
    <div class="col-sm-9">
        <h3>Liên hệ với chúng tôi!</h3>
        <p class="text-dark text-justify">Chúng tôi mong muốn lắng nghe từ bạn. Hãy liên hệ với chúng tôi và một thành viên của chúng tôi sẽ liên lạc với bạn trong thời gian sớm nhất. Chúng tôi yêu thích việc nhận được email của bạn mỗi ngày <em>mỗi ngày</em>.</p>
        <form @submit.prevent="submitForm">
          <div class="form-group d-flex justify-content-between ">
                  <label for="fullname"><b>Họ và tên</b></label>
                <input class="col-sm-9" rows="4" placeholder="Nhập họ và tên" v-model="contactData.fullname" type="text" id="fullname">
                </div>
          <div class="form-group d-flex justify-content-between ">
                  <label for="email"><b>Email</b></label>
                <input class="col-sm-9" rows="4" placeholder="Nhập email của bạn" v-model="contactData.email" type="text" id="email">
          </div>
          <div class="form-group d-flex justify-content-between">
                  <label for="content"><b>Nội dung</b></label>
                  <textarea class="col-sm-9" rows="4" placeholder="Nội dung bạn muốn nhập" v-model="contactData.content" id="content"></textarea>

          </div>
          <div class="form-group d-flex justify-content-between ">
                <button type="submit" class="btn btn-primary">Gửi</button>
          </div>
        </form>
    </div>

    <div class="col-3">
        <h5 class="text-muted">Bản đồ</h5>
        <p>
            <a href="#">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15729855.42909206!2d96.7382165931671!3d15.735434000981483!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31157a4d736a1e5f%3A0xb03bb0c9e2fe62be!2zVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1445179448264"
                    width="250" height="250" frameborder="0" style="border:0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
            </a>
            <a href="https://www.google.com/maps/@9.682084,105.568023,3359m/data=!3m1!1e3?hl=vi-VN">Xem bản đồ</a>
            <br><b> Địa chỉ:</b> Đ.3/2, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần Thơ
        </p>
       
        <p>Email: vfood@gmail.com</p>
        <p>Số điện thoại: 0886986970</p>
    </div>
</div>

</template>

<script>
import ContactService from "../services/contact.service";

export default {
props: {
  contact: Object,
},
data() {
  return {
    contactData: {
      fullname: this.contact ? this.contact.fullname: '',
      email: this.contact ? this.contact.email: '',
      content: this.contact ? this.contact.content: '',
    },
    message: '',
  };
},
methods: {
  async submitForm() {
        try {
              await ContactService.createContact(this.contactData);
              alert ('Thông tin của bạn đã được ghi nhận .')
              this.contactData.fullname = '';
              this.contactData.email = '';
              this.contactData.content = '';
        } catch (error) {
            console.error(error);
            alert ('Đã xảy ra lỗi.')
        }
    },
}
}
</script>

<style scoped>
/* Your styling for the contact page goes here */

.text-center {
text-align: center;
}

.contact-info {
max-width: 600px;
margin: 0 auto;
padding: 20px;
border: 1px solid #ccc;
border-radius: 5px;
margin-top: 20px;
}
</style>
