
<script lang="ts" setup>
// add password and username to database
const username = ref("")
const password = ref("")

const signup = async () => {
    if (username.value == "") return;
    if (password.value == "") return;

    const user = await $fetch('/api/bookmarks/create', {
        method: 'post',
        body: {
            username: username.value,
            password: password.value,
        }});

    username.value = "sd";
    password.value = "sd";
}
</script>

<template>
    <div>
        <!-- input signup username and password into database -->
        <div class="container">
            <div class="bookmark-form">
                <input
                    type="text"
                    v-model="username"
                    placeholder="Username"
                />
                <input
                    type="text"
                    v-model="password"
                    placeholder="Password"
                />
                <button @click="signup">Sign up</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

</script>
