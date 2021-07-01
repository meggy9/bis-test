import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    acctPos: [
      {
        "AcctNum": "10201810000000010019",
        "Balance": 290.0,
        "OpDate": "2019-07-12"
      },
      {
        "AcctNum": "47441810000200000020",
        "Balance": -90.0,
        "OpDate": "2019-07-12"
      },
      {
        "AcctNum": "47443810000200000023",
        "Balance": -200.0,
        "OpDate": "2019-07-12"
      },
      {
        "AcctNum": "10201810000000010019",
        "Balance": 970.0,
        "OpDate": "2019-07-15"
      },
      {
        "AcctNum": "47441810000200000020",
        "Balance": -470.0,
        "OpDate": "2019-07-15"
      },
      {
        "AcctNum": "47443810000200000023",
        "Balance": -500.0,
        "OpDate": "2019-07-15"
      },
      {
        "AcctNum": "10201810000000010019",
        "Balance":1000.0,
        "OpDate": "2019-07-16"
      },
      {
        "AcctNum": "47441810000200000020",
        "Balance": -434.0,
        "OpDate": "2019-07-16"
      },
      {
        "AcctNum": "47443810000200000023",
        "Balance": -116.0,
        "OpDate": "2019-07-16"
      }
    ],
    opEntry:  [
      {
        "AcctNumCr": "10201810000000010019",
        "AcctNumDB": "47441810000200000020",
        "Amount": 10.0,
        "OpDate": "2019-07-12"
      },
      {
        "AcctNumCr": "47441810000200000020",
        "AcctNumDB": "47443810000200000023",
        "Amount": 100.0,
        "OpDate": "2019-07-12"
      },
      {
        "AcctNumCr": "47443810000200000023",
        "AcctNumDB": "10201810000000010019",
        "Amount": 300.0,
        "OpDate": "2019-07-12"
      },
      {
        "AcctNumCr": "10201810000000010019",
        "AcctNumDB": "47441810000200000020",
        "Amount": 20.0,
        "OpDate": "2019-07-15"
      },
      {
        "AcctNumCr": "47441810000200000020",
        "AcctNumDB": "47443810000200000023",
        "Amount": 400.0,
        "OpDate": "2019-07-15"
      },
      {
        "AcctNumCr": "47443810000200000023",
        "AcctNumDB": "10201810000000010019",
        "Amount": 700.0,
        "OpDate": "2019-07-15"
      },
      {
        "AcctNumCr": "10201810000000010019",
        "AcctNumDB": "47441810000200000020",
        "Amount": 40.0,
        "OpDate": "2019-07-16"
      },
      {
        "AcctNumCr": "47441810000200000020",
        "AcctNumDB": "47443810000200000023",
        "Amount": 4.0,
        "OpDate": "2019-07-16"
      },
      {
        "AcctNumCr": "47443810000200000023",
        "AcctNumDB": "10201810000000010019",
        "Amount": 70.0,
        "OpDate": "2019-07-16"
      }
    ],
    opDate: [
      {
        "OpDate": "2019-07-12"
      },
      {
        "OpDate": "2019-07-15"
      },
      {
        "OpDate": "2019-07-16"
      }
    ],
    filteredAcctPos: [],
    opForAccount: [],
    opForOpDate: [],
    accountsForOp: [],
    date: null
  },
  mutations: {
    SET_OPERATION_DATE: (state, payload) => {
      payload ?
          state.date = payload :
          state.date = new Date(Math.max(...state.opDate.map(
              e => new Date(e.OpDate)))).toISOString().substring(0,10)
    },
    SET_ACCOUNTS_FOR_DATE: (state, date) => {
      state.filteredAcctPos = state.acctPos.filter(account => account.OpDate === date)
    },
    SET_OPERATIONS_FOR_ACCOUNT: (state, acct) => {
      state.opForAccount = state.opEntry.filter(
          operation => (operation.AcctNumCr === acct || operation.AcctNumDB === acct))
    },
    SET_OPERATIONS_FOR_OPDATE: (state, opDate) => {
      state.opForOpDate = state.opEntry.filter(
          operation => operation.OpDate === opDate)
    },
    SET_OPERATION_ACCOUNTS: (state, operation) => {
      const acctCr = state.acctPos.find(
          acctPos => (operation.AcctNumCr === acctPos.AcctNum && operation.OpDate === acctPos.OpDate))
      const acctDB = state.acctPos.find(
          acctPos => (operation.AcctNumDB === acctPos.AcctNum && operation.OpDate === acctPos.OpDate))
      state.accountsForOp = [
        {
          AcctNum: acctCr.AcctNum,
          Balance: acctCr.Balance
        },
        {
          AcctNum: acctDB.AcctNum,
          Balance: acctDB.Balance
        }
      ]
    }
  },
  actions: {
  },
  modules: {
  }
})
