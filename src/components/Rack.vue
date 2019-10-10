<template>
     <div>
        <ejs-gantt ref='gantt' id="GanttContainer" :dataSource="data" :taskFields = "taskFields" :height = "height"></ejs-gantt>
    </div>
</template>
<script>
import Vue from "vue";
import { GanttPlugin } from "@syncfusion/ej2-vue-gantt";
Vue.use(GanttPlugin);
export default {
  data: function() {
      return{
        data: [
        {
            TaskID: 1,
            TaskName: 'Floor',
            StartDate: new Date('04/02/2019'),
            subtasks: 
            [
                {   TaskID: 1, TaskName: 'Room', Duration: 0, Progress: 0,
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
                        },
                        {
                            'date': '04/01/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Matias Coronado'
                        },
                        {
                            'date': '04/02/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Matias Coronado'
                        },
                        {
                            'date': '04/25/2025',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Matias Coronado'
                        }
                    ],
                },
                {   TaskID: 2, TaskName: 'Room', Duration: 0, Progress: 0,
                    Indicators: [
                        {
                            'date': '04/08/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Pedro Picapiedra'
                        },
                        {
                            'date': '04/10/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Pedro Picapiedra'
                        },
                        {
                            'date': '04/9/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Pedro Picapiedra'
                        }
                    ],
                }
            ],
        },
        {
            TaskID: 2,
            TaskName: 'Floor',
            StartDate: new Date('04/02/2019'),
            subtasks: 
            [
                {   TaskID: 1, TaskName: 'Room', Duration: 0, Progress: 0,
                    Indicators: [
                        {
                            'date': '03/08/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Juanito Perez'
                        },
                        {
                            'date': '03/09/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Follow up'
                        }
                    ],
                },
                {   TaskID: 2, TaskName: 'Room', Duration: 0, Progress: 0,
                    Indicators: [
                        {
                            'date': '04/01/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Pedro Picapiedra'
                        },
                        {
                            'date': '04/02/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Pedro Picapiedra'
                        },
                        {
                            'date': '04/03/2019',
                            'iconClass': "Reservado",
                            'name': '<span style="color:red; margin-left:10px"> R </span>',
                            'tooltip': 'Pedro Picapiedra'
                        }
                    ],
                }
            ],
        },
    ],
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
};
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
