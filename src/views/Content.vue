<template>
    <div>
        <my-table :rows="contentData" :headers="['User ID','Operation','Date','Entity']" :selectedCells="selectedCells" />
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
            myData: [
                { name: 'John', age: 25, email: 'john@example.com', test: 'adsasd' },
                { name: 'Jane', age: 30, email: 'jane@example.com' },
                { name: 'Bob', age: 40, email: 'bob@example.com' }
            ]
        }
    },
    computed: {
        selectedCells() {
            return new Set(["userId", "operationType", "dateAdded", "entityType"])
        },
        contentData() {
            return this.$store.state.contentList;
        },
    },
    created() {
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        this.$store.dispatch("GetContent", user.token)
    }
}
</script>
  