<template>
  <div>
    <navegacao/>
    <router-view></router-view>
  </div>
</template>

<script>
import Navegacao from './components/Navegacao.vue'

export default {
    components: {
      'navegacao': Navegacao,
    },    
  }
</script>

<style scoped>

</style>