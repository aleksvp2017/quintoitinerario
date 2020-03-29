<template>
 <v-card>
    <v-card-title>
      Cursos EaD gratuitos
      <v-spacer></v-spacer>
      <v-text-field
        v-model="busca"
        append-icon="mdi-magnify"
        label="Procure um curso"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="colunas"
      :items="cursos"
      :search="busca">
        <template v-slot:item.lingua="{ item }">
            {{ item.lingua === nul ? 'Portuguesa' : item.lingua}}
        </template>
        <template v-slot:item.link="{ item }">
            <v-btn small :href="item.link" target="_blank" outlined color="indigo">
                Acessar {{item.curso}}
            </v-btn>
        </template>
    </v-data-table>
  </v-card>
</template>

<script>
  import {listarCursos, listarColunas} from '../../services/Cursos'

  export default {
    data () {
      return {
        busca: ''      }
    },
    computed:{
        cursos(){
            return listarCursos()
        },
        colunas(){
            return listarColunas()
        }
    }
  }
</script>

<style>

</style>