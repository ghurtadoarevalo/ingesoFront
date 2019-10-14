<template>
    <v-form @submit="onSubmit">
        <v-container>
            <v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.initialDate" label="Arrive date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.finalDate" label="Leave date" type="date" required></v-text-field>
                </v-col>

                <v-col>
                    <v-btn type="submit">Next</v-btn>
                </v-col>

            </v-col>
        </v-container>
    </v-form>
</template>

<script>
    import axios from 'axios'
    import store from '@/store';
    import {mapState, mapMutations} from "vuex";
    export default {
        data() {
            return {
                reservation: {
                    client: {

                    },
                    initialDate: '',
                    finalDate: '',
                    roomList: [{}]
                }
            }
        },
        methods: {
            ...mapMutations(['getRooms']),
            ...mapState(['roomList']),
            onSubmit() {
                let currentObject = this;
                let newReservation = {
                    client: {
                        name: '',
                        mail: '',
                        contact: '',
                        passport: ''
                    },
                    initialDate: this.reservation.initialDate,
                    finalDate: this.reservation.finalDate,
                    roomList2: [{}]
                }
                console.log(newReservation)
                axios.post('http://localhost:8080/room/getByDate', newReservation)
                    .then(function (response) {
                        currentObject.output = response.data;
                        this.getRooms({roomList: response.data})
                        console.log(this.roomList)
                    })
                    .catch(function (error) {
                        currentObject.output = error;
                    })
            }
        }
    }
</script>

<style scoped>

</style>