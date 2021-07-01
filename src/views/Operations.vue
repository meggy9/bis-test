<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col>
        <CommonTable
            :items="opEntry"
            name="operations"
            @rowclick="handleOperationSelect"
        ></CommonTable>
      </v-col>
      <v-col>
        <CommonTable
            :items="accountsForOp"
            name="accountsforop"
        ></CommonTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CommonTable from "@/components/CommonTable";

import { mapState, mapMutations } from 'vuex'

export default {
  name: "Operations",
  components: {
    CommonTable
  },

  computed: {
    ...mapState(['opEntry', "accountsForOp"])
  },

  methods: {
    ...mapMutations(['SET_OPERATION_ACCOUNTS']),
    handleOperationSelect(operation) {
      this.SET_OPERATION_ACCOUNTS(operation)
    },
  }
}
</script>

<style scoped>

</style>