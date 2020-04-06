<template>
<v-card>
    <p style="color: red; height: absolut;" >
        {{ mensageDeErro }}
    </p>
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="busca"
        append-icon="mdi-magnify"
        label="Buscar uma notícia"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
        class="mt-10"
        :loading="loading"
      :headers="colunas"
      :items="noticiaisAdaptadas"
      hide-default-header
      show-expand
      :expanded.sync="linhasExpandidas"
      item-key="titulo"
      sort-by="dataPublicacao"
      :sort-desc="true"
      single-expand
      @click="marcarLidas"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-arrow-left',
        nextIcon: 'mdi-arrow-right'}"
      :search="busca">
        <template #item.titulo="{item}">{{item.dataPublicacao}} - {{item.titulo}}</template>
        <template #item.lida="{item}">
            <div class="green--text" v-show=item.lida icon="check">
                Lida
            </div>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
            <td :colspan="headers.length">{{ item.conteudo }}</td>
        </template>
    </v-data-table>
</v-card>
</template>

<script>
    import {listarNoticias, listarColunasNoticias} from "../../services/Noticias.js"
    import { routes } from '../../routes.js'

    export default {
        data() {
            return {
                //noticias: [],
                mensageDeErro: '',
                busca: '',
                noticias: [],
                loading: true,
                linhasExpandidas: [],
                noticiasLidas: []
            }
        },
        created () {
            this.atualizarNoticias();
        },
        asyncComputed: {
            /*async noticias(){
                return await obterNoticias()
            }*/
        },
        computed: {
            colunas(){
                return listarColunasNoticias()
            },
            noticiaisAdaptadas(){
                if (this.noticias){
                    return this.noticias.map( (noticia) => {
                        let lida = false
                        let noticiasExpandidas = this.linhasExpandidas.filter((linha => linha.titulo === noticia.titulo))
                        if (noticiasExpandidas.length > 0){
                            this.noticiasLidas.push(noticia)
                        }
                        else{
                            noticiasExpandidas = this.noticiasLidas.filter((linha) => linha.titulo == noticia.titulo)
                        }
                        return {...noticia, lida: noticiasExpandidas.length > 0}
                    })
                }
                else{
                    return this.noticias
                }
            }
        },
        methods: {
            atualizarNoticias() {
                console.log('atualizando noticias')
                listarNoticias().then((response) => {
                        this.noticias = response.data.noticias
                        this.loading = false
                        //console.log('noticias: ', this.noticias)
                    }).catch((error) => {
                        this.loading = false
                        this.mensageDeErro = error.body
                        if (this.mensageDeErro === 'invalid_token'){
                            //this.$router.push(obterRota('Entrar'))
                            this.$store.dispatch('ActionLogout')
                        }
                        //console.log('erro: ', error)
                    })
            },
            marcarLidas(){
                console.log('Marcar lidas', this.linhasExpandidas)
            }
        }
    }

    /*function obterNoticias(){
         listarNoticias().then(async (response) => {
                        var noticias = response.data.noticias
                        console.log('noticias: ', noticias)
                        this.noticias
                        this.loading = false
                        //return await noticias
                    }).catch((error) => {
                        this.mensageDeErro = error.body
                        console.log('erro: ', error)
                    })
    }*/
    function obterRota(nome){
        return routes.filter(router => router.name == nome)[0]
    }
</script>

<style  scoped>

</style>