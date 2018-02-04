<template>
<div>
   
<el-row v-for="item in items" :key="item.message"> 
  <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
    {{item.message}}
    <el-button @click="senSocket(item.message)" type="primary">удалить</el-button>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      items: [
        { message: 0 },
        { message: 1 },
        { message: 2 },
        { message: 3 },
        { message: 4 },
        { message: 5 },
        { message: 6 },
        { message: 7 },
        { message: 8 },
        { message: 9 }
      ],
      connection: false
    };
  },
  created() {
    this.connect();
    /* 

       setInterval(() => {
         this.connection.send("msg");
       }, 1000);
       setInterval(function() {
         if (connection.readyState !== 1) {
           console.log("error server connect");
         }
       }, 1000); */
  },
  methods: {
    connect() {
      window.WebSocket = window.WebSocket || window.MozWebSocket;
      if (!window.WebSocket) {
        return alert("webSocket not in brouser");
      }
      let connection = new window.WebSocket("ws://127.0.0.1:3000");
      this.connection = connection;
      connection.addEventListener("open", () => {
        console.log("Hello Server! open");
      });

      connection.addEventListener("message", event => {
        //  console.log("Message from server ", );

        this.removeComment(event.data);
      });
      connection.addEventListener("close", () => {
        console.log("Hello Server! close");
      });
    },
    removeComment(a) {
      let index = this.items.findIndex(comment => comment.message == a);
      if (index == -1) {
        return;
      }
      this.items.splice(index, 1);
    },
    senSocket(a) {
      this.connection.send(a);
    }
  }
};
</script>


<style>
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
