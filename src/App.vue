<template>
  <div>
    <h2>
      <a href="https://wiki-migrate.lzpsap1.com/index">任务管理小应用</a>
    </h2>
    <div>
      <span>描述：</span>
      <span>{{ description }}</span>
    </div>
    <div>
      <span>执行人：</span>
      <span>{{ userName }}</span>
    </div>
    <div>
      <span>日历：</span>
      <span>
        <a href="https://applink.feishu.cn/client/calendar/open">跳转日历</a>
      </span>
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
    <hr />
    <div>
      <button v-bind:class="{ 'btn-danger': completed, 'btn-primary': !completed }" @click="toggleCompleted">
        {{ completed ? '撤销完成任务' : '完成任务' }}
      </button>
    </div>
  </div>
</template>

<script>
import { bitable } from "@lark-opdev/block-bitable-api";
import { getCurrentTask, setCompleted } from "./utils";
import {
  Toast,
} from "@douyinfe/semi-ui";

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
    bitable.base.onSelectionChange(({ data }) => this.loadTask());
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
