<template>
     <div>
         <div class="mb-5 mt-2">
            <v-dialog
            v-model="dialog"
            width="400"
            >
                <template v-slot:activator="{ on }">
                    <v-btn
                    color="red lighten-2"
                    dark
                    v-on="on"
                    >
                    Search Date
                    </v-btn>
                </template>

                <v-date-picker
                    v-model="picker"
                    :landscape="landscape"
                    :reactive="reactive"
                    :full-width="fullWidth"
                    :show-current="showCurrent"
                    :type="month ? 'month' : 'date'"
                    :multiple="multiple"
                    :readonly="readonly"
                    :disabled="disabled"
                    :events="enableEvents ? functionEvents : null"
                ></v-date-picker>

                <v-btn dark color="primary" @click="scrollDate"> Search </v-btn>
            </v-dialog>
         </div>
        <div>

            <ejs-gantt v-if="dataState" ref='gantt' id="GanttContainer" :dataSource="finalReservations" :taskFields = "taskFields" :selectionSettings= "selectionSettings" :height = "height"></ejs-gantt>
        </div>

     </div>


</template>
<script>
import Vue from "vue";
import { GanttPlugin } from "@syncfusion/ej2-vue-gantt";
import { mapState,mapMutations, Store } from 'vuex';

Vue.use(GanttPlugin);
export default {
    methods:
    {
        scrollDate: function() {
            this.$refs.gantt.scrollToDate(this.picker);
            this.dialog = false;
        },
    },
    beforeCreate(){
		this.$store.dispatch('getRooms')
	},
    sumar(){
      this.porcentaje = this.porcentaje + 100
    },
    computed: {
        ...mapState(['finalReservations', 'dataState']),
        test()
        {
            return this.showData = true
        }

    },

    data: function() {
        return{
            showData: false,
            reservations:
                [{
                    TaskName: 'Room',
                    TaskID: 1,
                    StartDate: new Date('04/02/2019'),
                    Indicators: [
                        {
                            'date': '04/08/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Juanito Perez'
                        },
                        {
                            'date': '04/09/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Juanito Perez'
                        }]
                }],
            picker: new Date().toISOString().substr(0, 10),
            landscape: false,
            reactive: false,
            fullWidth: false,
            showCurrent: true,
            month: false,
            multiple: false,
            readonly: false,
            disabled: false,
            enableEvents: false,
            dialog: false,
            selectionSettings: {
                mode: 'Both',
            },
            height:'auto',
            weight:'auto',
            taskFields: {
                id: 'TaskID',
                name: 'TaskName',
                startDate: 'StartDate',
                resourceInfo: 'resources',
                duration: 'Duration',
                progress: 'Progress',
                dependency: 'Predecessor',
                child: 'subtasks',
                indicators: 'Indicators'
            }
        };
    }
}


</script>

<style>
@import '../../node_modules/@syncfusion/ej2-base/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-calendars/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css';  
@import '../../node_modules/@syncfusion/ej2-inputs/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-navigations/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-layouts/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-grids/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-richtexteditor/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-treegrid/styles/material.css';
@import "../../node_modules/@syncfusion/ej2-vue-gantt/styles/material.css";

.e-gantt .e-gantt-chart .e-taskbar-main-container 
{
    visibility: hidden
}


</style>
