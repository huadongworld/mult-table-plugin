<template>
  <el-container>
    <el-header>
      <h5>Interviewer type</h5>
      <el-radio v-model="radio" label="1">Lark video</el-radio>
      <el-radio v-model="radio" label="2">Other video</el-radio>
      <el-radio v-model="radio" label="3">On-site</el-radio>
    </el-header>
    <el-main>
      <h5>Interviewer</h5>
      <label>
        Interviewer(1st)
      </label>
      <label>
        <el-select v-model="selectedOption" style="margin-left: 10px;" size="mini" multiple placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </label>
      <label style="margin-left: 50px;">
        Interviewer time
      </label>
      <label>
        <input content="abc">
      </label>
      <br>

      <label>
        Interviewer(2st)
      </label>
      <label>
        <el-select v-model="selectedOption" style="margin-left: 10px;" size="mini" multiple placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </label>
      <label style="margin-left: 50px;">
        Interviewer time
      </label>
      <label>
        <input content="abc">
      </label>
      <br>

      <label>
        Interviewer(3st)
      </label>
      <label>
        <el-select v-model="selectedOption" style="margin-left: 10px;" size="mini" multiple placeholder="请选择">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
      </label>
      <label style="margin-left: 50px;">
        Interviewer time
      </label>
      <label>
        <input content="abc">
      </label>
      <br>

      <br>

      <el-button type="info" size="mini" @click="onClickMoveButton(-1)"><i class="el-icon-arrow-left"/></el-button>
      <el-button type="info" size="mini" @click="onClickMoveButton(1)"><i class="el-icon-arrow-right"/></el-button>
      <span class="date-range">{{ dateRangeText }}</span>

      <ToastUICalendar
          ref="calendar"
          style="height: 800px"
          :view="'week'"
          :use-form-popup="true"
          :use-detail-popup="true"
          :week="{
        showTimezoneCollapseButton: false,
        timezonesCollapsed: false,
        eventView: true,
        taskView: false,
      }"
          :month="{ startDayOfWeek: 1 }"
          :timezone="{ zones }"
          :theme="theme"
          :template="{
        milestone: getTemplateForMilestone,
        allday: getTemplateForAllday,
      }"
          :grid-selection="true"
          :calendars="calendars"
          :events="events"
          @selectDateTime="onSelectDateTime"
          @beforeCreateEvent="onBeforeCreateEvent"
          @beforeUpdateEvent="onBeforeUpdateEvent"
          @beforeDeleteEvent="onBeforeDeleteEvent"
          @afterRenderEvent="onAfterRenderEvent"
          @clickDayName="onClickDayName"
          @clickEvent="onClickEvent"
          @clickTimezonesCollapseBtn="onClickTimezonesCollapseBtn"
      />
    </el-main>
    <el-footer>
      <hr>
      <h3>Interview Notification</h3>

      <i class="el-icon-s-promotion"/>
      <el-select size="mini" v-model="emailValue" placeholder="请选择">
        <el-option
            v-for="item in emailOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>

      <div class="buttons-container">
        <el-button type="primary" size="small">Confirm</el-button>
        <el-button type="primary" size="small">Cancel</el-button>
      </div>

      <br>
    </el-footer>
  </el-container>

</template>

<script>
/* eslint-disable no-console */
import ToastUICalendar from './Calendar';
import '@toast-ui/calendar/toastui-calendar.css';
import 'tui-date-picker/dist/tui-date-picker.min.css';
import 'tui-time-picker/dist/tui-time-picker.min.css';

import {events} from './mock-data';
import {theme} from './theme';
import axios from 'axios';
import './app.css';

