<template>
    <v-container>
        <v-row>
            <v-col>
                <v-form>
                    <v-text-field 
                    label="Nome"
                    v-model="usuario.nome"
                    type="text"/>
                    <v-file-input label="Foto"/>
                    <v-autocomplete
                        :items="ufs"
                        v-model="usuario.uf"
                        label="UF"/>
                    <!--<v-text-field label="Data de nascimento" v-model="usuario.datanascimento" readonly="true"/>
                    <v-date-picker v-model="usuario.datanascimento" locale="pt-br"/>-->
                    <v-text-field 
                    label="E-mail"
                    v-model="usuario.email"
                    type="email"
                    />
                    <v-text-field 
                    :type="showPassword ? 'text' : 'password'" 
                    label="Senha"
                    v-model="usuario.senha"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"/>
                    <v-checkbox label="Concordo com os termos e condições"/>
                    <v-btn color="primary" @click="registrarUsuario">Enviar</v-btn>
                </v-form>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {listarUfs} from '../../services/Geo.js'
    import {registrar} from '../../services/Registrar'

    export default {
        data(){
            return {
                showPassword: false,
                usuario: {}
            }
        },
        asyncComputed: {
            ufs(){
                return obterUfs()
            }
        },
        methods: {
            registrarUsuario(){
                console.log('Registrando usuario', this.usuario)
                registrar(this.usuario).then((response) => {
                    console.log(response)
                }).catch(error => {
                    console.log(error)
                })
            }
        }
    }

    function obterUfs(){
        return listarUfs()
    }    
</script>

<style>

</style>