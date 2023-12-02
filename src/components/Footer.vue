<template>
    <footer class="footer bg-dark text-light p-4">
      <div class="container">
        <div class="row">
          <!-- Cột 1: Thông tin web -->
          <div class="col-md-4">
            <h5>Thông tin website</h5>
            <p>Website cung cấp các cuốn sách hay, giúp người đọc được nhiều kiến thức hưu ích cho đời sống và học tập.</p>
          </div>
  
          <!-- Cột 2: Địa chỉ -->
          <div class="col-md-4">
            <h5>Địa chỉ</h5>
            <p>Đ.3/2, P.Xuân Khánh, Q.Ninh Kiều, TP.Cần Thơ</p>
          </div>
  
          <!-- Cột 3: Liên hệ -->
          <div class="col-md-4">
            <h5><router-link to="/contact" class="navbar-brand">Liên hệ</router-link></h5>
            <div class="d-flex">
              <a href="#" class="me-2">
                <i class="fab fa-facebook"></i>
              </a>
              <a href="#" class="me-2">
                <i class="fab fa-google"></i>
              </a>
              <!-- Thêm các biểu tượng khác nếu cần -->
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    // Các phương thức và dữ liệu có thể thêm vào đây nếu cần
  };
  </script>
  
  <style scoped>
  /* Thêm các style riêng cho component này nếu cần */
  </style>
  