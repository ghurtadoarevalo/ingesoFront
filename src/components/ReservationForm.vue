<template>
    <v-form @submit="onSubmit">
        <v-container>
            <v-col align="center">
                <v-title>Create Reservation Form</v-title>
                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.client.name" label="First name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.client.mail" label="E-mail" required></v-text-field>
                </v-col>

                <v-col cols="12" md = "4">
                    <v-text-field v-model="reservation.client.contact" label="Contact" required></v-text-field>
                </v-col>

                <v-col cols="12" md = "4">
                    <v-text-field v-model="reservation.client.passport" label="Passport" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.initialDate" label="Arrive date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.finalDate" label="Leave date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4" data-app>
                    <v-select :items="rooms"
                              v-model="roomNumber"
                              item-value="roomIds"
                              ></v-select>
                </v-col>

                <v-col>
                    <v-btn type="submit">Create reservation</v-btn>
                </v-col>
            </v-col>
        </v-container>
    </v-form>
</template>

<script>
    import axios from 'axios'
    import {mapState, mapMutations} from "vuex";
    import store from '@/store';
    export default {
        data() {
            return {
                reservation: {
                    client: {
                        name: '',
                        mail: '',
                        contact: '',
                        passport: ''
                    },
                    initialDate: '',
                    finalDate: '',
                    roomList: [{
                        roomId: ''
                    }]
                },
                roomType: '',
                rooms: [],
                roomIds: [],
                roomId: '',
                roomNumber: '',
                roomNumbers: ''
            }
        },
        methods: {
            onSubmit() {
                let currentObject = this;
                let index = this.rooms.indexOf(this.roomNumber);
                let finalRoom = this.roomIds[index];
                let newReservation = {
                    client: {
                        name: this.reservation.client.name,
                        mail: this.reservation.client.mail,
                        contact: this.reservation.client.contact,
                        passport: this.reservation.client.passport
                    },
                    initialDate: this.reservation.initialDate,
                    finalDate: this.reservation.finalDate,
                    roomList: [{
                        roomId: finalRoom
                    }]
                }
                console.log(newReservation)
                axios.post('http://192.241.158.156:8081/reservation/create', newReservation)
                    .then(function (response) {
                        currentObject.output = response.data;
                    })
                    .catch(function (error) {
                        currentObject.output = error;
                });
            }
        },
        created () {
            axios.get('http://192.241.158.156:8081/room/rooms')
                .then((res) => {
                    console.log(res.data);
                    var aux = []
                    var ids = []
                    for(let i=0; i<res.data.length; i++){
                        aux.push(res.data[i].roomNumber)
                        ids.push(res.data[i].roomId)
                    }

                    console.log(aux);
                    this.rooms = aux;
                    this.roomIds = ids;
                })
            console.log(this.rooms)
        }
    }
</script>

<style scoped>

</style>