export default {
  components: {
    ToastUICalendar,
  },
  data() {
    return {
      selectedOption: ['0'],
      radio: '1',
      emailOptions: [{
        value: '1',
        label: 'Select email notification template'
      }, {
        value: '2',
        label: 'Select email notification template2'
      }],
      emailValue: '1',
      calendars: [
        {
          id: '0',
          name: '马子涛',
          backgroundColor: '#9e5fff',
          borderColor: '#9e5fff',
          dragBackgroundColor: '#9e5fff',
        },
        {
          id: '1',
          name: '华东',
          backgroundColor: '#00a9ff',
          borderColor: '#00a9ff',
          dragBackgroundColor: '#00a9ff',
        },
        {
          id: '2',
          name: '程孝羽',
          backgroundColor: '#91f960',
          borderColor: '#91f960',
          dragBackgroundColor: '#91f960',
        },
        {
          id: '3',
          name: '简斯韵',
          backgroundColor: '#f13d3d',
          borderColor: '#f13d3d',
          dragBackgroundColor: '#f13d3d',
        },
      ],
      events,
      zones: [
        {
          timezoneName: 'Europe/London',
          displayLabel: '伦敦'
        },
        {
          timezoneName: 'Asia/Shanghai',
          displayLabel: '北京',
          tooltip: 'UTC+08:00',
        }
      ],
      theme,
      selectedView: 'month',
      viewOptions: [
        {
          title: 'Monthly',
          value: 'month',
        },
        {
          title: 'Weekly',
          value: 'week',
        },
        {
          title: 'Daily',
          value: 'day',
        },
      ],
      dateRangeText: '',
    };
  },
  created() {
    if (this.options.length > 0) {
      this.selectedOption = this.options[0].value; // 设置第一个选项的值作为默认选中
    }
  },
  computed: {
    calendarInstance() {
      return this.$refs.calendar.getInstance();
    },
    options() {
      return [
        {value: '0', label: '程孝羽'},
        {value: '1', label: '华东'},
        {value: '2', label: '马子涛'},
      ];
    }
  },
  watch: {
    selectedView(newView) {
      this.calendarInstance.changeView(newView);
      this.setDateRangeText();
    },
  },
  mounted() {
    this.setDateRangeText();
  },
  methods: {
    getTemplateForMilestone(event) {
      return `<span style="color: #fff; background-color: ${event.backgroundColor};">${event.title}</span>`;
    },
    getTemplateForAllday(event) {
      return `[All day] ${event.title}`;
    },
    onSelectDateTime({start, end}) {
      console.group('onSelectDateTime');
      console.log(`Date : ${start} ~ ${end}`);
      console.groupEnd();
    },
    onBeforeCreateEvent(eventData) {
      const event = {
        calendarId: eventData.calendarId || '',
        id: String(Math.random()),
        title: eventData.title,
        isAllday: eventData.isAllday,
        start: eventData.start,
        end: eventData.end,
        category: eventData.isAllday ? 'allday' : 'time',
        dueDateClass: '',
        location: eventData.location,
        state: eventData.state,
        isPrivate: eventData.isPrivate,
      };

      this.calendarInstance.createEvents([event]);
    },
    onBeforeUpdateEvent(updateData) {
      console.group('onBeforeUpdateEvent');
      console.log(updateData);
      console.groupEnd();

      const targetEvent = updateData.event;
      const changes = {...updateData.changes};

      this.calendarInstance.updateEvent(targetEvent.id, targetEvent.calendarId, changes);
    },

    onBeforeDeleteEvent({title, id, calendarId}) {
      console.group('onBeforeDeleteEvent');
      console.log('Event Info : ', title);
      console.groupEnd();

      this.calendarInstance.deleteEvent(id, calendarId);
    },
    onAfterRenderEvent({title}) {
      console.group('onAfterRenderEvent');
      console.log('Event Info : ', title);
      console.groupEnd();
    },
    onClickDayName({date}) {
      console.group('onClickDayName');
      console.log('Date : ', date);
      console.groupEnd();
    },
    onClickEvent({nativeEvent, event}) {
      console.group('onClickEvent');
      console.log('MouseEvent : ', nativeEvent);
      console.log('Event Info : ', event);
      console.groupEnd();
    },
    onClickTimezonesCollapseBtn(timezoneCollapsed) {
      console.group('onClickTimezonesCollapseBtn');
      console.log('Is Timezone Collapsed?: ', timezoneCollapsed);
      console.groupEnd();

      const newTheme = {
        'week.daygridLeft.width': '100px',
        'week.timegridLeft.width': '100px',
      };

      this.calendarInstance.setTheme(newTheme);
    },
    onClickTodayButton() {
      this.calendarInstance.today();
      this.setDateRangeText();
    },
    onClickMoveButton(offset) {
      this.calendarInstance.move(offset);
      this.setDateRangeText();
    },
    getFeishuToken(offset) {
      axios.get('http://127.0.0.1:7803/debug/copyDoc')
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
      axios.post('http://127.0.0.1:7803/debug/copyDocPost', {})
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error(error);
          });
    },
    setDateRangeText() {
      const date = this.calendarInstance.getDate();
      const start = this.calendarInstance.getDateRangeStart();
      const end = this.calendarInstance.getDateRangeEnd();

      const startYear = start.getFullYear();
      const endYear = end.getFullYear();

      switch (this.selectedView) {
        case 'month':
          this.dateRangeText = `${date.getFullYear()}.${date.getMonth() + 1}`;

          return;
        case 'day':
          this.dateRangeText = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

          return;
        default:
          this.dateRangeText = `${startYear}.${start.getMonth() + 1}.${start.getDate()} - ${
              startYear !== endYear ? `${endYear}.` : ''
          }${end.getMonth() + 1}.${end.getDate()}`;
      }
    },
  },
};
</script>
