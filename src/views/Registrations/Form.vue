<template>
  <CRow>
    <CCol>
      <CCard>
        <CCardHeader>
          <CButton size="sm" color="success" class="m-2" @click="goBack()">
            Voltar
          </CButton>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol sm="6">
              <label>Selecione um Estudante</label>
              <VueSelect
                v-model="input.student"
                @search="fetchOptions"
                :options="student_options"
                v-validate="'required'"
                name="select_student"
              />
              <span class="text-danger">{{
                errors.first("select_student")
              }}</span>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <label>Selecione um Curso</label>
              <VueSelect
                v-model="input.course"
                :options="course_options"
                @search="fetchOptions"
                v-validate="'required'"
                name="select_course"
              />
              <span class="text-danger">{{
                errors.first("select_course")
              }}</span>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="6">
              <hr />
              <CButton size="lg" color="success" class="m-2" @click="execute()">
                Salvar
              </CButton>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import _ from "lodash";
import { mapActions } from "vuex";
import mixins from "../../mixins";

export default {
  mixins: [mixins],
  components: {
    VueSelect
  },
  data() {
    return {
      id: this.$route.params.id,
      student_options: [],
      course_options: [],
      input: {
        student: "",
        course: ""
      }
    };
  },
  methods: {
    ...mapActions({
      getStudent: "students/all",
      getCourses: "courses/all",
      store: "registrations/store",
      update: "registrations/update",
      show: "registrations/show"
    }),
    doAction(action, data) {
      this.loading(true);
      this[action](data)
        .then(() => this.$router.push("/registrations"))
        .catch(({ message_error }) => {
          this.$swal("Ops!", message_error, "error");
        })
        .finally(() => this.loading(false));
    },
    execute() {
      this.$validator.validate().then(valid => {
        if (valid) {
          let data = {
            course_id: this.input.course.code,
            student_id: this.input.student.code
          };

          if (this.id) {
            this.doAction("update", {
                id: this.id,
                payload: data
              });
          } else {
            this.doAction("store", data);
          }
        }
      });
    },
    fetchOptions(search, loading) {
      if (search === "") {
        return;
      }

      loading(true);
      this.search(loading, search, this);
    },
    search: _.debounce((loading, search, vm) => {
      vm.getStudent({ query: search, limit: "", page: "" })
        .then(response => {
          vm.student_options = response.data.data.map(student => {
            return {
              code: student.id,
              label: student.name
            };
          });
        })
        .finally(() => loading(false));
    }),
    getRegistration(id) {
      this.show({ id }).then(response => {
        this.input.course = {
          code: response.course_id,
          label: response.course_title
        };
        this.input.student = {
          code: response.student_id,
          label: response.student_name
        };
      });
    }
  },
  async beforeMount() {
    this.loading(true);
    await this.getCourses({ query: "", limit: "", page: "" })
      .then(response => {
        this.course_options = response.data.map(course => {
          return {
            code: course.id,
            label: course.title
          };
        });
      })
      .finally(() => this.loading(false));

    if (this.id) {
      this.getRegistration(this.id);
    }
  }
};
</script>

<style></style>
