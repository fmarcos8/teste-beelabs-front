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
            name="name_field"
            placeholder="John Doe"
            v-model="input.name"
            v-validate="'required'"
          />
          <span class="text-danger">{{ errors.first('name_field') }}</span>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CInput
            type="email"
            label="Email"
            name="email_field"
            placeholder="example@email.com"
            v-model="input.email"            
            v-validate="'required|email'"
          />
          <span class="text-danger">{{ errors.first('email_field') }}</span>
        </CCol>
      </CRow>
      <CRow>
        <CCol sm="6">
          <CInput
            type="date"
            label="Name"
            name="name"
            placeholder="Enter your name"
            v-model="input.birth_date"
          />
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
        name: "",
        email: "",
        birth_date: ""
      }
    }
  },
  methods: {
    ...mapActions({      
      store: 'students/store',
      show: 'students/show',
      update: 'students/update'
    }),
    doAction(action, data) {
      this.loading(true)
      this[action](data)
        .then(() => {
          this.$router.push('/students')
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
    getStudent(id) {      
      this.loading(true)
      this.show({ id })
        .then(({ name, email, birth_date }) => {
          this.input.name = name;
          this.input.email = email;
          this.input.birth_date = birth_date;
        })
        .finally(() => this.loading(false))
    },    
  },
  beforeMount() {
    if (this.id) {
      this.getStudent(this.id)
    }
  },
}
</script>

<style>

</style>