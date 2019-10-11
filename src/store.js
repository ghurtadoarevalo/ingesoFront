import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		reservation: [
			{
				TaskID: 0,
				TaskName: 'Room',
				StartDate: new Date('04/02/2019'),
				Indicators: [
					{
						date: '' ,
						iconClass: 'Reservado',
						name: '',
						tooltip: ''
					}
				]		
			}]		
	},
	mutations: {

	},
	actions: {

	}
})
