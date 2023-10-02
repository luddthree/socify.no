<template>
    <div>
        <header class="shadow-sm bg-white">
            <nav class="conatiner mx-auto p-4 flex justify-between">
                <NuxtLink to="/" class="font-bold">linktree v2</NuxtLink>
                <ul class="flex gap-4">
                    <li><NuxtLink to="/">Home</NuxtLink></li>
                    <li><NuxtLink to="/login">login</NuxtLink></li>
                    <li><NuxtLink to="/signup" class="btn">signup</NuxtLink></li>
                </ul>
            </nav>
        </header>

        <div class="conatiner mx-auto p-4">
            <slot />
        </div>
    </div>
</template>

<style scoped>
    .router-link-exact-active {
        color: navy;
    }
</style>