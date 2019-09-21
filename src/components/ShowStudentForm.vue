<template>
  <div class="mt-5">
    <b-container >
      <b-card  class="col-md-12" align-self="center" bg-variant="light">

        <b-form @submit="showStudents" @reset="onReset" v-if="show">
          

          <b-form-group id="input-group-4" label="Carreras:" label-for="input-4">
            <b-form-select
              id="input-4"
              v-model="form.career"
              :options="careers"
              required
            ></b-form-select>
          </b-form-group>


          <b-button type="submit" variant="primary">Buscar</b-button>
        </b-form>
      </b-card> 
        <b-card class="mt-3" header="Alumnos encontrados">
          <div>
            <b-table striped hover :items="students" :fields="fields"></b-table>
          </div>
      </b-card>
    </b-container> 
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        fields: ['Nombre','Rut','Fecha_de_nacimiento'],
        form: {
          career: null,
          checked: []
        },
        careers: [{ text: 'Selecciona una carrera', value: null }, 'Carrots', 'Beans', 'Tomatoes', 'Corn'],
        show: true,
        students: [
          {Nombre:'',Rut: '', Fecha_de_nacimiento: ''}
        ]
      }
    },
    methods: {

      async showCareers(){
        
          await axios.get('http://192.241.158.156:8081/career/getCareers')
          .then(res=>{
            this.careers = res.data.map(item => item.name)
          })
        
          .catch(function (error) {
            console.log(error);
          })
        
      },

      async showStudents(){
          this.students = []
          let allStudents = null
          let careerId = null
          await axios.get('http://192.241.158.156:8081/career/getCareers')
          .then(res=>{
            res.data.forEach(career => {
              if(career.name == this.form.career){
                careerId = career.careerId
              }
            });
          })
          .catch(function (error) {
            console.log(error);
          })
          
          await axios.get('http://192.241.158.156:8081/student/' + careerId)
          .then(res=>{
            allStudents = res.data.map(item => item);
           
            allStudents.forEach(student => {
              this.students.push({Nombre:student.name, Rut: student.rut, Fecha_de_nacimiento: student.birthDate })
               console.log(student.name)
              ;
            })
          })
         
        
        .catch(function (error) {
            console.log(error);
          })
      },

      onSubmit(evt) {
        evt.preventDefault()
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.food = null
        this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    },

    created(){
      this.showCareers()
    }
  }
</script>