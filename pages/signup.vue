
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
      <br><br>
  <div class="flex">
    <div class="m-2 mx-auto">
      <div class="bg-gray-200 rounded-2xl px-8 py-2">
          <br>
          <div>
            <div class="flex justify-center text-center">
              <h1 class="text-center text-2xl font-bold">Sign up</h1>
            </div><br>
            <div class="flex justify-center">
              <div>
                <input
                class="rounded py-2 px-3"
                    type="text"
                    v-model="username"
                    placeholder="Username"
                /><br><br>
                <input
                class="rounded py-2 px-3"
                    type="password"
                    v-model="password"
                    placeholder="Password"
                /><br><br>
                <input
                class="rounded py-2 px-3"
                    type="email"
                    v-model="email"
                    placeholder="email"
                /><br><br>
              </div>
            </div>
            <br>
            <div class="flex justify-center">
                  <button class="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded" @click="signup">Sign up</button>


            </div>
              <br>
            </div>
          </div>
          <br>
          <div class="text-gray-600 text-sm flex justify-center">
            <p>Already a member? <b><a href="/login" class="text-gray-700 hover:text-gray-900 text-sm"> log in here!</a></b></p>            </div>
        <br><br>
      </div>
    </div>
</template>