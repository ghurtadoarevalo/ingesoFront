<template>
    <v-form @submit="onSubmit">
        <v-container>
            <v-col>
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
                    <v-text-field label="Numero de habitaciones" type="number" min="1" v-model="roomNumber" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-select :items="Habitaciones"></v-select>
                </v-col>

                <v-col>
                    <p>Choose room type</p>
                    <v-radio-group v-model="roomType" :mandatory="false">
                        <v-radio label="Estandar" value=0></v-radio>
                        <v-radio label="Suite" value=1></v-radio>
                        <v-radio label="Vip" value=2></v-radio>
                    </v-radio-group>
                </v-col>

                <hr>

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
                    roomList: [{}]
                },
                roomList: [{
                    name: 'suite'
                }],
                roomType: '',
                rooms: [],
                roomNumber: '1',
            }
        },
        methods: {
            onSubmit() {
                let currentObject = this;
                let newReservation = {
                    client: {
                        name: this.reservation.client.name,
                        mail: this.reservation.client.mail,
                        contact: this.reservation.client.contact,
                        passport: this.reservation.client.passport
                    },
                    initialDate: this.reservation.initialDate,
                    finalDate: this.reservation.finalDate,
                    roomList: [{}]
                }
                console.log(newReservation)
                axios.post('http://localhost:8080/reservation/create', newReservation)
                    .then(function (response) {
                        currentObject.output = response.data;
                    })
                    .catch(function (error) {
                        currentObject.output = error;
                });
            }
        },
        created () {
            axios.get('http://localhost:8080/room/rooms')
                .then((res) => {
                    console.log(res.data);
                    var aux = []
                    for(let i=0; i<res.data.length; i++){
                        aux.push(res.data[i].roomNumber)
                    }
                    console.log(aux);
                    this.rooms = aux;
                })
            console.log(this.rooms)
        }
    }
</script>

<style scoped>

</style>