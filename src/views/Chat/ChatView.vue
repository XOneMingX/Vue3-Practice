<template>
  <div class="chat">
    <h3>即時聊天室</h3>
    <div class="messages">
      <div v-for="msg in messages" :key="msg.id" class="message">
        <strong>{{ msg.user }}:</strong>
        {{ msg.text }}
      </div>
    </div>
    <div class="input-area">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="輸入訊息..."
      />
      <button @click="sendMessage">發送</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { signalRService } from '@/services/signalrService'

  interface Message {
    id: number
    user: string
    text: string
  }

  const messages = ref<Message[]>([])
  const newMessage = ref('')

  onMounted(() => {
    // 監聽後端推送
    signalRService.onReceiveMessage((user: string, message: string) => {
      messages.value.push({
        id: Date.now(),
        user,
        text: message,
      })
    })
  })

  const sendMessage = async () => {
    if (newMessage.value.trim()) {
      try {
        await signalRService.sendMessage('VueUser', newMessage.value)
        newMessage.value = ''
      } catch (err) {
        alert('發送失敗，請檢查連接')
      }
    }
  }

  onBeforeUnmount(() => {
    // 可選：移除特定監聽
    signalRService.getConnection()?.off('ReceiveMessage')
  })
</script>

<style scoped>
  .chat {
    max-width: 600px;
    margin: 0 auto;
  }
  .messages {
    height: 400px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
  }
  .input-area {
    display: flex;
    gap: 10px;
  }
  input {
    flex: 1;
    padding: 8px;
  }
</style>
