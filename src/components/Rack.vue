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
                    color = "red lighten-2"
                ></v-date-picker>

                <v-btn dark color="red lighten-2" :disabled="searchDate" @click="scrollDate(picker)"> Search </v-btn>
            </v-dialog>
         </div>
        <div>

            <ejs-gantt v-if="dataState" ref='gantt' id="GanttContainer" :splitterSettings="splitterSettings" :allowResizing = 'false' :dataSource="finalReservations" :columns ="columns" :taskFields = "taskFields" :selectionSettings= "selectionSettings" :height = "height"></ejs-gantt>
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
        scrollDate: function(date) {
            this.$refs.gantt.scrollToDate(date);
            this.dialog = false;
        },
    },
    beforeCreate(){
		this.$store.dispatch('getRooms')
	},
    computed: {
        ...mapState(['finalReservations', 'dataState','reservationDate','borderDatesRack']),
    },

    data: function() {
        return{
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
            searchDate: false,
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
            },
            columns: [
                { field: 'TaskID', width: '100', headerText: 'Room Number', textAlign: 'center' },
            ],
            splitterSettings:{
                columnIndex: 1
          },
        };
    },
    watch: 
    {
        reservationDate: function()
        {
            this.scrollDate(this.reservationDate)
        },

        picker: function()
        {
            let pickerDate = new Date(this.picker)
            let initialDate = new Date(this.borderDatesRack.initialDate)
            let finalDate = new Date(this.borderDatesRack.finalDate)

            if( pickerDate < initialDate ||  pickerDate > finalDate)
            {
                let message = "That date isn't inside the Rack, please use dates between: "+ this.borderDatesRack.initialDate + " and " + this.borderDatesRack.finalDate
                this.searchDate = true
                alert(message)

            }

            else
            {
                this.searchDate = false
            }
        }
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

.e-resizable-split-bar
{
    visibility: hidden
}

</style>
