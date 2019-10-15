import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
Vue.use(Vuex, Axios)

export default new Vuex.Store({
	state: {
		reservations: [],
		createdReserve: false,
		finalReservations: [],
		dataState: false,
		reservationDate: '',
		borderDatesRack: ''

	},
	mutations: {
		async getRooms(state){	
			try{
				await Axios 
				.get('http://192.241.158.156:8081/reservation/getAllWithDate')
				.then(response => (state.reservations = response.data));
			}catch(err){console.log("En get all all " + err)}

			try{
				await Axios 
				.get('http://192.241.158.156:8081/reservation/getInitialAndFinal')
				.then(response => (state.borderDatesRack = response.data));

			}catch(err){console.log("En get all all " + err)}
			
			state.finalReservations = []

			state.reservations.reservations.forEach(element => {
				element.StartDate = new Date();
                state.finalReservations.push(element)
			})
			state.dataState = true
		},
		changeReservationAlert(state) {
			state.createdReserve = !state.createdReserve;
		},
		changeDataState (state)
		{
			state.dataState = !state.dataState
		},
		goToReservationDate(state, date)
		{
			state.reservationDate = date
		}
	},
	actions: {
		getRooms (context)
		{
			context.commit('getRooms')
		},
        changeReservationAlert(context)
		{
			context.commit('changeReservationAlert')
		},
		changeDataState(context)
		{
			context.commit('changeDataState')
		},
	}
})
