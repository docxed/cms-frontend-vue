<script setup>
const auth = useAuthStore()

const drawer = ref(false)

const menus = ref([
  {
    title: 'Home',
    icon: 'mdi-home',
    to: { name: 'home' },
  },
  {
    title: 'Blog',
    icon: 'mdi-post',
    to: { name: 'blog-simple' },
  },
])

const appendMenus = ref([
  {
    title: 'Logout',
    icon: 'mdi-logout',
    to: { name: 'logout' },
  },
])
</script>
<template>
  <v-app-bar color="primary">
    <template #prepend>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </template>
    <v-app-bar-title>CMS</v-app-bar-title>
    <template #append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list density="compact" nav>
          <v-list-item disabled>
            <v-list-item-title>
              {{ auth.user.firstname }}
              {{ auth.user.lastname }}
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            v-for="(menu, _i) in appendMenus"
            :key="`appendMenus-${_i}`"
            :title="menu.title"
            :value="menu.to"
            :to="menu.to"
          >
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list density="compact" nav color="primary">
      <template v-for="(menu, _i) in menus" :key="`menu-${_i}`">
        <v-list-group
          :value="menu.to"
          v-if="menu.children && menu.children.length > 0"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :prepend-icon="menu.icon"
              :title="menu.title"
            ></v-list-item>
          </template>
          <v-list-item
            :prepend-icon="child.icon"
            :title="child.title"
            :value="child.to"
            v-for="(child, _j) in menu.children"
            :key="`menu-${_i}-child-${_j}`"
          ></v-list-item>
        </v-list-group>
        <v-list-item
          :prepend-icon="menu.icon"
          :title="menu.title"
          :value="menu.to"
          :to="menu.to"
          v-else
        ></v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>
