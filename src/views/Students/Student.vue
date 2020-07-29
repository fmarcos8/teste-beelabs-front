<template>
  <CRow>
    <CCol col="12" lg="8">
      <CCard v-if="student">
        <CCardHeader>
          EStudante:  id#{{ $route.params.id }}
        </CCardHeader>
        <CCardBody>
          <table class="table table-bordered">
            <thead class="thead-light">
              <tr>
                <th colspan="2">{{ student.name }}</th>
              </tr>
            </thead>
            <tr>
              <th>Email</th>
              <td>{{ student.email }}</td>
            </tr>
            <tr>
              <th>Data do Cadastro</th>
              <td>{{ student.created_at }}</td>
            </tr>
            <tr>
              <th>Cursos</th>
              <td>
                <div v-if="student.courses.length == 0">
                  <CAlert color="info">
                    Não Está Cadastrado em nenhum curso.
                  </CAlert>
                </div>
                <div v-else>
                  <CButton 
                    @click="showCourses = !showCourses" 
                    color="primary"
                    class="mb-2"
                  >
                    <span>{{ !showCourses ? 'Mostrar' : 'Esconder' }}</span>
                  </CButton>
                  <CCollapse :show="showCourses">
                    <CCard body-wrapper>
                      <table class="table">
                        <thead class="thead-light">
                          <tr>
                            <th>Título</th>
                            <th>Descrição</th>
                          </tr>
                        </thead>
                        <tr v-for="course in student.courses" :key="course.id">
                          <td>{{ course.title }}</td>
                          <td>{{ course.description }}</td>
                        </tr>
                      </table>
                    </CCard>
                  </CCollapse>                
                </div>
              </td>
            </tr>
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
      showCourses: false,
      student: null,
      hasCourses: false
    }
  },
  methods: {
    ...mapActions({
      show: 'students/show'
    }),
    getStudent(id) {
      this.loading(true)
      this.show({ id }).then(response => {
        this.student = response;
      })
      .catch(error => console.log(error))
      .finally(() => this.loading(false))
    }
  },
  mounted() {
    if (this.$route.params.id)
      this.getStudent(this.$route.params.id)
  }
}
</script>

<style>

</style>