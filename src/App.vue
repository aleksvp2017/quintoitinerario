<template>
  <v-app>
    <navegacao/>
    <v-content>
      <router-view></router-view>
    </v-content>
    <rodape/>
  </v-app>
</template>

<script>
import Navegacao from './components/Navegacao.vue'
import Rodape from './components/Rodape.vue'

export default {
    components: {
      'navegacao': Navegacao,
      'rodape': Rodape
    },    
  }
</script>

<style>

</style>