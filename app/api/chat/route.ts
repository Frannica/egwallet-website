import { convertToModelMessages, streamText, type UIMessage, tool } from "ai"
import { z } from "zod"

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, language }: { messages: UIMessage[]; language?: string } = await req.json()

  const prompt = convertToModelMessages(messages)

  const systemPrompt = `You are a helpful E.G. Wallet AI support assistant. You help users with:
- Account and wallet questions
- Money transfers and transactions
- Virtual debit card issues
- Currency exchange and conversion
- Budget tracking
- Security concerns
- General troubleshooting

Be friendly, professional, and concise. ${language ? `Respond in ${language}.` : "Respond in the user's language."}`

  const result = streamText({
    model: "openai/gpt-5-mini",
    system: systemPrompt,
    messages: prompt,
    maxOutputTokens: 1000,
    temperature: 0.7,
    tools: {
      checkTransactionStatus: tool({
        description: "Check the status of a transaction",
        inputSchema: z.object({
          transactionId: z.string(),
        }),
        execute: async ({ transactionId }) => {
          // Mock transaction status check
          return {
            status: "completed",
            amount: 500,
            currency: "USD",
            date: new Date().toISOString(),
          }
        },
      }),
      getAccountBalance: tool({
        description: "Get current account balance",
        inputSchema: z.object({}),
        execute: async () => {
          // Mock balance retrieval
          return {
            balance: 1250.75,
            currency: "USD",
          }
        },
      }),
    },
  })

  return result.toUIMessageStreamResponse()
}
