<template>
  <section>
    <Table 
      :ref-table="'studentsTable'" 
      :columns="columns" 
      :headings-prop="headings"
      :resource-url="'students/all'"
      :route="'students'"      
      :add-button-name="'Adicionar Aluno'"
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
      name: "Nome",
      email: "Email",
      created_at: "Data Cadastro",
      updated_at: "Data Atualização",
      actions: "Ações"
    },
    columns: ["id", "name", "email", "created_at", "updated_at", "actions"]
  }),
};
</script>

<style></style>
