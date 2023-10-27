<script lang="ts" setup>

import { ref } from 'vue';

const newBookmark = ref("")
const newPage = ref("")
const message = ref("")

const { pending, data: bookmarks } = useAsyncData(async () =>
  $fetch("/api/pagelinks?userId=" + localStorage.getItem('userId')))

const { data: pages } = useAsyncData(async () =>
  $fetch("/api/pages?userId=" + localStorage.getItem('userId')))

const addBookmark = async () => {
  message.value = "";
  if (bookmarks.value == null) return;
  if (newBookmark.value == "") return;

  const bookmark = await $fetch('/api/pagelinks/create', {
    method: 'post',
    body: {
      url: newBookmark.value,
      pageId: id
    }
  });

  bookmarks.value.push(bookmark);
  newBookmark.value = "";
}

const addPages = async () => {
  message.value = "";
  if (pages.value == null) return;
  if (newPage.value == "") return;

  const page = await $fetch('/api/pages/create', {
    method: 'post',
    body: {
      title: newPage.value,
      user_id: localStorage.getItem('userId')
    }
  });

  pages.value.push(page);
  newPage.value = "";
}

const deletePage = async (id: string) => {
  if (pages.value == null) return;
  if (id == "") return;

  // Ensure that id is a valid number
  if (isNaN(id)) {
    console.error('Invalid page ID provided.');
    return;
  }

  try {
    // Call the deletePage function with the validated page ID
    const response = await $fetch('/api/pages/delete', {
      method: 'post',
      body: {
        id: id,
      },
    });

    // Display response.message somehow
    // message.value = response.message;

    // Remove the deleted page from the pages list
    pages.value = pages.value.filter((page) => page.id !== id);
  } catch (error) {
    console.error('Error deleting page:', error);
    // Handle the error and show an error message to the user
  }
}

//function that deletes a bookmark
const deleteBookmark = async (id: string) => {
  if (bookmarks.value == null) return;
  if (id == "") return;

  const response = await $fetch('/api/pagelinks/delete', {
    method: 'post',
    body: {
      id: id,
    }
  });

  // display response.message somehow
  // message.value = response.message;

  bookmarks.value = bookmarks.value.filter(bookmark => bookmark.id !== id);
}


// Check if the localStorage item "isLoggedIn" is true or false
function checkIsLoggedInLocalStorage () {
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
  // await navigateTo('/login')


} else {
  console.log("The isLoggedIn in localStorage is not set or has an invalid value.");
  // await navigateTo('/login')


}

const storedUsername = localStorage.getItem('username');

</script>


<template>
  <main class="container">
    <form class="bookmark-form" @submit.prevent>

      <!-- <div class="flex justify-center items-center">
          <img class="w-32 h-32 rounded-full overflow-hidden " src="pfp.jpg" alt="">
      </div> -->
      <div>
        <div class="container mt-10">
          <div class="flex justify-center items-center">
            <img class="w-32 h-32 rounded-full overflow-hidden" :src="image || 'pfp.jpg'" alt="">
          </div><br>
          <div class="">
            <input @change="handleImage" type="file" accept="image/*" class="absolute">
          </div>
        </div>
      </div>

      <br>
      <!-- display username of user -->
      <h1 class="text-center text-2xl font-bold">{{ storedUsername }}'s page</h1>
      <p class="text-xs text-center text-gray-700">no biograpy</p>
      <br>

      <input v-model="newBookmark" type="url" name="url" id="url" placeholder="Add your links here" required />
      <button class="bg-gray-300 hover:bg-gray-400" @click="addBookmark">Add</button>
    </form>
    <!-- <div>{{ newBookmark }}</div> -->
    <div class="flex justify-center items-center" v-if="message">{{ message }}</div>
    <div class="flex justify-center items-center" v-if="pending">Loading...</div>

    <div class="flex justify-center items-center" v-else-if="bookmarks && bookmarks.length > 0">
      <ol>
        <li class="bookmark-list--item" v-for="bookmark in bookmarks" :key="bookmark.id">
          <div class="flex">
            <div class="flex-none w-24 h-14"></div>
            <div class="flex-initial w-64">
              <a class="bookmark-link bg-gray-200 hover:bg-gray-300 text-white px-3 py-2 rounded-md text-sm text-white inline-block"
                :href="bookmark.url" target="_blank" rel="noopener noreferrer">
                <img :src="bookmark.icon_url" />
                {{ bookmark.url }}
              </a>
            </div>
            <div class="flex-initial w-32">
              <button class="bg-red-400 hover:bg-red-500 rounded px-1 py-4 text-xs inline-block"
                @click="deleteBookmark(bookmark.id)">Delete</button>
            </div>
          </div>

        </li>
      </ol>

    </div>
  

    <div class="flex justify-center items-center" v-else>No bookmarks found</div>

<br><br><br>
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


.bookmark-form input,
.bookmark-form button {
  padding: 0.5em;
  width: 300px;
}


.bookmark-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.bookmark-list--item img {
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


.bookmark-list--item a {
  text-decoration: none;
  font-size: 0.75rem;
  color: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  gap: 10px;
}</style>

