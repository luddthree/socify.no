<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="conatiner mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">linktree v2</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li v-if="checkIsLoggedInLocalStorage()"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
                    <li v-else><NuxtLink to="/login">login</NuxtLink></li>
                    <li v-if="checkIsLoggedInLocalStorage()" @click="logout()"><button class="bg-red-400 hover:bg-red-500 rounded p-0.5 px-1">logout</button></li>
                    <li v-else><NuxtLink to="/signup" class="btn">signup</NuxtLink></li>

                </ul>
            </nav>
        </header>
        <div class="conatiner mx-auto p-4">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
  // ... vue component stuff ...
  methods: {
    logout() {
      localStorage.removeItem('userId');
      localStorage.removeItem('isLoggedIn');
      this.$router.push('/login');
    },

    checkIsLoggedInLocalStorage() {
        if (typeof localStorage === 'undefined') {
            console.log("localStorage is not available")
            return null; // localStorage is not available
        }
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (isLoggedIn === "true") {
            console.log("Is logged in")
            return true;
        } else{
            console.log("Is not logged in")
            return false;
        } 
    }
  }
}



</script>





<style scoped>
    .router-link-exact-active {
        color: navy;
    }
</style>