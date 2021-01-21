<template> 
  <div>  
    
    <div class="text-center p-4">
      <h4>Top Rated Sellers  <b-icon icon="question-circle-fill"></b-icon></h4>
      <b-card class="text-center">
        <!-- <b-navbar-nav class="ml-auto float-right">
            <b-nav-form>
              <b-input-group size="sm" class="mb-2">
              <b-input-group-prepend is-text>
                <b-icon icon="search"></b-icon>
              </b-input-group-prepend>
                <b-form-input type="search" placeholder="Search" size="lg" rigth></b-form-input>
              </b-input-group>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>
        </b-navbar-nav> -->
        <b-table :items="items" :fields="fields" responsive>
          <template #thead-top>
            <b-tr>
              <b-th colspan="8"></b-th>
              <b-th colspan="3">
                <small>
                  Rank Trend
                </small>  
              </b-th>
              <b-th colspan="2">
                <small>
                  Lifetime Feedback
                </small>  
              </b-th>
              <b-th colspan="2">
                <small>
                  Feedback 30d
                </small>  
              </b-th>
              <b-th colspan="2">
                <small>
                  Feedback 90d
                </small>  
              </b-th>
            </b-tr>
          </template>
          <template #cell(fba)>
            x
          </template>
          <template #cell(scrammer)>
            x
          </template>
          <template #cell(shipping)>
            x
          </template>
          <template #cell(product)>
            N/D
          </template>
          <template #cell(brand)>
            N/D
          </template>
          <template #cell(categories)>
            N/D
          </template>
          <template #cell(7d)>
            -
          </template>
          <template #cell(30d)>
            -
          </template>
          <template #cell(90d)>
            -
          </template>
        </b-table>
        <div class="float-right">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </div>
      </b-card>
    </div>
  </div>
</template>
<script>
import axios from '@/axios'
export default {
  name: 'Navbar',
  data() {
      return {
        rows:0,
        currentPage:1,
        perPage:100,
        // Note 'isActive' is left out and will not appear in the rendered table
        fields: [
          {
            key: 'ranking',
            label: 'Rank',
            sortable: true
          },
          {
            key: 'name',
            label: 'Storefront Name',
            sortable: false
          },
          {
            key: 'fba',
            label: 'FBA',
            sortable: true,
          },
          {
            key: 'scrammer',
            label: 'Scrammer',
            sortable: true,
          },
          {
            key: 'shipping',
            label: 'Shipping From China',
            sortable: true,
          },
          {
            key: 'product',
            label: 'Product',
            sortable: true,
          },
          {
            key: 'brand',
            label: 'Brand',
            sortable: true,
          },
          {
            key: 'categories',
            label: 'Categories',
            sortable: true,
          },
          {
            key: '7d',
            label: '7D',
            sortable: true,
          },
          {
            key: '30d',
            label: '30D',
            sortable: true,
          },
          {
            key: '90d',
            label: '90D',
            sortable: true,
          },
          {
            key: 'summary.count.vida',
            label: '#',
            sortable: true,
          },
          {
            key: 'summary.positive.vida',
            label: '+',
            sortable: true,
          },
          {
            key: 'summary.count.treinta',
            label: '#',
            sortable: true,
          },
          {
            key: 'summary.positive.treinta',
            label: '+',
            sortable: true,
          },
          {
            key: 'summary.count.noventa',
            label: '#',
            sortable: true,
          },
          {
            key: 'summary.positive.noventa',
            label: '+',
            sortable: true,
          },
        ],
        items: []
      }
    },
    watch:{
      currentPage(){
        console.log('pagina cambió:', this.currentPage)
        this.getSellers()
      }
    },
    methods:{
      getSellers() {
        axios.get('scrapper/sellers?page='+this.currentPage)
        .then(res=>{
          this.items = res.data.docs
          this.rows = res.data.totalDocs
          this.perPage = res.data.limit
        })
        .catch(err=>{
          console.log(err)
        })
      }
    },
    created() {
      this.getSellers()
    }
}
</script>

