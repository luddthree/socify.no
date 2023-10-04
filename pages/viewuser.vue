<script lang="ts" setup>
const message = ref("")

const { pending, data: bookmarks } = useAsyncData(async () =>
  $fetch("/api/bookmarks?userId=" + localStorage.getItem('userId2')))

</script>


<template>
  <main class="container">

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


