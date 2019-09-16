<template>
  <div class="mt-5">
    <b-container >
      <b-card  class="col-md-12" align-self="center" bg-variant="light">

        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
          

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
      
          let allStudents
          await axios.get('http://192.241.158.156:8081/student/{id}')
          .then(res=>{
            this.allStudents = res.data.map(item => item);

            allStudents.forEach(student => {
              this.students.push(student.name,student.rut,student.birthDate );
            })
          })
         
        
        .catch(function (error) {
            console.log(error);
          })
      },

      onSubmit(evt) {
        evt.preventDefault()
        alert(JSON.stringify(this.form))
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