<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="conatiner mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">linktree v2</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/userpage">Dashboard</NuxtLink></li>
                    <!-- <li><NuxtLink to="/login">login</NuxtLink></li> -->
                    <!-- <li><NuxtLink to="/signup" class="btn">signup</NuxtLink></li> -->
                    <li @click="logout()"><button class="btn bg-red-400 hover:bg-red-500 rounded p-0.5 px-1">logout</button></li>

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
    }
  }

}

</script>




<style scoped>
    .router-link-exact-active {
        color: navy;
    }
</style>