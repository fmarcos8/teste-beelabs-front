<template>
  <CRow v-if="course">
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          Curso: id#{{  $route.params.id }}
        </CCardHeader>
        <CCardBody>
          <table class="table table-bordered">          
            <tbody>
              <tr>
                <td>Título</td>
                <td>{{ course.title }}</td>
              </tr>
              <tr>
                <td>Descrição</td>
                <td>{{ course.description }}</td>
              </tr>
            </tbody>
          </table>
        </CCardBody>
        <CCardFooter>
          <CButton color="primary" @click="goBack">Voltar</CButton>
        </CCardFooter>
      </CCard>
    </CCol>
    <CCol col="12" lg="6">
      <CCard>
        <CCardHeader>
          Alunos Matriculados
        </CCardHeader>
        <CCardBody>
          <div v-if="course.students.length == 0">
            <CAlert color="info">
              Nenhum Aluno foi Matriculado nesse curso ainda.
            </CAlert>
          </div>
          <div v-else>
            <table class="table table-bordered">  
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                </tr>  
              </thead>        
              <tbody>              
                <tr v-for="student in course.students" :key="student.id">
                  <td><router-link :to="`/students/data/${student.id}`">{{ student.name }}</router-link></td>
                  <td>{{ student.email }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CCardBody>
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
      course: null
    }
  },
  methods: {
    ...mapActions({
      show: 'courses/show'
    }),
    getCourse(id) {
      this.loading(true)
      this.show({ id }).then(response => {
        this.course = response
      })
      .catch(error => console.log(error))
      .finally(() => this.loading(false))
    }
  },
  mounted() {
    if (this.$route.params.id)
      this.getCourse(this.$route.params.id)
  }
}
</script>

<style>

</style>