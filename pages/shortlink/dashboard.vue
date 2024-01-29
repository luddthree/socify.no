<script lang="ts" setup>
import { ref, onMounted } from 'vue';

const newBookmark = ref("")
const newName = ref("")
const newBio = ref("")
const newPage = ref("")
const message = ref("")
const urls = ref("")
const newUrl = ref("")



const addurl = async () => {
  message.value = "";
  if (urls.value == null) return;
  if (newUrl.value == "") return;

  const url = await $fetch('/api/bio/create', {
    method: 'post',
    body: {
      urls: newUrl.value,
      id: localStorage.getItem('userId'),
    }
  });

  // Update local state
//   if (bios.value && bios.value.length > 0) {
//     bios.value[0].bio = newBio.value; // Update existing bio
//   } else {
//     bios.value = [{ bio: newBio.value }]; // Add new bio if none existed
//   }

// urls.value.push(url);
newUrl.value = "";
  
}








</script>


<template>
  <main class="container">
    <form class="bookmark-form" @submit.prevent>









      <input v-model="newBookmark" type="url" name="url" id="url" class="bg-white" placeholder="Add your links here" />
      <input v-model="newName" type="text" name="name" id="text" class="bg-white" placeholder="Pagename" />

      <button class="bg-gray-300 text-black hover:bg-gray-400" @click="addurl">Add</button>
      <!-- <NuxtLink :to="`/dashboard/page1/${page.id}`"  @click="addBookmark" class="bg-gray-300 hover:bg-gray-400">Add</NuxtLink> -->

    </form>
    <!-- <div>{{ newBookmark }}</div> -->
    <!-- <div class="flex justify-center items-center" v-if="message">{{ message }}</div> -->
    <!-- <div class="flex justify-center items-center" v-if="pending">Loading...</div>

    <div class="flex justify-center items-center" v-else-if="bookmarks && bookmarks.length > 0">
      <ol>
        <li class="bookmark-list--item" v-for="bookmark in bookmarks" :key="bookmark.id">
          <div class="flex">
            <div class="flex-none w-24 h-14"></div>
            <div class="flex-initial w-64">
              <a class="bookmark-link bg-gray-200 hover:bg-gray-300 text-white px-3 py-2 rounded-md text-sm inline-block"
                :href="bookmark.url" target="_blank" rel="noopener noreferrer">
                <img :src="bookmark.icon_url" />
                {{ bookmark.name }}
              </a>
            </div>
            <div class=" absolute">
              <button class="bg-red-400 text-black hover:bg-red-500 rounded px-1 py-4 text-xs absolute left-10 inline-block"
                @click="deleteBookmark(bookmark.id)">Delete</button>
            </div>
          </div>

        </li>
      </ol>

    </div>
  

    <div class="flex justify-center items-center text-gray-900 text-sm" v-else>No links yet...</div> -->



  </main>
</template>


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

.b ,
.b  {
  padding: 0.5em;
  width: 100px;
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

