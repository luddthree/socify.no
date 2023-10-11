<script lang="ts" setup>
const newBookmark = ref("")
const message = ref("")

const { pending, data: bookmarks } = useAsyncData(async () =>
  $fetch("/api/bookmarks?userId=" + localStorage.getItem('userId')))

const addBookmark = async () => {
  message.value = "";
if (bookmarks.value == null) return;
if (newBookmark.value == "") return;

const bookmark = await $fetch('/api/bookmarks/create', {
  method: 'post',
  body: {
    url: newBookmark.value,
    userId: localStorage.getItem('userId')
  }});

  bookmarks.value.push(bookmark);
  newBookmark.value = "";
}

//function that deletes a bookmark
const deleteBookmark = async (id: string) => {
  if (bookmarks.value == null) return;
  if (id == "") return;

  const response = await $fetch('/api/bookmarks/delete', {
    method: 'post',
    body: {
      id: id,
    }
  });

  // display response.message somehow
  message.value = response.message;

  bookmarks.value = bookmarks.value.filter(bookmark => bookmark.id !== id);
}


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
  await navigateTo('/login')


} else {
  console.log("The isLoggedIn in localStorage is not set or has an invalid value.");
  await navigateTo('/login')


}
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
        <img class="w-32 h-32 rounded-full overflow-hidden" style="" scr="pfp.jpg" :src="image" alt="pfp.jpg">
        </div><br><div>
        <input @change="handleImage" type="file" accept="image/*" class="custom-input">
      </div>
    </div>
  </div>

    <br>
    <!-- display username of user -->
      <h1 class="text-center text-2xl font-bold">Username</h1>
      <p class="text-xs text-center text-gray-700">no biograpy</p>
    <br>

      <label for="url">Add links here</label>
      <input v-model="newBookmark" type="url" name="url" id="url" required />
      <button class="bg-gray-300 hover:bg-gray-400" @click="addBookmark">Add</button>
      </form>
      <!-- <div>{{ newBookmark }}</div> -->
      <div class="flex justify-center items-center" v-if="message">{{ message }}</div>
    <div class="flex justify-center items-center" v-if="pending">Loading...</div>

    <div class="flex justify-center items-center" v-else-if="bookmarks && bookmarks.length > 0">
      <ul>
  <li class="bookmark-list--item" v-for="bookmark in bookmarks" :key="bookmark.id">
    <div>
    <a class="bookmark-link" :href="bookmark.url" target="_blank" rel="noopener noreferrer">
      <img :src="bookmark.icon_url" />
      {{ bookmark.url }} 
      
    </a><button class="bg-red-400 hover:bg-red-500 rounded p-0.5 text-xs" @click="deleteBookmark(bookmark.id)">Delete</button>
    </div>
    
     </li>
</ul>

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
    }
  },
  methods: {
    async searchuser() {
      const usr = await $fetch('/api/user/search', {
          method: 'post',
          body: {
              name: this.inputUsername,
          }
      })}  ,
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
  }}

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
  width: 24px;
  height: 24px;
  /* border-radius: 100%; */
  transition: all 100ms linear;
}

.bookmark-list--item {
  margin-block: 10px;
}

.bookmark-list--item:hover img {
  border-radius: 3px;
  scale: 1.05;
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


