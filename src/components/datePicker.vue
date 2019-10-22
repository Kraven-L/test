<template>
    <div class="timerPicker">
        <mt-datetime-picker
              type="datetime"
              ref="picker"
              year-format="{value}"
              month-format="{value}"
              date-format="{value}"
              @confirm="handleConfirm"
              :startDate="startDate"
              >
        </mt-datetime-picker>
    </div>
</template>
<script>
import moment from "moment";
export default {
    data(){
        return {
            startDate:'',
        }
    },
    created(){
        this.startDate =new Date()
        console.log(this.startDate)
    },
    mounted(){
        this.$refs.picker.open();
    },
    methods:{
        handleConfirm(data) {
            let date = moment(data).format("YYYY-MM-DD HH:mm");
            this.$emit('subStart',date)
             this.$refs.picker.open();
        },
    }
}
</script>
