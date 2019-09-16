<template>
  <div class="home">

    <RegisterStudentForm/>
  
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterStudentForm from '@/components/RegisterStudentForm.vue'

export default {
  name: 'home',
  components: {
    RegisterStudentForm
  }
}
</script>
