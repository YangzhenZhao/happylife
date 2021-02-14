<template>
  <div id='calendar'></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { Calendar } from '@fullcalendar/core'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import esLocale from '@fullcalendar/core/locales/zh-cn'
export default defineComponent({
  name: 'Calendar',
  setup () {
    onMounted(() => {
      console.log(new Date())
      const calendarEl: HTMLElement = document.getElementById('calendar') as HTMLElement
      const calendar = new Calendar(calendarEl, {
        locale: esLocale,
        plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
        headerToolbar: {
          left: 'prevYear,prev,next,nextYear',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        // initialDate: '2018-01-12',
        navLinks: true, // can click day/week names to navigate views
        editable: true,
        dayMaxEvents: true, // allow "more" link when too many events
        events: [
          {
            title: '休息',
            start: '2021-02-11',
            end: '2021-02-18',
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            title: '上班',
            start: '2021-02-20',
            backgroundColor: 'red',
            borderColor: 'red'
          },
          {
            title: '休息',
            start: '2021-04-03',
            end: '2021-04-06',
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            title: '休息',
            start: '2021-05-01',
            end: '2021-05-06',
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            title: '上班',
            start: '2021-05-08',
            backgroundColor: 'red',
            borderColor: 'red'
          },
          {
            title: '休息',
            start: '2021-06-12',
            end: '2021-06-15',
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            title: '上班',
            start: '2021-09-18',
            backgroundColor: 'red',
            borderColor: 'red'
          },
          {
            title: '休息',
            start: '2021-09-19',
            end: '2021-09-22',
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            title: '上班',
            start: '2021-09-26',
            backgroundColor: 'red',
            borderColor: 'red'
          },
          {
            title: '休息',
            start: '2021-10-01',
            end: '2021-10-08',
            backgroundColor: 'green',
            borderColor: 'green'
          },
          {
            title: '上班',
            start: '2021-10-09',
            backgroundColor: 'red',
            borderColor: 'red'
          },
          {
            title: '元宵节',
            start: '2021-02-26'
          },
          {
            title: '清明节',
            start: '2021-04-04'
          },
          {
            title: '劳动节',
            start: '2021-05-01'
          },
          {
            title: '端午节',
            start: '2021-06-14'
          },
          {
            title: '中秋节',
            start: '2021-09-21'
          },
          {
            title: '国庆节',
            start: '2021-10-01'
          }
        ]
      })
      calendar.render()
    })
  }
})
</script>

<style scoped>
  #calendar {
    margin-top: 20px;
    margin-right: 50px;
    margin-left: 50px;
    height: 640px;
  }
</style>
