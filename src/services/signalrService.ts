// src/services/signalr.ts
import * as signalR from '@microsoft/signalr'

class SignalRService {
  private connection: signalR.HubConnection | null = null
  private isConnected = false

  // 啟動連接
  async connect(): Promise<void> {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44354/chathub', {
        // 改成你 .NET 後端地址
        withCredentials: true, // 如果需要 cookie
        // accessTokenFactory: () => localStorage.getItem('token') // JWT 認證時用
      })
      .withAutomaticReconnect([0, 2000, 10000, 30000]) // 自訂重連策略
      .configureLogging(signalR.LogLevel.Information)
      .build()

    try {
      await this.connection.start()
      this.isConnected = true
      console.log('SignalR 連接成功')
    } catch (err) {
      this.isConnected = false
      console.error('SignalR 連接失敗:', err)
      throw err
    }
  }

  // 監聽事件（強類型）
  onReceiveMessage(callback: (user: string, message: string) => void): void {
    this.connection?.on('ReceiveMessage', callback)
  }

  // 發送訊息
  async sendMessage(user: string, message: string): Promise<void> {
    if (!this.isConnected || !this.connection) {
      throw new Error('SignalR 未連接')
    }
    await this.connection.invoke('SendMessage', user, message)
  }

  // 斷開
  async disconnect(): Promise<void> {
    if (this.connection) {
      await this.connection.stop()
      this.isConnected = false
    }
  }

  getConnection() {
    return this.connection
  }
}

export const signalRService = new SignalRService()
