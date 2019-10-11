<template>
    <v-form @submit="onSubmit" v-model="valid">
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
                    <v-text-field v-model="reservation.initialDate" label="Arrive date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.finalDate" label="Leave date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field label="Numero de habitaciones" type="number" min="1" v-model="roomNumber" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-select :items="rooms"></v-select>
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
                rooms: [{
                    name: 'suite'
                }],
                items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
                habitacion: ['101', '102', '103'],
                roomNumber: '1',
                ejemplo: 'hola'
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
        }
    }
</script>

<style scoped>

</style>