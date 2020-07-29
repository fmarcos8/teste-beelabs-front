<template>
  <CCard>
    <CCardHeader>
      <CButton
        size="sm"
        color="success"
        class="m-2"
        @click="goBack()"
      >
        Voltar
      </CButton>
    </CCardHeader>
    <CCardBody>
      <CRow>
        <CCol sm="6">
          <CInput
            type="text"
            label="Nome"
            name="title_field"
            placeholder="Ex.: Matemática"
            v-model="input.title"
            v-validate="'required'"
          />
          <span class="text-danger">{{ errors.first('title_field') }}</span>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CTextarea
            label="Descrição"
            name="title_field"
            v-model="input.description"
          >
            {{ input.description }}
          </CTextarea>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CButton
            size="lg"
            color="success"
            class="m-2"
            @click="execute()"
          >
            Salvar
          </CButton>
        </CCol>
      </CRow>
    </CCardBody>
  </CCard>
</template>

<script>
import { mapActions } from 'vuex';
import mixins from '../../mixins';

export default {
  mixins: [mixins],
  data() {
    return {
      id: this.$route.params.id,
      input: {
        title: "",
        description: ""
      }
    }
  },
  methods: { 
    ...mapActions({
      store: 'courses/store',
      show: 'courses/show',
      update: 'courses/update'
    }),
    doAction(action, data) {
      this.loading(true)
      this[action](data)
        .then(() => {
          this.$router.push('/courses')
        })
        .catch(({ message_error }) => {
          this.$swal('Ops!',
            message_error,
            'error'
          );
        })
        .finally(() => this.loading(false))   
    },
    execute() {
      this.$validator.validate()
        .then(valid => {
          if (valid) {
            if (this.id) {
              this.doAction('update', {
                id: this.id,
                payload: this.input
              })
            } else {
              this.doAction('store', this.input)
            }
          }
        })
    },
    getCourse(id) {
      this.loading(true)
      this.show({ id })
        .then(({ title, description }) => {
          this.input.title = title;
          this.input.description = description;
        })
        .finally(() => this.loading(false))
    }
  },
  beforeMount() {
    if (this.id) {
      this.getCourse(this.id)
    }
  },
}
</script>

<style>

</style>