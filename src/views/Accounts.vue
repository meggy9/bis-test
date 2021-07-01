<template>
  <v-container>
    <v-row class="d-flex flex-column">
      <v-col>
        <DatePicker v-model="date" @date-change="handleDateChange"/>
      </v-col>
      <v-col>
        <CommonTable
            :items="filteredAcctPos"
            name="accounts"
            crud
            @rowclick="handleAccountSelect"
        ></CommonTable>
      </v-col>
      <v-col>
        <CommonTable
            name="operations"
            :items="opForAccount"
        ></CommonTable>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import DatePicker from "@/components/DatePicker";
import CommonTable from "@/components/CommonTable";

import { mapState, mapMutations } from 'vuex'

export default {
  name: "Accounts",
  components: {
    CommonTable,
    DatePicker
  },

  computed: {
    ...mapState(['opForAccount', 'filteredAcctPos', 'date']),
    date: {
      get() {
        return this.$store.state.date
      },
      set(val) {
        this.SET_OPERATION_DATE(val)
      }
    }
  },

  methods: {
    ...mapMutations([
      'SET_OPERATIONS_FOR_ACCOUNT',
      'SET_OPERATION_DATE',
      'SET_ACCOUNTS_FOR_DATE'
    ]),
    handleAccountSelect(acct) {
      console.log('Hello')
      this.SET_OPERATIONS_FOR_ACCOUNT(acct.AcctNum)
    },
    handleDateChange(date) {
      this.SET_ACCOUNTS_FOR_DATE(date)
    }
  },

  created() {
    this.SET_OPERATION_DATE();
    this.SET_ACCOUNTS_FOR_DATE();
  }
}
</script>

<style scoped>

</style>