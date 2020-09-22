<template>
  <v-list-item-group>
    <NuxtLink to="/" class="text-decoration-none">
      <v-list-item nuxt class="py-1 px-2">
        <v-list-item-action>
          <v-icon>mdi-view-dashboard-outline</v-icon>
        </v-list-item-action>
        <v-list-item-title>主页</v-list-item-title>
      </v-list-item>
    </NuxtLink>

    <NuxtLink to="/account" class="text-decoration-none">
      <v-list-item nuxt class="py-1 px-2">
        <v-list-item-action>
          <v-icon>mdi-account-circle-outline</v-icon>
        </v-list-item-action>
        <v-list-item-title>个人资料</v-list-item-title>
      </v-list-item>
    </NuxtLink>

    <NuxtLink nuxt to="/settings" class="text-decoration-none">
      <v-list-item nuxt class="py-1 px-2">
        <v-list-item-action>
          <v-icon>mdi-cog-outline</v-icon>
        </v-list-item-action>
        <v-list-item-title>设置</v-list-item-title>
      </v-list-item>
    </NuxtLink>

    <NuxtLink to="/about" class="text-decoration-none">
      <v-list-item nuxt class="py-1 px-2">
        <v-list-item-action>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-action>
        <v-list-item-title>关于 ChatCat</v-list-item-title>
      </v-list-item>
    </NuxtLink>
  </v-list-item-group>
</template>

<script>
export default {}
</script>

<style></style>
