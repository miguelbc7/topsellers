<template> 
  <div>  
    <div class="text-center p-4">
      <h4>User list</h4>
      <div class="text-right p-2">
        <b-button size="sm" class="my-2 my-sm-0" :to="{name:'user-register'}">Register</b-button>
      </div>
      <b-card class="text-center">
        <b-table :items="items" :fields="fields" responsive>
          <template #cell(id)="data">
            <b-button size="sm" class="mx-2" :to="{name:'user-edit',params:{id:data.item._id}}">Edit</b-button>
            <b-button size="sm" variant="danger" @click="deleteConfirm(data.item._id)">Delete</b-button>
          </template>
        </b-table>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from '@/axios'
import moment from 'moment'
export default {
  name: 'Navbar',
  data() {
      return {
        fields: [
          {
            key: 'name',
            label: 'Name',
            sortable: true
          },
          {
            key: 'email',
            label: 'Email',
            sortable: false
          },
          {
            key: 'date',
            label: 'Created at',
            sortable: true,
          },
          {
            key:'id',
            label: 'Actions'
          }
        ],
        items: [
          
        ]
      }
    },
    created() {
     this.getUsers()
    },
    methods:{
      getUsers (){
        axios.get('users')
        .then(res=>{
          this.items = res.data.map(item=>{
            return{
              ...item,
              date:moment(item.date).format('YYYY-MM-DD HH:mm:ss')
            }
          })
        })
        .catch(err=>{
          console.log(err)
        })
      },
      deleteConfirm (id){
        if(confirm('Are you sure to delete the record?')){
          this.removeUser(id)
        }
      },
      removeUser(id){
        console.log('se eliminará',id)
        axios.delete('users/delete/'+id)
        .then(()=>{
          alert('User deleted')
          this.getUsers()
        })
        .catch(err=>{
          console.log(err)
        })
      }
    }
}
</script>
<style type="text/css">
  /* .navbar-dark .navbar-nav .nav-link {
    color:#000!important;
    font-family: "Marker Felt";

  }
  .navbar-dark .navbar-nav .nav-link {
    color:#000!important;
    font-family: "Marker Felt";

  } */
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
