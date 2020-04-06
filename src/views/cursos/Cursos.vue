<template>
 <v-card>
    <v-card-title>
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
        class="mt-10"
      :headers="colunas"
      :items="cursos"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-arrow-left',
        nextIcon: 'mdi-arrow-right'}"
      :search="busca">
        <template v-slot:item.lingua="{ item }">
            {{ item.lingua == null ? 'Portuguesa' : item.lingua}}
        </template>
        <template v-slot:item.link="{ item }">
            <v-btn small :href="item.link" target="_blank" outlined color="#00897B">
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
        busca: '',    
      }
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

<!--
//gera o build
npm run build
//gera imagem docker
docker build -t cursoseadgratuitos .
//roda o docker para testar
docker run -it -p 8080:8080 --rm --name cursoseadgratuitos-app cursoseadgratuitos
//coloca tag na imagem gerada
docker tag 59658a8921df aleksvp/cursoseadgratuitos:secondtry
//loga do docker hub
docker login --username=aleksvp
//atualizar imagem lá
docker push aleksvp/cursoseadgratuitos
//subir bd fake
json-server --watch db.json 
//subir o backend
nodemon app.js
-->