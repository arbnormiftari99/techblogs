<template>
    <div>
        <my-table :rows="contentData" :headers="['ID','First Name','Email','LastName','Role','Username']" :selectedCells="selectedCells" :showButton="true" :buttonFunction="this.log"/>
    </div>
</template>
  
<script>
import MyTable from '../components/Table.vue'

export default {
    components: {
        MyTable
    },
    data() {
        return {
            
        }
    },
    computed: {
        selectedCells() {
            return new Set(["id","firstName", "email", "lastName", "role","username"])
        },
        contentData() {
            return this.$store.state.usersList.filter(user => user.role==='USER');
        },
    },
    created() {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        if(user){
            this.$store.dispatch("GetUsers", {token: user.token})
        }
    }
}
</script>
  