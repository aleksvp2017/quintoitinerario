<template>
        <v-app-bar app color="primary" dark>
            <v-toolbar-title></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn text rounded v-for="(link, index) in links" :key="index"
                :to="link.path"
                v-show="(!link.requireAuth && !loggedIn) || (loggedIn && link.requireAuth) || link.alwaysShow"> {{link.name}} </v-btn>
            <v-btn text rounded @click="logout" v-show="loggedIn">Logout</v-btn>
        </v-app-bar>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { routes } from '../routes.js'

    export default {
        computed: {
            links (){
                return routes.filter(route => route.menuItem)
            },
            ...
            mapGetters(['loggedIn'])
        },
        methods: {
            logout(){
                console.log('fazendo logout')
                this.$store.dispatch('ActionLogout')
            }
        }
    }
</script>

<style scoped>

</style>