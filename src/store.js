import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios';
Vue.use(Vuex, Axios)

export default new Vuex.Store({
	state: {
		rooms: [],
		reservations: [],
		finalReservations: []

	},
	mutations: {
		async getRooms(state){	
			try{

				await Axios 
				.get('http://localhost:8080/room/rooms')
				.then(response => (state.rooms = response.data));
		
				console.log('Habitaciones cargadas');
				console.log(state.rooms);

			}catch(err){console.log("En get all all " + err)}

			try{
				await Axios 
				.get('http://localhost:8080/reservation/reservationsDates')
				.then(response => (state.reservations = response.data));
		
				console.log('Reservas cargadas');
				console.log(state.reservations);

			}catch(err){console.log("En get all all " + err)}

			let reservations = []
			
			state.rooms.forEach(element => {
				let reservation = 
				{
					TaskID : element.roomNumber,
					TaskName : "Room",
					StartDate : new Date(),
					Indicators: [],
				}

				reservations.push(reservation)
			});

		},
		getReservationsRooms(state)
		{


			//state.reservations.forEach(initialReservations => {

			//	reservations.forEach(backReservations => {
			//		if(reservation.roomList.includes(reservation.TaskID) ) 
			//		{

			//		}
		//		});
				
		//		}
			//)
		}
	},
	actions: {
		getRooms (context)
		{
			context.commit('getRooms')
		},
	}
})
