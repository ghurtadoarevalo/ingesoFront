<template>
    <v-form v-model="valid">
        <v-container>
            <v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="client.name" label="First name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="client.mail" label="E-mail" required></v-text-field>
                </v-col>

                <v-col cols="12" md = "4">
                    <v-text-field label="Contact" required></v-text-field>
                </v-col>

                <v-col cols="12" md = "4">
                    <v-text-field label="Passport" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field label="Numero de habitaciones" type="number" min="1" v-model="roomNumber" required></v-text-field>
                </v-col>

                <v-col class="d-flex" cols="12" md="4">
                    <v-select :items="rooms" label="Tipo de habitacion"></v-select>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field label="Arrive date" type="date" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field label="Leave date" type="date" required></v-text-field>
                </v-col>
            </v-col>
        </v-container>
    </v-form>
</template>

<script>
    export default {
        data() {
            return {
                client: {
                    name: 'Matias',
                    mail: 'matias@usach.cl'
                },
                rooms: ['Suite', 'Estandar', 'Vip'],
                roomsList: [
                    {Tipo: 'Estandar', Precio: 20000},
                    {Tipo: 'Suite', Precio: 45000},
                    {Tipo: 'Vip', Precio: 100000}
                ],
                roomNumber: '1',
            }
        }
    }
</script>

<style scoped>

</style>