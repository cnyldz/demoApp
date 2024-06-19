## Steps took to complete this demo application for WorldTech AI's case study

#### Date: 13/06/24

updated on: 19/06/24

### 1. Project Setup

- Installed Expo-cli and created a new Expo project to be able to use React Native easily.

### 2. Navigation

- Installed React Navigation libraries.
- Set up the navigation container and stack navigator in `App.js`.

### 3. Created Authentication Context and API functions

- Created `AuthContext.js` for managing authentication.
- Used `expo-secure-store` for JWT tokens.
- Installed Axios for making HTTP requests.
- Created API functions for login, registration, and CRUD operations in `api.js`.

### 4. Created Screens

- Created `Login.js` and `Register.js` screens with basic form fields and navigation.
- Added state management for handling form inputs and authentication actions.
- Mock username and password for testing is;
  username: emilys
  password: emilyspass

### 5. Set Up Mock API with Mockoon then switched to DummyJSON

- Used Mockoon to create a fake API for handling authentication and CRUD operations.
- Had issues making Mockoon publicly available due to an unknown app error. Switched to DummyJSON.
- Configured endpoints for login, registration, and CRUD.

### 8. Created Home Screen

- Created `Home.js` to display posts fetched from the DummyJSON API.
- Implemented create, update, and delete functionalities for posts.

### 9. Styled the App Using React Native Paper

- Installed React Native Paper for styling components.
- Updated `Login.js`, `Register.js`, and `Home.js` to use React Native Paper components.
- Customized the theme's color to use WorldTech AI's blue color and added consistent styling across the app.

### 10. Tested the App

- Tested the app on an iOS simulator running iPhone 15 Pro.
- Ensured all functionalities work as expected.

### 11. Uploaded to GitHub

- Initialized a git repository and committed the project.
- Created a new repository on GitHub and pushed the local repository to GitHub.

# Requested Case Study

iOS ve Android mobil uygulama geliştirme becerilerinizi değerlendirmek amacıyla küçük bir test projesi hazırladık. Bu proje, REST API kullanarak temel CRUD işlemleri gerçekleştiren ve JWT kimlik doğrulaması ile güvenliği sağlanan bir mobil uygulama geliştirmenizi içermektedir. Projeyi tamamlamanız, teknik yeteneklerinizi ve problemlere yaklaşım şeklinizi görmemiz açısından önemli olacak.

Proje Detayları:

1. JWT ile Kimlik Doğrulama:

   - jwt.io üzerinden alacağınız bir JWT token ile sisteme giriş yapılmalıdır.

2. CRUD İşlemleri:

   - jsonplaceholder üzerinden sağlanan bir API endpoint'e istek atarak CRUD işlemleri gerçekleştirilmelidir. Bu işlemler; veri oluşturma, okuma, güncelleme ve silme işlemlerini içermelidir.

3. API İletişimi:
   - Uygulama, JSONPlaceholder gibi bir mock API kullanarak test verileri üzerinde çalışmalıdır.

Eklemek İsteyebileceğiniz Özellikler:

- Kullanıcı Arayüzü Tasarımı:

  - Kullanıcı deneyimini artırmak için etkileşimli bir kullanıcı arayüzü tasarlayabilirsiniz. CRUD işlemlerinin kolayca yapılabileceği, kullanıcı dostu bir arayüz oluşturun.

- Hata Yönetimi:
  - API istekleri sırasında oluşabilecek hataları yakalamak ve kullanıcıya anlaşılır hata mesajları göstermek için robust bir hata yönetim sistemi geliştirin.

Projeyi nasıl daha iyi hale getirebileceğinizi düşünerek, yaratıcılığınızı serbest bırakın ve uygulamaya kendi özgün dokunuşlarınızı ekleyin. Projeyi tamamladıktan sonra, kodunuzu bir GitHub reposuna yükleyin ve repo linkini bize gönderin. Projeyi değerlendirmek ve sonraki adımları tartışmak için sizinle iletişime geçeceğiz.

Başarılar dileriz!
