<template>
    <div>
      <!-- Header for mobile devices -->
      <header class="shadow-sm bg-white sm:hidden">
            <nav class="conatiner mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">linktree v2</NuxtLink>

                <button @click="toggleMenu" class="hamburger-button trans absolute right-14">{{ isMenuOpen ? '✕' : '☰' }}</button>
                    <ul class="trans" :class="{ 'active': isMenuOpen }">
                
                    <li @click="toggleMenu()" class="mb-4 mt-8"><NuxtLink to="/">Home</NuxtLink></li>
                    <li @click="toggleMenu()" class="mb-3 bg-gray-300 hover:bg-gray-400 text-black px-3 py-2 rounded-md text-white" v-if="checkIsLoggedInLocalStorage()"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
                    <li @click="toggleMenu()" class="mb-4 mr-14" v-else><NuxtLink to="/login">login</NuxtLink></li>
                    <li @click="logout()" class="absolute left-4 top-20" v-if="checkIsLoggedInLocalStorage()"><p class="text-s hover:bg-red-700 cursor-pointer rounded p-0.5 px-1">Log out</p></li>
                    <li @click="toggleMenu()" class="mb-2" v-else><NuxtLink to="/signup" class="btn">signup</NuxtLink></li>
                
                    </ul>

            </nav>
        </header>
  

      <header class="shadow-sm bg-white hidden sm:flex">
            <nav class="conatiner mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold left-4 absolute">linktree v2</NuxtLink>
                <br>
                <ol class="flex gap-4 right-6 absolute">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li v-if="checkIsLoggedInLocalStorage()"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
                    <li v-else><NuxtLink to="/login">login</NuxtLink></li>
                    <li v-if="checkIsLoggedInLocalStorage()" @click="logout()"><button class="text-s hover:text-red-700 cursor-pointer rounded">Log out</button></li>
                    <li v-else><NuxtLink to="/signup" class="btn">signup</NuxtLink></li>

                </ol>
            </nav>
        </header>



    </div>
    <div class="conatiner mx-auto p-4">
            <slot />
        </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isMenuOpen: false,
      };
    },
    methods: {
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
      logout() {
        localStorage.removeItem('userId');
        localStorage.removeItem('isLoggedIn');
        this.$router.push('/');
        this.isMenuOpen = !this.isMenuOpen;
      },
      checkIsLoggedInLocalStorage() {
        if (typeof localStorage === 'undefined') {
          console.log("localStorage is not available");
          return null;
        }
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        return isLoggedIn === "true";
      },
    },
  };
  </script>
  
  <style scoped>
  /* .router-link-exact-active {
      color: navy;
  } */
  .hamburger-button {
  cursor: pointer;
}
ul {
  list-style-type: none;
  display: none;
}
ul.active {
  display: block;
}
</style>