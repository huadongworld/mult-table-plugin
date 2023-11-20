<template>
  <div>
    <h2>任务管理小应用</h2>
    <div>
      <span>描述：</span>
      <span>{{ description }}</span>
    </div>
    <div>
      <span>执行人：</span>
      <span>{{ userName }}</span>
    </div>
    <div>
      <span>完成状态：</span>
      <span v-if="completed" style="color: green">已完成</span>
      <span v-else style="color: blue">未完成</span>
    </div>
    <div>
      <span>网址：</span>
      <span>{{ address }}</span>
    </div>
    <br/>
    <div>
      <el-button size="mini" v-bind:class="{ 'btn-danger': completed, 'btn-primary': !completed }" @click="toggleCompleted">
        {{ completed ? '撤销完成任务' : '完成任务' }}
      </el-button>
    </div>
    <hr/>
    <div class="buttons-container">
      <router-link to="/AppCalendar">
        <el-button type="primary" size="small">Confirm</el-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import {bitable} from "@lark-opdev/block-bitable-api";
import {getCurrentTask, setCompleted} from "./utils";
import {
  Toast,
} from "@douyinfe/semi-ui";
import './app.css';

export default {
  data() {
    return {
      description: "",
      userName: "",
      completed: false,
      address: "",
    };
  },
  mounted() {
    this.loadTask();
    bitable.base.onSelectionChange(({data}) => this.loadTask());
  },
  methods: {
    async loadTask() {
      try {
        const task = await getCurrentTask();
        this.description = task.description;
        this.userName = task.userName;
        this.completed = task.completed;
        this.address = task.address;
      } catch (error) {
        console.error("Failed to load task:", error);
      }
    },
    toggleCompleted() {
      setCompleted(!this.completed)
          .then(() => this.loadTask())
          .then(() => {
            Toast.success("更新任务状态成功");
          })
          .catch(() => {
            Toast.error("更新任务状态失败");
          });
    },
  },
};
</script>
