<template>
  <v-data-table
      :headers="computedHeaders"
      :items="items"
      sort-by="calories"
      class="elevation-1"
      @click:row="handleRowClick"
  >
    <template v-if="crud" v-slot:top>
      <v-toolbar
          flat
      >
        <v-toolbar-title>CRUD</v-toolbar-title>
        <v-divider
            class="mx-4"
            inset
            vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
            v-model="dialog"
            max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
            >
              Добавить запись
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      v-for="(item, key) in editedItem"
                      :key="key"
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        v-model="editedItem[key]"
                        :label="getInputLabelName(key)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="cancelDialog"
              >
                Отмена
              </v-btn>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
              >
                Сохранить
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Вы уверены что хотите удалить этот элемент?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="handleDeleteItemConfirm(true)">Отмена</v-btn>
              <v-btn color="blue darken-1" text @click="handleDeleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDetails" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                      v-for="(item, key) in editedItem"
                      :key="key"
                      cols="12"
                      sm="6"
                      md="4"
                  >
                    <v-text-field
                        :value="editedItem[key]"
                        readonly
                        :label="getInputLabelName(key)"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="blue darken-1"
                  text
                  @click="closeDialogDetails"
              >
                Ок
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="watchDetails(item)"
          >
            mdi-eye
          </v-icon>
        </template>
        <span>Просмотр</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
        </template>
        <span>Редактировать</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
              small
              class="mr-2"
              v-bind="attrs"
              v-on="on"
              @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <span>Удалить</span>
      </v-tooltip>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "CommonTable",
  props: {
    items: {
      type: Array,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    crud: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    editedItem: null,
    dialog: false,
    dialogDelete: false,
    dialogDetails: false,
    formTitle: 'Popup title',
    defaultItems: {
      accounts: {
        AcctNum: '',
        Balance: 0,
        OpDate: ''
      },
      operations: {
        OpDate: '',
        AcctNumDB: '',
        AcctNumCr: '',
        Amount: 0
      }
    },
    headers: {
      accounts: [
        {
          text: 'Номер счёта',
          align: 'start',
          sortable: false,
          value: 'AcctNum',
        },
        { text: 'Баланс', value: 'Balance' },
        { text: 'Дата операции', value: 'OpDate' },
        { text: 'Действия', value: 'actions', sortable: false }
      ],
      operations: [
        {
          text: 'Дата операционного дня',
          align: 'start',
          sortable: false,
          value: 'OpDate',
        },
        { text: 'Счет дебета', value: 'AcctNumDB' },
        { text: 'Счет кредита', value: 'AcctNumCr' },
        { text: 'Сумма', value: 'Amount' },
        { text: 'Действия', value: 'actions', sortable: false }
      ],
      opdate: [
        {
          text: 'Дата операционного дня',
          align: 'start',
          sortable: false,
          value: 'OpDate',
        },
        { text: 'Действия', value: 'actions', sortable: false }
      ],
      accountsforop: [
        {
          text: 'Номер счёта',
          align: 'start',
          sortable: false,
          value: 'AcctNum',
        },
        { text: 'Остаток', value: 'Balance' },
        { text: 'Действия', value: 'actions', sortable: false }
      ]
    }
  }),

  computed: {
    computedHeaders() {
      return this.crud ? this.headers[this.name] : this.headers[this.name].slice(0, -1)
    }
  },

  methods: {
    watchDetails(item) {
      this.editedItem = item
      this.dialogDetails = true
    },
    editItem(item) {
      this.editedItem = item
      this.dialog = true
    },
    deleteItem(item) {
      this.editedItem = item
      this.dialogDelete = true
    },
    handleDeleteItemConfirm(cancellation=false) {
      if (!cancellation) {
        this.$emit('delete', this.editedItem)
      }
      this.setEditedAsDefault()
      this.dialogDelete = false
    },
    save() {
      this.$emit('save', this.editedItem)
      this.setEditedAsDefault()
      this.dialog = false
    },
    cancelDialog() {
      this.dialog = false
      this.setEditedAsDefault();
    },
    closeDialogDetails() {
      this.dialogDetails = false
      this.setEditedAsDefault();
    },
    handleRowClick(item) {
      this.$emit('rowclick', item)
    },
    setEditedAsDefault() {
      this.editedItem = this.defaultItems[this.name]
    },
    getInputLabelName(key) {
      return this.headers[this.name].find(item => item.value === key).text
    },
  },

  created() {
    this.setEditedAsDefault();
  }
}
</script>

<style scoped>

</style>