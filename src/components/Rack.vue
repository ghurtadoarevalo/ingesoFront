<template>
    <div id='app'>
        <div id='container'>
            <ejs-schedule ></ejs-schedule>
        </div>
    </div>
</template>
<script>
import { SchedulePlugin, Day, Week, WorkWeek, Month, Agenda } from '@syncfusion/ej2-vue-schedule';

import Vue from 'vue';

Vue.use(SchedulePlugin);

  export default {
      data () {
          return {
              selectedDate: new Date(2018, 1, 15),
              //eventSettings: { dataSource: scheduleData },
              timeScale: {enable: true, slotCount: 5},
              showWeekend: false
          }
      },
      provide: {
          schedule: [Day, Week]
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
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-vue-schedule/styles/material.css';
</style>