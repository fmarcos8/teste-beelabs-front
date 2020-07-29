<template>
  <section>
    <Table 
      :ref-table="'coursesTable'" 
      :columns="columns" 
      :headings-prop="headings"
      :resource-url="'courses/all'"
      :route="'courses'"
      :add-button-name="'Adicionar Curso'"
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
    items: [],
    headings: {
      id: "#",
      title: "Título",
      description: "Descrição",
      created_at: "Data Cadastro",
      updated_at: "Data Atualização",
      actions: "Ações"
    },
    columns: ["id", "title", "description", "created_at", "updated_at", "actions"]
  }),
};
</script>

<style></style>
