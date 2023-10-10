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

<script lang="ts">
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
          //naviagte to the username searched
          await navigateTo('/' + response.name)
      } else {
          alert("username not found")
      }
      
    },
  },
};

</script>

<script lang="ts" setup>
// Check if the localStorage item "isLoggedIn" is true or false
function checkIsLoggedInLocalStorage() {
  if (typeof localStorage === 'undefined') {
    return null; // localStorage is not available
  }

  const isLoggedIn = localStorage.getItem('isLoggedIn');

  if (isLoggedIn === "true") {
    return true;
  } else if (isLoggedIn === "false") {
    return false;
  } else {
    return null; // The item is not set or has an invalid value
  }
}

// Usage example:
const isLoggedInValue = checkIsLoggedInLocalStorage();

if (isLoggedInValue === true) {
  console.log("The user is logged in.");


  ;} else if (isLoggedInValue === false) {
  console.log("The user is not logged in.")

} else {
  console.log("The isLoggedIn in localStorage is not set or has an invalid value.");
  
}


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
