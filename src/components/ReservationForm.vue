<template>
    <v-form @submit="onSubmit">
        <input required>
        <v-container>
            <v-col align="center">
                <v-col cols="12" md="4">
                <h1>Create Reservation</h1>
                <hr>
            </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.client.name"
                                  label="First name"
                                  @change="checkName(reservation.client.name)"
                                  placeholder="Bryan"
                                  required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.client.mail"
                                  label="E-mail"
                                  @change="checkMail(reservation.client.mail)"
                                  placeholder="example@example.com"
                                  required></v-text-field>
                </v-col>

                <v-col cols="12" md = "4">
                    <v-text-field
                            v-model="reservation.client.contact"
                            label="Contact"
                            @change="checkNumber(reservation.client.contact)"
                            placeholder="+56968307895"
                            required></v-text-field>
                </v-col>

                <v-col cols="12" md = "4">
                    <v-text-field v-model="reservation.client.passport"
                                  @change="checkPassport(reservation.client.passport)"
                                  label="Passport"
                                  placeholder="M0993353"
                                  required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.initialDate" label="Arrive date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="reservation.finalDate" @change="getRoomsByDate" label="Leave date" type="date" required></v-text-field>
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
                roomNumbers: '',
                validator: false
            }
        },
        methods: {
            getRoomsByDate() {
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
                axios.post('http://192.241.158.156:8081/room/getByDate', newReservation)
                    .then((res) => {
                        let roomListAux = res.data.roomList;
                        let aux = [];
                        var ids = [];
                        for(let i = 0; i < roomListAux.length; i++) {
                            aux.push(roomListAux[i].roomNumber);
                            ids.push(roomListAux[i].roomId);
                        }
                        this.rooms = aux;
                        this.roomIds = ids;
                    })
            },

            onSubmit() {
                if(this.reservation.client.name === '') {
                    alert('Please, enter your name')
                    return;
                }
                if(this.reservation.client.mail === '') {
                    alert('Please, enter your mail')
                    return;
                }
                if(this.reservation.client.passport === '') {
                    alert('Please, enter your passport')
                    return;
                }
                if(this.reservation.client.contact === '') {
                    alert('Please, enter your phone number')
                    return;
                }
                if(this.reservation.initialDate === ''){
                    alert('Please, enter initial date');
                    return;
                }
                if(this.reservation.finalDate === '') {
                    alert('Please, enter final date');
                    return;
                }
                if(this.roomNumber === '') {
                    alert('Please, enter a room number');
                    return;
                }
                if(this.reservation.initialDate > this.reservation.finalDate) {
                    alert('Please, enter valid dates');
                    return;
                }
                if(this.validator) {
                    alert('Please, check that all fills are correctly');
                    return;
                }
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
                };
                axios.post('http://192.241.158.156:8081/reservation/create', newReservation)
                    .then(function (response) {
                        console.log('Tudu bem')
                        currentObject.output = response.data;
                    })
                    .catch(function (error) {
                        alert('Please, fill all spaces');
                        currentObject.output = error;
                });
            },

            checkPassport(advalue) {
                var patt = new RegExp("^([A-Z a-z]){1}([0-9]){7}$");
                if (patt.test(advalue)) {
                    this.validator = false;
                }
                else {
                    this.validator = true;
                    alert("Passport is not valid");
                }
            },

            checkMail(mail) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(mail)) {
                    this.validator = false;
                }
                else {
                    this.validator = true;
                    alert('Mail is not valid');
                }
            },

            checkName(name) {
                var regName = /^[a-zA-Z]/;
                if(regName.test(name)){
                    this.validator = false;
                }else{
                    this.validator = true;
                    alert('Name is not valid')
                }
            },

            checkNumber(number) {
                var nm = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                
                if(nm.test(number)) {
                    this.validator = false;
                }
                else {
                    this.validator = true;
                    alert('Number not valid')
                }
            }
        },

        created () {
        }
    }
</script>

<style scoped>
    .required label::after {
        content: "*";
    }
</style>