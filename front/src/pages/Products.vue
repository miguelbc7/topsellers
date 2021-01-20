<template> 
  <div>  
    <div class="text-center p-4">
      <h4>Top Best Seller ASINs<b-icon icon="question-circle-fill"></b-icon></h4>
      <b-card class="text-center mt-4">
        <!-- <b-navbar-nav class="ml-auto float-center">
          <div>
            <b-button variant="outline-primary">Current Day</b-button>
            <b-button variant="outline-primary">30 Day Avg</b-button>
            <b-button variant="outline-primary">180 Day Avg</b-button>
          </div><br>
        </b-navbar-nav> -->
        <b-table :items="items" :fields="fields" responsive>
          <template #cell(scrammer)="data">
            <b-button size="sm" variant="primary" class="mx-2" @click="download(data.item._id)">Today Top 2K</b-button>
          </template>
        </b-table>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from '@/axios'
import moment from 'moment'
import XLSX from 'xlsx';
export default {
  name: 'Navbar',
  data() {
      return {
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'date',
            label: 'Update',
            sortable: true
          },
          {
            key: 'name',
            label: 'Country',
            sortable: false
          },
          {
            key: 'scrammer',
            label: '',
            sortable: true,
          },
        ],
        items: [ ]
      }
    },
    created() {
      this.getCategories()
    },
    methods:{
      getCategories () {
        axios.get('scrapper/categories')
        .then(res=>{
          this.items = res.data.map(item=>{
            return {
              ...item,
              date:moment(item.date).format('YYYY-MM-DD')
            }
          })
        })
        .catch(err=>{
          console.log(err)
        })
      },
      download(id){
        axios.get('scrapper/products/'+id)
        .then(res=>{
          let map = res.data.map(item => {
            return {
              ASIN: item.code
            }
          })
          let d = moment().format('YYYY-MM-DD HH:mm:ss')
          let filename= `products-${d}.csv`;
          var ws = XLSX.utils.json_to_sheet(map);
          var wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Products");
          XLSX.writeFile(wb,filename);
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
