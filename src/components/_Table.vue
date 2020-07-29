<template>
  <CCard>
    <CCardHeader>
      <router-link :to="`/${route}/add`">
        <CButton
          color="success"
          class="m-2"
        >
          {{ addButtonName }}
        </CButton>
      </router-link>
    </CCardHeader>
    <CCardBody>
      <v-server-table
        :ref="refTable"
        :columns="columns"
        :options="options"
        perPage="10"
        perPageValues="[5, 10, 15, 20]"
      >
        <template slot="created_at" slot-scope="props">
          {{ moment(props.row.created_at).format('DD/MM/YYYY h:mm:ss') }}
        </template>

        <template slot="updated_at" slot-scope="props">
          {{ moment(props.row.updated_at).format('DD/MM/YYYY h:mm:ss') }}
        </template>
        
        <template slot="actions" slot-scope="props">
          <router-link :to="`/${route}/edit/${props.row.id}`">
            <CButton
              color="info"
              class="m-2"
            >
              <span>Editar</span>
            </CButton>
          </router-link>
          <router-link :to="`/${route}/data/${props.row.id}`">
            <CButton
              color="primary"
              class="m-2"
            >
              <span>Visualizar</span>
            </CButton>
          </router-link>
          <CButton
            color="danger"
            class="m-2"
            @click="remove(props.row.id)"
          >
            <span>Deletar</span>
          </CButton>
        </template>
      </v-server-table>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  props: {
    refTable: {
      type: String,
      default: ""
    },
    columns: {
      type: Array,
      default: () => []
    },
    headingsProp: {
      type: Object,
      default: () => ({})
    },
    resourceUrl: {
      type: String,
      default: ""
    },
    templates: {
      type: Object,
      default: () => ({})
    },
    route: {
      type: String,
      default: ""
    },
    module: {
      type: String,
      default: ""
    },
    addButtonName: {
      type: String,
      default: ""
    } 
  },
  data() {
    return {
      options: {
        headings: this.headingsProp,
        orderBy: {
          ascending: false,
          column: "id"
        },
        dateColumns: ["updated_at", "created_at"],
        dateFormat: "DD/MM/YYYY",
        requestFunction: data => {
          return this.$store.dispatch(this.resourceUrl, data).catch(
            function(e) {
              this.dispatch("error", e);
            }.bind(this)
          );
        },
        responseAdapter: function(resp) {
          const { data: response } = this.getResponseData(resp);
          const { data, total: count } = response;
          console.log(data)
          
          return { data, count };
        },
        templates: this.templates
      }
    }
  },
  methods: {
    ...mapActions({      
      loading: 'app/loading',
    }),
    remove(id) {
      this.$swal({
        title: 'Você tem certeza ?',
        text: "Essa ação não pode ser desfeita!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.value) {
          const self = this
          this.loading(true)
          this.$store
            .dispatch(`${this.route}/delete`, { id })
            .then(() => {
              self.$swal(
                'Deletado com Sucesso!',
                '',
                'success'
              ).then((result) => {
                if(result.value) {
                  this.$refs[self.refTable].refresh()
                }
              })
            })
            .catch(({ message_error }) => {
              self.$swal(
                'Ops!',
                message_error,
                'error'
              )
            })
            .finally(() => this.loading(false))
        }
      })
    }
  },
  mouted() {
    console.log(this.resourceUrl)
  }
}
</script>

<style></style>
