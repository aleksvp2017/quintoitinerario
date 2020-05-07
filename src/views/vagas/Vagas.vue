<template>
<v-card>
    <v-alert :type="tipoAlertaGeral" dense text dismissible v-model="mostrarAlertaGeral">
        {{alertaGeral}}
    </v-alert> 
    <v-form>
    <v-file-input  
                    v-model="fileuploaded"
                    label="Escolha a planilha a ser importada"></v-file-input>
    <v-btn color="success" @click="uploadFile()">Enviar</v-btn>
    </v-form>
</v-card>
</template>

<script>
import {importar} from '../../services/Vagas.js'

export default {
    data() {
        return {
            fileuploaded: null,
            mostrarAlertaGeral: false,
            alertaGeral: '',
            tipoAlertaGeral: 'success'   
        }
    },
    methods: {
        uploadFile(){
            if (!this.fileuploaded){
                alerta(this, true, 'Selecione um arquivo', 'info')
                return
            }
            importar(this.fileuploaded).then((response) => {
                    alerta(this, true, response.body.message, 'success')
            }).catch((error) => {
                console.log(error)
                alerta(this, true, error.body.error, 'error')
            })
        }
    },
}

function alerta(owner, mostrarMensagem, mensagem, tipo){
    owner.mostrarAlertaGeral = mostrarMensagem
    owner.alertaGeral = mensagem
    owner.tipoAlertaGeral = tipo
}
</script>