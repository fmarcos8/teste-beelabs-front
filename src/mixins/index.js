import { mapActions } from 'vuex'

const mixins = {
  methods: {
    ...mapActions({
      loading: 'app/loading',
    }),
    goBack(){
      history.go(-1);
    }
  }
}

export default mixins;