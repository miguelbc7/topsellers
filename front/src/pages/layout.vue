<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg" type="dark" >
        <b-container >
          <b-navbar-brand>
            <img :src="require('../assets/logo.png')" alt="IMAGEN" width="120">
          </b-navbar-brand>
          <b-navbar-brand>
            <b-icon icon="bell-fill"></b-icon>
          </b-navbar-brand>  
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <!-- <b-nav-item href="#">Upcoming Stores</b-nav-item> 
              <b-nav-item href="#">TA Coverage</b-nav-item>  
              <b-nav-item href="#">Support</b-nav-item> -->

              <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template #button-content>
                  Profile
                </template>
                <b-dropdown-item href="#" @click.passive="logout">logout</b-dropdown-item>
                <!-- <b-dropdown-item href="#">2</b-dropdown-item> -->
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
      <!--2-->
      <b-navbar toggleable="lg" type="dark" variant="light" class="mainnav mb-5">
        <b-container >
          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#" :to="{name:'sellers'}" class="c">Top Rated Sellers</b-nav-item>
              <b-nav-item href="#" :to="{name:'products'}" class="d">Top Product Sellers</b-nav-item>
              <b-nav-item href="#" :to="{name:'users'}" class="d">User List</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <!-- <b-nav-form>
                <b-input-group size="sm" class="mb-2">
                <b-input-group-prepend is-text>
                  <b-icon icon="search"></b-icon>
                </b-input-group-prepend>
                  <b-form-input type="search" placeholder="Search" size="lg"></b-form-input>
                </b-input-group>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
              </b-nav-form> -->
            </b-navbar-nav>
          </b-collapse>
        </b-container>
      </b-navbar>
    </div>
    <router-view/>
  </div>
</template>
<script>
  export default {
    methods:{
      logout(){
        localStorage.removeItem('token')
        this.$router.push({name:'login'})
      }
    }
  }
</script>

<style type="text/css">
  .bg-info {
    background-color:#ffffff!important;
  }
  .ml-auto{
    color:#fff!important;
    font-family: "Marker Felt";
  }
  /* .container{
    background-color: #ffffff!important;
  } */
  .b-table .my-left-border {
    border-left: 3px solid #000;
  }
  .navbar-nav .nav-item > a {
    color: #87a3bc !important;
    font-weight: 400;
  }
  .navbar-nav .nav-item > a:hover, .navbar-nav .nav-item > a:focus {
    color: #ffffff !important;
    background-color: #283846 !important;
  }
  .navbar{
    padding:0px!important;
    min-height: 60px;
    background-color: #2b3d4c !important;
    border-color: #2b3d4c !important;
  }
  .mainnav {
    position: relative;
    background-color: #ffffff;
    box-shadow: 1px 0 6px 0 rgba(0, 0, 0, 0.2);
  }
</style>