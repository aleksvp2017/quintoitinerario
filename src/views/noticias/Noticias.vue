<template>
<v-card>
    <p style="color: red; height: absolut;" >
        {{ mensageDeErro }}
    </p>
    <v-alert :type="tipoAlertaGeral" dense text dismissible v-model="mostrarAlertaGeral">
        {{alertaGeral}}
    </v-alert>    
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
      :items="noticias"
      item-key="id"
      sort-by="datapublicacao"
      :sort-desc="true"
      :footer-props="{
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-arrow-left',
        nextIcon: 'mdi-arrow-right'}"
      :search="busca">

        <template v-slot:top>
        <v-toolbar flat color="white">
            <v-divider
            class="mx-4"
            inset
            vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="800px" height="1000px" scrollable>
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark class="mb-2" v-on="on" @click="initiateDialog">Adicionar</v-btn>

                </template>
                <v-card>
                    <v-card-title>
                    <span class="headline">{{tituloDialog}}</span>
                    </v-card-title>

                    <v-card-text>
                        <v-alert :type="tipoAlerta" dense text dismissible v-model="mostrarAlerta">
                            {{alerta}}
                        </v-alert>
                        <v-container>
                            <v-form ref="form">
                            <v-row>
                            <v-col>
                                <v-text-field v-model="editedItem.titulo" label="Título" :rules="regrasTitulo"></v-text-field>
                            </v-col>
                            </v-row>
                            <v-row>
                            <v-col>
                                <v-textarea v-model="editedItem.conteudo" label="Conteúdo" :rules="regrasConteudo"></v-textarea>
                            </v-col>
                            </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="fechar">Fechar</v-btn>
                    <v-btn color="blue darken-1" text @click="salvar">Salvar</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-toolbar>
        </template>
        <template #item.datapublicacao="{item}">
                {{item.datapublicacaoformatada}}
        </template>
        <template #item.actions="{item}">
            <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
    </v-data-table>
</v-card>
</template>

<script>
    import {listarNoticias, listarColunasNoticiasCrud, salvarNoticia, apagarNoticia} from "../../services/Noticias.js"
    import { routes } from '../../routes.js'
    import moment  from 'moment'

    export default {
        data() {
            return {
                dialog: false,
                mensageDeErro: '',
                busca: '',
                noticias: [],
                loading: true,
                linhasExpandidas: [],
                noticiasLidas: [],
                editedItem: {
                    noticiaid: null,
                    datapublicacao: '',
                    titulo: '',
                    conteudo: '',
                },
                regrasTitulo:[
                    valor => !!valor || 'Título deve ser preenchido'
                ],
                regrasConteudo:[
                    valor => !!valor || 'Conteúdo deve ser preenchido'
                ],
                mostrarAlerta: false,
                alerta: '',
                tipoAlerta: 'error',
                mostrarAlertaGeral: false,
                alertaGeral: '',
                tipoAlertaGeral: 'error'                
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
                return listarColunasNoticiasCrud()
            },
            tituloDialog (){
                return this.editedItem.noticiaid ? 'Editando notícia' : 'Nova notícia'
            }
        },
        methods: {
            initiateDialog(){
                if (this.$refs.form){
                    this.$refs.form.reset()
                }
                limparAlerta(this)
                this.editedItem = {
                    id: null,
                    datapublicacao: '',
                    titulo: '',
                    conteudo: '',
                }
            },
            atualizarNoticias() {
                listarNoticias().then((response) => {
                        this.noticias = response.data.noticias
                        this.noticias = this.noticias.map((noticia) => 
                            ({...noticia, datapublicacaoformatada: moment().format("DD/MM/YYYY")}))
                        this.loading = false
                    }).catch((error) => {
                        console.log('Deu erro ao atualizar noticias', error)
                        this.loading = false
                        this.mensageDeErro = error.body
                        if (this.mensageDeErro === 'invalid_token'){
                            this.$store.dispatch('ActionLogout')
                        }
                    })
            },
            editItem (item) {
                limparAlerta(this)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.noticias.indexOf(item)
                confirm('Tem certeza que deseja excluir essa notícia?') && 
                apagarNoticia(item).then((response) => {
                    this.alertaGeral = response.body.message
                    this.mostrarAlertaGeral = true
                    this.tipoAlertaGeral = 'success'    
                    let index = this.noticias.indexOf(item)
                    this.noticias.splice(index, 1)
                }).catch(error => {
                    this.alertaGeral = error.body.error
                    this.mostrarAlertaGeral = true
                    this.tipoAlertaGeral = 'error'
                })               
            },            
            fechar () {
                this.dialog = false
                this.editedItem = {
                    id: null,
                    datapublicacao: '',
                    titulo: '',
                    conteudo: '',
                }
            },
            salvar () {
                let formValid = this.$refs.form.validate()
                if (!formValid){ 
                    return
                }
                salvarNoticia(this.editedItem).then((response) => {
                    this.alerta = response.body.message
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'success'    
                    if (this.editedItem.noticiaid){
                        this.noticias = this.noticias.filter((noticia) => noticia.noticiaid != this.editedItem.noticiaid)
                        // let indexOf = -1
                        // this.noticias.map((item, index) => {
                        //     if (item.id == this.editedItem.id) {
                        //         indexOf = index
                        //     }
                        // })
                        // this.noticias.splice(indexOf, 1)
                    }
                    this.editedItem = response.body.noticia
                    this.noticias.push(this.editedItem)
                    console.log('Noticias depois do push', this.noticias)
                }).catch(error => {
                    this.alerta = error.body.error
                    this.mostrarAlerta = true
                    this.tipoAlerta = 'error'
                })               
            },
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
    function limparAlerta(owner){
        owner.alerta = ''
        owner.mostrarAlerta = false
    }
</script>

<style  scoped>

</style>