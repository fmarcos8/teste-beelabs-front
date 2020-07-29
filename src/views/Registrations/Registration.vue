<template>
  <CRow>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          Matricula: id#{{ $route.params.id }}
        </CCardHeader>
        <CCardBody>
          <table class="table table-bordered">
            <thead>
              <th>#</th>
              <th>Aluno</th>
              <th>Curso</th>
              <th>Data Cadastro</th>
            </thead>     
            <tbody>
              <tr>
                <td>{{ registration.id }}</td>
                <td>
                  <router-link :to="`/students/data/${registration.student_id}`">
                    {{ registration.student_name }}
                  </router-link>
                </td>
                <td>
                  <router-link :to="`/courses/data/${registration.course_id}`">
                    {{ registration.course_title }}
                  </router-link></td>
                <td>{{ registration.registration_c }}</td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Voltar</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import mixins from '../../mixins';
import { mapActions } from 'vuex';

export default {
  mixins: [mixins],
  data() {
    return {
      registration: null
    }
  },
  methods: {
    ...mapActions({
      show: 'registrations/show'
    }),
    getRegistration(id) {
      this.loading(true)
      this.show({ id }).then(response => {
        this.registration = response
      })
      .catch(error => console.log(error))
      .finally(() => this.loading(false))
    }
  },
  mounted() {
    if (this.$route.params.id)
      this.getRegistration(this.$route.params.id)
  }
}
</script>

<style>

</style>