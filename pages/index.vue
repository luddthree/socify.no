<template>
  <br>




  <!-- <p class="text-center">**This website is under development**</p> --><br>
  <!-- <h1 class="text-3xl font-bold">Linkbase</h1> -->

  <div>
    <!-- pc -->
    <div class="hidden sm:flex h-screen">

      <div class="flex-auto w-2/5">

      </div>
      <div class="flex-auto w-4/5 mt-10">
        <img src="/example_phone.png" alt="example" class="" style="height: 88%;">
      </div>
      <div class="flex-auto w-2/5 font-bold mt-10">
        <h1 style="font-size: 7.5rem; line-height: 0.93; letter-spacing: -4px;">
          All of your socials, in just one link.
        </h1>
      </div>
      <div class="flex-auto w-2/6">

      </div>

      
    </div>



    <!-- phone -->
    <div class="flex sm:hidden">
      <div class="flex-none w-6">

      </div>

      <div class="flex-auto w-2/5 font-bold">
        <br><br>
        <h1 style="font-size: 3rem; line-height: 0.93; letter-spacing: -2px;">
          All of your socials, in just one link.
        </h1>
      </div>

    
    <div class="flex-auto w-2/5 mt-10 justify-center items-center">
    
        <img src="/example_phone.png" alt="example" class="" style="height: 100%;">
      </div>      
      <div class="flex-none w-6">
    </div>
    
</div>

<div class="mt-8 sm:mt-0 sm:mb-4">
    <h1 class="text-center text-[#001d3d] sm:text-2xl text-lg" style="letter-spacing: -1px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  Duis aute irure dolor .</h1>
    </div>
<br><br>



  </div>

  <div class="bg-[#2f2fa2] text-white flex flex-col items-center sm:h-screen">
    <br><br><br><br><br><br><br><br><br>
<h1 class="text-4xl  font-bold sm:mt-48" style="letter-spacing: -1px;">Create your page now!</h1>
<br>
<NuxtLink to="/signup" class="border hover:animate-none animate-pulse border-[#F64C72] hover:bg-[#F64C72] hover:text-[#2f2fa2] p-3 text-xl text-[#F64C72] font-bold" style="letter-spacing: -1.1px;">Get started here!</NuxtLink>
<br>
<h1 class="text-center text-lg sm:text-2xl sm:mb-36 sm:mt-4" style="letter-spacing: -1px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  Duis aute irure dolor .</h1>
<br><br><br><br><br><br><br><br><br><br><br><br>
    </div>


    

<div class="bg-[#ddd92a] sm:h-screen">
    <br><br><br><br>
    <div class="sm:mt-56">
    <h1 class="text-center text-[#001d3d] sm:text-2xl text-lg" style="letter-spacing: -1px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua  Duis aute irure dolor .</h1>
    </div>
    
    <br><br><br>
    <div class="flex justify-center text-center">
      <h1 class="text-center text-2xl sm:text-4xl font-bold text-[#ffffb7]">Search users</h1>

    </div><br>
    <form @submit.prevent="search">
      <div class="flex justify-center">
        <div>
          <div class="form-group">
            <input class="form-control rounded py-3 px-16" type="text" v-model="inputUsername" placeholder="Username" />
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <button type="submit" class="py-3 bg-[#001d3d] text-white font-bold hover:bg-black px-14 sm:mb-44" style="letter-spacing: -1px;">Search</button>

      </div>
      <br><br>
    </form>
    
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
      });

      if (response) {
        // Navigate to the username searched
        await navigateTo('/' + response.name);
        return true; // Indicate success
      } else {
        return false; // Indicate failure
      }
    },
    async searchpage() {
      const response = await $fetch('/api/user/search_pages', {
        method: 'post',
        body: {
          name: this.inputUsername,
        }
      });

      if (response) {
        // Navigate to the username searched
        await navigateTo('/p/' + this.inputUsername);

        return true; // Indicate success
      } else {
        await navigateTo('/p/' + this.inputUsername)
        return false; // Indicate failure

      }
    },

    async search() {
      // Call searchuser and check its result
      const searchUserSuccess = await this.searchuser();

      // Only call searchpage if searchuser failed (returned false)
      if (!searchUserSuccess) {
        await this.searchpage();
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

  ;
} else if (isLoggedInValue === false) {
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
