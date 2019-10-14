import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
Vue.use(Vuex, Axios)

export default new Vuex.Store({
	state: {
		reservations: [],
		createdReserve: false,
		finalReservations: [],
		dataState: false
	},
	mutations: {
		async getRooms(state){	
			try{
				await Axios 
				.get('http://192.241.158.156:8081/reservation/getAllWithDate')
				.then(response => (state.reservations = response.data));
		
				console.log('Habitaciones cargadas');
				console.log(state.reservations);

			}catch(err){console.log("En get all all " + err)}

			state.reservations.reservations.forEach(element => {
				element.StartDate = new Date();
                state.finalReservations.push(element)
			})
			state.dataState = true
		},
		changeReservationAlert(state) {
			state.createdReserve = !state.createdReserve;
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
		}
	}
})
