<template>
    <div class="vue-template">
        <div>
        <b-navbar toggleable="lg" type="dark" >
          <b-container >
            <b-navbar-brand>
              <img :src="require('../assets/logo.png')" alt="IMAGEN" width="120">
            </b-navbar-brand>
          </b-container>
        </b-navbar>
      </div>
        <div class="container mt-5">
            <div class="row">
              <div class="col-md-5 mx-auto">
                <div class="card card-body">
                  <form @submit.prevent="submit">
                    <div class="text-center">
                      <h3 class="mb-0 pb-3">Welcome to TacticalBucket</h3>
                      <h6 class="mt-0 pt-0 pb-3">Please sign in to get access.</h6>
                    </div>
                      <div class="form-group px-4">
                          <input v-model="user.email" type="email" placeholder="Email" required class="form-control" />
                      </div>
                      <div class="form-group px-4">
                          <input v-model="user.password" type="password" required placeholder="Password" minlength="6" class="form-control" />
                      </div>
                      <div class="form-group text-center" v-if="error">
                          <label style="color:red;font-size:14px;">Invalid email or password</label>
                      </div>
                      <div class="px-4">
                        <b-button type="submit" variant="danger" class="btn-lg btn-block">Signin</b-button>
                      </div>
                  </form>
                </div>
              </div>    
            </div>   
        </div>    
    </div>
</template>

<script>
import axios from '@/axios'
export default {
  data() {
    return {
      error:false,
      user:{
        email:'',
        password:''
      }
    }
  },
  methods:{
    submit() {
      axios.post('users/login',this.user)
      .then(res=>{
        this.error = false
        localStorage.setItem('token',res.data.token)
        this.$router.push({name:'sellers'})
      })
      .catch(err=>{
        this.error = true
        console.log(err)
      })
    }
  }
}
</script>
<style type="text/css">
h3{
  color: #000;
  padding-bottom: 2rem;
  font-weight: bold;
}

</style>