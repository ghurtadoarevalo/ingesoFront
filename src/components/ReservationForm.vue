<template>
    <div class="text-center">
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <template v-slot:activator="{ on }">
                <v-btn
                        color="red lighten-2"
                        dark
                        v-on="on"
                >
                    Create Reservation
                </v-btn>
            </template>

            <v-card>
                <v-card-title
                        class="headline red lighten-2"
                        style="color:white"
                        primary-title
                >
                    Create Reservation
                </v-card-title>

                    <v-form>
                        <input required>
                        <v-container>
                            <v-col align="center">
                                <v-col cols="12" md="10">
                                    <v-text-field v-model="reservation.client.name"
                                                  label="First name"
                                                  @change="checkName(reservation.client.name)"
                                                  placeholder="Bryan"
                                                  required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="10">
                                    <v-text-field v-model="reservation.client.mail"
                                                  label="E-mail"
                                                  @change="checkMail(reservation.client.mail)"
                                                  placeholder="example@example.com"
                                                  required></v-text-field>
                                </v-col>

                                <v-col cols="12" md = "10">
                                    <v-text-field
                                            v-model="reservation.client.contact"
                                            label="Contact"
                                            @change="checkNumber(reservation.client.contact)"
                                            placeholder="+56968307895"
                                            required></v-text-field>
                                </v-col>

                                <v-col cols="12" md = "10">
                                    <v-text-field v-model="reservation.client.passport"
                                                  @change="checkPassport(reservation.client.passport)"
                                                  label="Passport"
                                                  placeholder="M0993353"
                                                  required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="10">
                                    <v-text-field v-model="reservation.initialDate" label="Arrive date" type="date" required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="10">
                                    <v-text-field v-model="reservation.finalDate" @change="getRoomsByDate" :disabled="finalDateState" label="Leave date" type="date" required></v-text-field>
                                </v-col>

                                <v-col cols="12" md="10" data-app>
                                    <v-select :items="rooms"
                                              v-model="roomNumber"
                                              item-value="roomIds"
                                              label="Choose Room"
                                              no-data-text="Loading rooms..."
                                    ></v-select>
                                </v-col>

                                    <v-alert v-if="roomAdded" type="success" style="opacity: 0.7;" transition="fade-transition">
                                        Room Added
                                    </v-alert>

                                <v-col>
                                    <v-btn color="red lighten-2" style="color: white" small @click="addRoom">Add Another Room</v-btn>
                                </v-col>


                            </v-col>
                        </v-container>
                    </v-form>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="red lighten-2"
                            text
                            @click="onSubmit()"
                    >
                        Create Reservation
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>




</template>

<script>
    import axios from 'axios'
    import { mapMutations, mapState } from 'vuex'

    export default {
        data() {
            return {
                dialog: false,
                roomAdded: false,
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
                roomType: '',
                rooms: [],
                roomIds: [],
                roomId: '',
                roomNumber: '',
                roomNumbers: '',
                validator: false,
                initialDateReservation: '',
                finalDateState: true,
                finalDateAlert: false
            }
        },
        methods: {
            ...mapMutations(['changeReservationAlert','changeDataState','goToReservationDate']),
            getRoomsByDate() {
                if(this.finalDateAlert == true)
                {
                    this.finalDateAlert = false
                }

                else
                {
                    let newReservation = {
                        client: {
                            name: this.reservation.client.name,
                            mail: this.reservation.client.mail,
                            contact: this.reservation.client.contact,
                            passport: this.reservation.client.passport
                        },
                        initialDate: this.reservation.initialDate,
                        finalDate: this.reservation.finalDate,
                        roomLfinalDateAlertist: [{}]
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
                }

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
                if(this.reservation.initialDate < this.isToday()) {
                    alert('Please, enter valid initial date');
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
                this.dialog = false;


                this.initialDateReservation = this.reservation.initialDate
            
                this.changeReservationAlert();
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
            },
            isToday(){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();

                today = yyyy + '-' + mm + '-' + dd;
                return today;
            },

            addRoom() {
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
                if(this.reservation.initialDate < this.isToday()) {
                    alert('Please, enter valid initial date');
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
                        currentObject.output = response.data;
                    })
                    .catch(function (error) {
                        alert('Please, fill all spaces');
                        currentObject.output = error;
                    });

                this.reservation.initialDate = '';
                this.reservation.finalDate = '';
                this.roomNumber = '';

                this.roomAdded = true;

                const interval = setInterval(() => {
                    this.roomAdded = false;
                }, 2000);
            },

            wait(ms) {
                var start = new Date().getTime();
                var end = start;
                while (end < start + ms) {
                    end = new Date().getTime();
                }
            },
        },

        computed:
        {
            ...mapState(['dataState']),
            initialDate()
            {
                return this.reservation.initialDate
            },
            finalDate()
            {
                return this.reservation.finalDate
            }

        },
        watch:
        {
            dialog: function()
            {
               	this.$store.dispatch('getRooms')
            },

            initialDateReservation: function()
            {
                this.goToReservationDate(this.initialDateReservation)
            },

            initialDate()
            {

                if(this.reservation.initialDate != "")
                {
                    this.finalDateState = false
                }

                this.reservation.finalDate = this.reservation.initialDate

                
            },
            finalDate()
            {
                let finalDate = new Date(this.reservation.finalDate)
                let initialDate = new Date(this.reservation.initialDate)
                
                let difference = finalDate - initialDate
                let differenceInDay = difference/(1000 * 3600 * 24)
                
                if(differenceInDay > 45)
                {
                    alert("The difference between Arrive date and Leave date can't be higher than 45 days and you have " + differenceInDay + " days of difference")
                    this.reservation.finalDate = ''
                    this.finalDateAlert = true
                }

            }
            
        }
    }
</script>

<style scoped>
    .required label::after {
        content: "*";
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 1s;
    }

    .fade-leave {

    }

    .fade-leave-active {
        transition: opacity 1s;
        opacity: 0;
    }
</style>