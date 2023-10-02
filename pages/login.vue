<!-- <template>
    <div class="login-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username:</label>
          <input
            type="text"
            id="username"
            v-model="inputUsername"
            class="form-control"
            placeholder="Enter your username"
          />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="inputPassword"
            class="form-control"
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" class="btn btn-primary bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Login</button>
      </form>
      <p v-if="loginError" class="error-message">Invalid username or password.</p>
    </div>
  </template> -->
  <template>
    <br><br>
<div class="flex">
  <div class="m-2 mx-auto">
    <div class="bg-gray-200 rounded-2xl px-8 py-2">
        <br>
        <div>
          <div class="flex justify-center text-center">
            <h1 class="text-center text-2xl font-bold">log in</h1>

          </div><br>
          <form @submit.prevent="handleLogin">
          <div class="flex justify-center">
            <div>
                <div class="form-group">
              <input
              class="form-control rounded py-2 px-3"
                  type="text"
                  v-model="inputUsername"
                  placeholder="Username"
              /><br><br></div>
              <div class="form-group">
              <input
              class="form-control rounded py-2 px-3"
                  type="password"
                  v-model="inputPassword"
                  placeholder="Password"
              /><br><br></div>
            </div>
          </div>
          <br>
          <div class="flex justify-center">
                <button type="submit" class="btn btn-primary bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Login</button>

          </div>
            <br><br>
        </form>
          </div>
        </div>
        <br>
        <div class="text-gray-600 text-sm flex justify-center">
          <p>Already a member? <b><a href="/login" class="text-gray-700 hover:text-gray-900 text-sm"> log in here!</a></b></p>            </div>
      <br><br>
    </div>
  </div>


</template>
  
  <script>
  export default {
    data() {
      return {
        inputUsername: '',
        inputPassword: '',
        loginError: false,
      };
    },
    methods: {
      async handleLogin() {
        const response = await $fetch('/api/user/login', {
            method: 'post',
            body: {
                name: this.inputUsername,
                password: this.inputPassword
            }
        })

        if (response) {
            await navigateTo('/')
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('userId', 1);
        } else {
            alert("Invalid Login")
        }
        
      },
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    font-weight: bold;
  }
  
  .input-error {
    border: 1px solid red;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  