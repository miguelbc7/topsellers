<template>
    <div class="vue-template">
        <div class="container">
            <div class="row">
              <div class="col-md-6 mx-auto">
                <div class="card card-body">
                  <form @submit.prevent="submit">
                      <h3 class="text-center">User {{title}}</h3>
                      <div class="row">
                        <div class="col-6">
                            <label>Name: </label>
                            <input v-model="user.name" minlength="3" required type="name" class="form-control" />
                        </div>
                        <div class="col-6">
                            <label>Email: </label>
                            <input v-model="user.email" type="email" required class="form-control" />
                        </div>

                      </div>
                      <div class="form-group">
                          <label>Password</label>
                          <input v-model="user.password" minlength="6" required type="password" class="form-control" />
                      </div>
                      <div class="form-group">
                          <label>Repeat Password</label>
                          <input v-model="user.password2" minlength="6" required type="password" class="form-control" />
                      </div>
                      <div class="form-group text-center" v-if="error">
                          <label style="color:red;font-size:14px;">Passwords must match</label>
                      </div>
                      <p class="text-center">
                        <b-button type="reset" @click="reset" variant="outline-danger" class="button1 mr-2">Cancelar</b-button>
                        <b-button type="submit" class="button2" >Enviar</b-button>
                      </p>  
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
      title:'Register',
      user:{
        name:'',
        password:'',
        password2:'',
        email:''
      },
      error:false
    }
  },
  created (){
    let id = this.$route.params.id
    if(id){
      this.getUser(id)
      this.title = 'Update'
    }
  },
  methods:{
    getUser(id){
      axios.get('users/'+id)
      .then(res=>{
        this.user.name = res.data.name
        this.user.email = res.data.email
      })
      .catch(err=>{
        console.log(err)
      })
    },
    submit(){
      if(this.validation()){
        let url;
        let id = this.$route.params.id
        this.error = false
        if(id){
          url = 'users/update/'+id
        }else{
          url = 'users/register'
        }
        axios.post(url,this.user)
        .then(res=>{
          console.log(res)
          this.$router.push({name:'users'})
        })
        .catch(err=>{
          console.log(err)
        })
      }else{
        this.error = true
      }
    },
    validation(){
      if(this.user.password != this.user.password2){
        return false
      }else{
        return true
      }
    },
    reset(){
      this.user.name = ''
      this.user.email = ''
      this.user.password = ''
      this.user.password2 = ''
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
.button1{
  background-color: #6c757d;
}
.button2{
  background-color: #2b3d4c;
}

</style>