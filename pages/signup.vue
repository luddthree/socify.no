
<script lang="ts" setup>
// add password and username to database
const username = ref("")
const password = ref("")
const email = ref("")

const signup = async () => {
    console.log(username.value, password.value);
    if (username.value == "") return;
    if (password.value == "") return;
    if (email.value == "") return;

    const user = await $fetch('/api/user/create', {
        method: 'post',
        body: {
            name: username.value,
            password: password.value,
            email: email.value
        }});

    username.value = "";
    email.value = "";
    password.value = "";
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
                    type="email"
                    v-model="email"
                    placeholder="emaiol"
                />
                
                <input
                    type="password"
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
