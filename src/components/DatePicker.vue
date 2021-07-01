<template>
  <v-menu
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      max-width="290px"
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="computedDateFormatted"
          label="MM/DD/YYYY формат"
          persistent-hint
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="date"
        no-title
        @input="menu = false"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "DatePicker",
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data: () => ({
    date: null,
    menu: false
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date || this.value)
    }
  },
  watch: {
    value(newVal) {
      this.date = newVal
    },
    date(newVal) {
      this.$emit('date-change', newVal)
      this.$emit('input', newVal)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
  },
  created() {
    this.date = this.value
  }
}
</script>

<style scoped>

</style>