<script lang="ts" setup>
const message = ref("")
const { page } = useRoute().params
const response = await $fetch('/api/user/search_pages', {
    method: 'post',
    body: {
        title: page,
    }
})



if (!response) {
        throw createError({ statusCode: 404, message: 'page not found', fatal: true})
    }



const { pending, data: bookmarks } = useAsyncData(async () =>
  $fetch("/api/pagelinks?userId=" + response.page))


</script>

<template>
  <main class="container">

<!-- put a picture here -->
<div class="flex justify-center items-center">
<img class="w-32 h-32 rounded-full overflow-hidden " src="pfp.jpg" alt="">
</div>

<br>
    <h1 class="text-center text-2xl font-bold">{{ page }}</h1>
    <p class="text-xs text-center text-gray-700">no biograpy</p>
<br>

      <!-- <div>{{ newBookmark }}</div> -->
      <div class="flex justify-center items-center" v-if="message">{{ message }}</div>
    <div class="flex justify-center items-center" v-if="pending">Loading...</div>

    <div class="flex justify-center items-center" v-else-if="bookmarks && bookmarks.length > 0">
      <ol>
  <li class="bookmark-list--item" v-for="bookmark in bookmarks" :key="bookmark.id">
    <a class="bookmark-link bg-gray-200 hover:bg-gray-300 text-white px-3 py-2 rounded-md text-sm text-white inline-block"
                :href="bookmark.url" target="_blank" rel="noopener noreferrer">
                <img :src="bookmark.icon_url" />
                {{ bookmark.url }}
              </a>
  </li>
</ol>

    </div>

    <div class="flex justify-center items-center" v-else>No bookmarks found</div>
  </main>
</template>

<script lang="ts">
export default {
  name: 'home',
  data() {
    return {
      image: '',
      inputUsername: '',
      isMenuOpen: false,
    }
  },

  methods: {
    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
      },
    async searchuser() {
      const usr = await $fetch('/api/user/search', {
        method: 'post',
        body: {
          name: this.inputUsername,
        }
      })
    },
    handleImage(e) {
      const file = e.target.files[0];
      this.createBase64Image(file);
      console.log(file);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.image = e.target.result;
        console.log(image);
      };
      reader.readAsDataURL(fileObject);

    },
  }
}
</script>


<style scoped>
* {
  font-family: sans-serif;
}

.container {
  max-width: max(95vh, 600px);
  margin-inline: auto;
}


.container .bookmark-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 50px;
}


.bookmark-form input, .bookmark-form button {
  padding: 0.5em;
  width: 300px;
}


.bookmark-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.bookmark-list--item img{
  aspect-ratio: 1;
  width: 32px;
  height: 32px;
  /* border-radius: 100%; */
  transition: all 100ms linear;
}

.bookmark-list--item {
  margin-block: 10px;
}

.bookmark-list--item:hover img {
  border-radius: 3px;
  scale: 1.15;
  
}


.bookmark-list--item a{
text-decoration: none;
font-size: 0.75rem;
color: rgb(0, 0, 0);
display: flex;
align-items: center;
gap: 10px;
}
</style>


