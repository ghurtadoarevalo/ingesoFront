<template>
 
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="/">miTingeso 2019</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!--<b-navbar-nav>
        <b-nav-item href="/">Inicio</b-nav-item>
      </b-navbar-nav>
        -->
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{name:'home'}">Registrar</b-nav-item>
        <b-nav-item :to="{name:'about'}">Buscar</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>

</template>