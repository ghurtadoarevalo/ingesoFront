<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="">
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>


      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
          fluid
      >
        <v-alert type="success" v-model="createdReserve" style="opacity: 0.85;">
          <v-row align="center">
          <v-col class="grow"> Reservation created succesfully.</v-col>
          <v-col class="shrink" style="opacity: 0.5" >
            <v-btn class="mx-2" fab dark small color="black" @click="changeReservationAlert" >X</v-btn>
          </v-col>
          </v-row>
        </v-alert>
        <ReservationForm style="margin-left: 80%; margin-bottom: -45px"/>
        <Rack/>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>

import Rack from '../components/Rack'
import ReservationForm from '../components/ReservationForm'
import { mapState, mapMutations } from 'vuex'

  export default {
    components: {
      Rack,
        ReservationForm
    },
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
      computed:
          {
              ...mapState(['createdReserve'])
          },
      methods:
          {
              ...mapMutations(['changeReservationAlert'])
          }
  }

</script>