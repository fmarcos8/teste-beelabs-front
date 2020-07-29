<template>
  <section>
    <Table 
      :ref-table="'studentsTable'" 
      :columns="columns" 
      :headings-prop="headings"
      :resource-url="'registrations/all'"
      :route="'registrations'"      
      :add-button-name="'Adicionar Matrícula'"
    />
  </section>
</template>

<script>
import Table from "../../components/_Table";

export default {
  components: {
    Table
  },
  data: () => ({
    headings: {
      id: "#",
      student_name: "Estudante",
      course_title: "Curso",
      created_at: "Data Cadastro",
      updated_at: "Data Atualização",
      actions: "Ações"
    },
    columns: ["id", "student_name", "course_title", "created_at", "updated_at", "actions"]
  }),
};
</script>

<style></style>
