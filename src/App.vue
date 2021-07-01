<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <SideMenu v-model="drawer"/>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from '@/components/SideMenu'

export default {
  name: 'App',
  components: {
    SideMenu
  },

  data: () => ({
    drawer: false
  }),
};
</script>
