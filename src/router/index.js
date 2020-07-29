import Vue from 'vue'
import Router from 'vue-router'

// Containers
const TheContainer = () => import('@/containers/TheContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')

// My views
const Student = () => import('@/views/Students/Student.vue');
const Students = () => import('@/views/Students/Students.vue');
const StudentsForm = () => import('@/views/Students/Form.vue');

const Course = () => import('@/views/Courses/Course.vue');
const Courses = () => import('@/views/Courses/Courses.vue');
const CoursesForm = () => import('@/views/Courses/Form.vue');

const Registrations = () => import('@/views/Registrations/Registrations.vue');
const Registration = () => import('@/views/Registrations/Registration.vue');
const RegistrationForm = () => import('@/views/Registrations/Form.vue');

Vue.use(Router)

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})

function configRoutes () {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: TheContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'students',
          name: 'Alunos',
          component: {render (c) {return c('router-view')}},
          children: [
            {
              path: "/",
              component: Students
            },
            {
              path: "data/:id",
              name: "Visualizar Aluno",
              component: Student
            },
            {
              path: "add",
              name: "Adicionar Aluno",
              component: StudentsForm
            },
            {
              path: "edit/:id",
              name: "Editar Aluno",
              component: StudentsForm
            }
          ]
        },
        {
          path: "courses",
          name: "Cursos",
          component: { render (c) { return c('router-view') }},
          children: [
            {
              path: "/",
              component: Courses
            },
            {
              path: "data/:id",
              name: "Visualizar Curso",
              component: Course
            },
            {
              path: "add",
              name: "Adicionar Curso",
              component: CoursesForm
            },
            {
              path: "edit/:id",
              name: "Editar Curso",
              component: CoursesForm
            }
          ]
        },
        {
          path: "registrations",
          name: "Matrículas",
          component: { render (c) { return c('router-view') }},
          children: [
            {
              path: "/",
              component: Registrations
            },
            {
              path: "data/:id",
              name: "Visualizar Matricula",
              component: Registration
            },
            {
              path: "add",
              name: "Adicionar Matrícula",
              component: RegistrationForm
            },
            {
              path: "edit/:id",
              name: "Editar Matrícula",
              component: RegistrationForm
            }
          ]
        },
      ]
    }
  ]
}

