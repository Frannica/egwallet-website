"use client"

import type React from "react"

import { Bot, MessageCircle, Clock, Sparkles, Send, X, Minimize2, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"

export function AISupport() {
  const { t, language } = useLanguage()
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    body: {
      language:
        language === "en"
          ? "English"
          : language === "es"
            ? "Spanish"
            : language === "fr"
              ? "French"
              : language === "ru"
                ? "Russian"
                : "Chinese",
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const input = formData.get("message") as string
    if (input.trim()) {
      sendMessage({ text: input })
      e.currentTarget.reset()
    }
  }

  return (
    <>
      <section id="support" className="py-20 px-4 sm:px-6 lg:px-8 bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary">{t.aiSupport.badge}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">{t.aiSupport.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{t.aiSupport.description}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t.aiSupport.feature1Title}</div>
                    <div className="text-sm text-muted-foreground">{t.aiSupport.feature1Desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t.aiSupport.feature2Title}</div>
                    <div className="text-sm text-muted-foreground">{t.aiSupport.feature2Desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t.aiSupport.feature3Title}</div>
                    <div className="text-sm text-muted-foreground">{t.aiSupport.feature3Desc}</div>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle className="w-4 h-4" /> {t.aiSupport.cta}
              </Button>
            </div>

            <div className="relative">
              <div className="bg-background rounded-2xl border border-border p-6 space-y-4 shadow-xl">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{t.aiSupport.assistantName}</div>
                    <div className="text-xs text-primary flex items-center gap-1">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      {t.aiSupport.online}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                      <p className="text-sm">{t.aiSupport.demoMessage1}</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
                      <p className="text-sm">{t.aiSupport.demoMessage2}</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-primary text-primary-foreground px-4 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
                      <p className="text-sm">{t.aiSupport.demoMessage3}</p>
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
                      <p className="text-sm">{t.aiSupport.demoMessage4}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-xl">
                    <span className="text-muted-foreground text-sm">{t.aiSupport.placeholder}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isChatOpen && (
        <div
          className={`fixed ${isMinimized ? "bottom-4 right-4 w-80 h-16" : "bottom-4 right-4 w-96 h-[600px]"} bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col transition-all`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">{t.aiSupport.assistantName}</div>
                <div className="text-xs text-primary flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  {t.aiSupport.online}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" onClick={() => setIsMinimized(!isMinimized)} className="h-8 w-8 p-0">
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsChatOpen(false)} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground text-sm py-8">
                    {t.aiSupport.welcomeMessage || "Hi! How can I help you today?"}
                  </div>
                )}
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-secondary text-secondary-foreground rounded-tl-sm"
                      }`}
                    >
                      {message.parts.map((part, index) => {
                        if (part.type === "text") {
                          return (
                            <p key={index} className="text-sm whitespace-pre-wrap">
                              {part.text}
                            </p>
                          )
                        }
                        return null
                      })}
                    </div>
                  </div>
                ))}
                {status === "in_progress" && (
                  <div className="flex justify-start">
                    <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-2xl rounded-tl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    name="message"
                    type="text"
                    placeholder={t.aiSupport.placeholder}
                    className="flex-1 px-4 py-2 bg-secondary rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    disabled={status === "in_progress"}
                  />
                  <Button type="submit" size="sm" className="h-10 w-10 p-0" disabled={status === "in_progress"}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  )
}
