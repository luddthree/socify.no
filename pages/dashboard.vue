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
      <label for="url">Add links here</label>
      <input v-model="newBookmark" type="url" name="url" id="url" required />
      <button class="bg-gray-300 hover:bg-gray-400" @click="addBookmark">Add</button>
      </form>

      <!-- <div>{{ newBookmark }}</div> -->
      <div v-if="message">{{ message }}</div>
    <div v-if="pending">Loading...</div>

    <div class="" v-else-if="bookmarks && bookmarks.length > 0">
      <ul>
  <li class="bookmark-list--item" v-for="bookmark in bookmarks" :key="bookmark.id">
    <a class="bookmark-link" :href="bookmark.url" target="_blank" rel="noopener noreferrer">
      <img :src="bookmark.icon_url" />
      {{ bookmark.url }}
      
    </a>
    <div>
    <button class="bg-red-400 hover:bg-red-500 rounded p-0.5 text-xs" @click="deleteBookmark(bookmark.id)">Delete</button></div>
  </li>
</ul>

    </div>

    <div v-else>No bookmarks found</div>
  </main>
</template>


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
  border-radius: 100%;
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


