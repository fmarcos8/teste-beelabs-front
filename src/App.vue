<template>
<div>
  <router-view></router-view>
  <loading 
    :active.sync="isLoading" 
    :is-full-page="true" 
    color="#7957d5"
  />
</div>
</template>

<script>
import loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
    loading
  },
  computed: {
    ...mapGetters({
      isLoading: 'app/isLoading'
    })
  }
}
</script>

<style lang="scss">
  // Import Main styles for this application
  @import 'assets/scss/style';
</style>
