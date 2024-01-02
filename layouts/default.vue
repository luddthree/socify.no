<template>
    <div>
      <br>
      <!-- Header for mobile devices -->
      <header class="shadow-md fixed w-10/12 rounded-3xl bg-white sm:hidden ml-6 mr-6">
            <nav class="conatiner mx-auto p-4 flex justify-between">
                <!-- <NuxtLink to="/" class="font-bold text-2xl left-4 ml-2 top-3"><img src="/logo.png" class="rounded-2xl" style="height:40px;"></NuxtLink> -->
                <NuxtLink to="/" class="font-bold text-lg text-black">Socify</NuxtLink>
                <button @click="toggleMenu" class="hamburger-button trans text-black absolute top-3 right-10" style="font-size: 25px;">{{ isMenuOpen ? '✕' : '☰' }}</button>

                    <ul class="trans mt-11" :class="{ 'active': isMenuOpen }">
                
                    <!-- <li @click="toggleMenu()" class="mb-4 mt-8"><NuxtLink to="/">Home</NuxtLink></li> -->
                    <li @click="toggleMenu()" class="rounded-2xl bg-gray-800 hover:gray-900 py-3 px-3 text-white mt-6" v-if="checkIsLoggedInLocalStorage()"><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
                    <li @click="toggleMenu()" class="mb-10 mr-14 rounded-xl bg-gray-200 hover:bg-gray-300 text-black py-3 px-3 text-center font-bold" v-else><NuxtLink to="/login">Log in</NuxtLink></li>
                    <li @click="logout()" class="absolute top-20 mt-4 left-20" v-if="checkIsLoggedInLocalStorage()"><button class="text-s hover:bg-red-700 cursor-pointer rounded ">Logout</button></li>
                    <li @click="toggleMenu()" class="mb-3" v-else><NuxtLink to="/signup" class="rounded-full bg-gray-800 hover:bg-gray-900 py-4 px-4 font-bold mr-2 text-white">Sign up for free!</NuxtLink></li>
                
                    </ul>
            </nav>
        </header>
  

      <header class="shadow-md bg-white rounded-full hidden sm:flex ml-36 fixed w-10/12">
            <nav class="conatiner mx-auto p-4 flex justify-between mt-2 mb-3">

              <!-- <NuxtLink to="/" class="font-bold text-2xl left-10 top-5 absolute"><img src="/logo.png" class="rounded-2xl" style="height:40px;"></NuxtLink> -->
              <NuxtLink to="/" class="font-bold text-2xl left-10 text-black absolute">Socify</NuxtLink>
                <br>
                <ol class="flex gap-4 right-8 absolute text-xl">
                    <!-- <li><NuxtLink to="/">Home</NuxtLink></li> -->
                    <li v-if="checkIsLoggedInLocalStorage()"><NuxtLink to="/dashboard" class="rounded-full bg-gray-800 hover:bg-gray-900 text-white py-4 px-4">Dashboard</NuxtLink></li>
                    <!-- <li v-if="checkIsLoggedInLocalStorage()"><NuxtLink to="/dashboard/pages">page edit</NuxtLink></li> -->
                    <li v-else><NuxtLink to="/login" class="rounded-xl bg-gray-200 hover:bg-gray-300 text-black py-3 px-3 mr-2">Log in</NuxtLink></li>
                    <li v-if="checkIsLoggedInLocalStorage()" @click="logout()"><button class="hover:text-red-700 cursor-pointer ">Log out</button></li>
                    <li v-else><NuxtLink to="/signup" class="rounded-full bg-gray-800 hover:bg-gray-900 text-white py-4 px-4">Sign up for free!</NuxtLink></li>

                </ol>
            </nav>
        </header>



    </div>
    <div class="conatiner mx-auto">
            <NuxtPage/>
        </div>
        <div class="max-w-full w-[900px] m-auto">
    <!-- 
      We'll work on the Social Media Post Generator after the chat widget,
      you can leave it commented out for now
    -->
    <!-- <SocialMediaPostGenerator /> -->
    <ChatWidget />
  </div>


        <footer class="bg-gray-900 text-white">
          <br> 
          <!-- <ol class="ml-52 absolute">
            <li class="mt-10 mb-4 font-bold">Links:</li>
            <li><NuxtLink to="/dashboard">Dashboard</NuxtLink></li>
            <li><NuxtLink to="/login">Log in</NuxtLink></li>
            <li class="mb-10"><NuxtLink to="/signup">Sign up</NuxtLink></li>
</ol> -->

<div class="ml-6 font-bold flex">
  <div class="flex-initial w-[50%] text-center">
    <div class="flex flex-col items-center justify-center">
      <span>Github Project:</span>
      <a href="https://github.com/luddthree/socify.no">
        <img src="https://images.freeimages.com/fic/images/icons/2779/simple_icons/4096/github.png" class="w-16"/>
      </a> 
    </div>
  </div>
    
  <div class="flex-initial w-[50%] text-center">
    <div class="flex flex-col items-center justify-center">
      <span>Donate Bitcoin:</span>
      <a href="https://www.google.com/search?q=bc1qmkqklxtdvhpcvcy5p0s9k35ef5p8mda4zy937r" class="">
        <img src="/btc.png" class="w-16" />
      </a>
    </div>
  </div>
</div>

  
  <!-- <li class="mt-10 mb-2 font-bold">Github Project:</li>
  <li class="font-bold absolute">Github Project:</li>
  <li class="w-16"></li> -->
            <!-- <li class="mt-10 mb-4 font-bold">Socials:</li> -->
            <!-- <li><a href="https://www.instagram.com/ludviktv05"><img src="https://img.icons8.com/fluent/48/000000/instagram-new.png"/></a></li> -->
            

            
<br><br><br><br>
        </footer>
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
        localStorage.removeItem('username');
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
      color: rgb(37, 37, 37);
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