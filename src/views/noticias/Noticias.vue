<template>
    <div>
        <ul>
            <li v-for="(noticia, index) in noticias" :key="index" >
                {{noticia.titulo}} 
                <p>
                    {{noticia.conteudo}} 
                </p>
            </li>
        </ul>
        <p style="color: red; height: absolut;" >
            {{ mensageDeErro }}
        </p>
    </div>
</template>

<script>
    import {listarNoticias} from "../../services/Noticias.js"

    export default {
        data() {
            return {
                noticias: [],
                mensageDeErro: ''
            }
        },
        created () {
            this.atualizarNoticias();
        },
        methods: {
            atualizarNoticias() {
                console.log('atualizando noticias')
                listarNoticias().then((response) => {
                        this.noticias = response.data.noticias
                        console.log('noticias: ', this.noticias)
                    }).catch((error) => {
                        this.mensageDeErro = error.body
                        console.log('erro: ', error)
                    })
            }
        }
    }
</script>

<style  scoped>

</style>