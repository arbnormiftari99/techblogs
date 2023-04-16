<template>
    <div class="table-container">
        <table>
            <thead>
                <tr>
                    <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, rowIndex) in mappedRows" :key="rowIndex">
                    <td v-for="(cell, cellIndex) in row" :key="cellIndex">{{ cell }}</td>
                    <button v-if="showButton" @click="promote(row)">hi</button>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
export default {
    props: {
        rows: {
            type: Array,
            required: true
        },
        headers: {
            type: Array,
            default: () => []
        },
        selectedCells: {
            type: Set,
            required: true
        },
        showButton:{
            type: Boolean,
            required:false
        },
        buttonFunction:{
            type: Function,
            required: false
        }
    },
    methods: {
        //to filter a selected set of cells
        filterObj: (row, set) => {
            const keys = Object.keys(row);
            const filteredKeys = keys.filter((key) => set.has(key));
            const filteredObj = filteredKeys.reduce((obj, key) => {
                obj[key] = row[key];
                return obj;
            }, {});
            return filteredObj;
        },
        promote(row){
            const userString = localStorage.getItem("user");
            const user = JSON.parse(userString);
            this.$store.dispatch("PromoteUser",{
                userId: user?row.id:undefined,
                token: user?user.token:undefined,
            })
        }
    },
    computed: {
        // Map the JSON object keys to an array of values
        // This will be used to render the cells in the table
        mappedRows() {
            return this.rows.map(row => this.filterObj(row, this.selectedCells));
        }
    }
};
</script>

<style>
.table {
    border-collapse: collapse;
    width: 90%;
}

.table-container {
    display: flex;
    justify-content: center;
}

th,
td {
    padding: 8px;
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid #ddd;
    background-color: #f1f1f1;
}

tr:hover {
    background-color: #f5f5f5;
}

th {
    background-color: #333;
    color: white;
}
</style>
  