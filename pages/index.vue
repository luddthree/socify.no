<template>
  <br><br>
<div class="flex">
<div class="m-2 mx-auto">
  <div class="">
      <br>
      <div>
        <div class="flex justify-center text-center">
          <h1 class="text-center text-2xl font-bold">Search users</h1>

        </div><br>
        <form @submit.prevent="searchuser">
        <div class="flex justify-center">
          <div>
              <div class="form-group">
            <input
            class="form-control rounded py-3 px-16"
                type="text"
                v-model="inputUsername"
                placeholder="Username"
            /></div>
          </div>
        </div>
        
        <div class="flex justify-center">
              <button type="submit" class="py-3 bg-gray-300 hover:bg-gray-400 px-14">search</button>

        </div>
          <br><br>
      </form>
        </div>
      </div>
      <br>
  </div>
</div>


</template>

<script>
export default {
  data() {
    return {
      inputUsername: '',
      loginError: false,
    };
  },
  methods: {
    async searchuser() {
      const response = await $fetch('/api/user/search', {
          method: 'post',
          body: {
              name: this.inputUsername,
          }
      })

      if (response) {
          localStorage.setItem('viewuserId', response.id);
          await navigateTo('/viewuser')
      } else {
          alert("username not found")
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
