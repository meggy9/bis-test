<template>
  <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
  >
    <v-list-item-group active-class="deep-purple--text text--accent-4">
      <v-list-item
          v-for="(item, key) in menuList"
          :key="key"
          @click="goToPage(item.path)"
      >
        <v-list-item-title>{{ item.name }}</v-list-item-title>
      </v-list-item>
    </v-list-item-group>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideMenu",
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    drawer: false,
    menuList: [
      {
        name: 'Счета',
        path: '/accounts'
      },
      {
        name: 'Операционные дни',
        path: '/operdays'
      },
      {
        name: 'Операции',
        path: '/operations'
      }
    ]
  }),
  watch: {
    value(newVal) {
      this.drawer = newVal
    },
    drawer(newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    goToPage(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>

</style>