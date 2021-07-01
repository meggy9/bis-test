<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col>
        <CommonTable
            :items="opDate"
            name="opdate"
            crud
            @rowclick="handleOpdateSelect"
        ></CommonTable>
      </v-col>
      <v-col>
        <CommonTable
          :items="opForOpDate"
          name="operations"
        ></CommonTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommonTable from "@/components/CommonTable";

import { mapState, mapMutations } from 'vuex'

export default {
  name: "Operdays",
  components: {
    CommonTable
  },

  computed: {
    ...mapState(['opDate', 'opForOpDate'])
  },

  methods: {
    ...mapMutations(['SET_OPERATIONS_FOR_OPDATE']),
    handleOpdateSelect(acct) {
      this.SET_OPERATIONS_FOR_OPDATE(acct.OpDate)
    },
  }
}
</script>

<style scoped>

</style>