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
    <br><br><br><br>
<div class="flex">
  <div class="m-2 mx-auto">
    <div class="bg-gray-200 rounded-md px-16 py-3">
        <br>
        <div>
          <div class="flex justify-center text-center">
            <h1 class="text-center text-2xl font-bold">Log in</h1>

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
                <button type="submit" class="btn btn-primary bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded text-xl">Login</button>

          </div>
            <br><br>
        </form>
          </div>
        </div>
        <br>
        <div class="text-gray-600 text-sm flex justify-center">
          <p>Not a member? <b><a href="/signup" class="text-gray-700 hover:text-gray-900 text-sm"> Sign up here!</a></b></p>            </div>
      <br><br>
    </div>
  </div>
  
  
  <br><br><br><br><br><br><br><br><br><br><br>
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
            localStorage.setItem('isLoggedIn', true)
            localStorage.setItem('userId', response.id);
            localStorage.setItem('username', this.inputUsername); // Store the username
            await navigateTo('/dashboard')
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
  