'use client'

import { useChat } from '@ai-sdk/react'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, X } from 'lucide-react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { RiChatSmileAiFill } from "react-icons/ri";
import { IoStop } from 'react-icons/io5'

const poppins = Poppins({ subsets: ["latin"], weight: ["500"] });

type CodeProps = {
  inline?: boolean;
  children?: ReactNode;
  className?: string;
};

export default function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [showChatIcon, setShowChatIcon] = useState(false)
  const chatIconRef = useRef<HTMLButtonElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, stop, reload, error } = useChat({ api: "/api/gemini" })

  const suggestions = ["What is Furniro?", "Tell me about Furniro's features", "How can Furniro help me?"];
  const typingSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setShowChatIcon(true)
      } else {
        setShowChatIcon(false)
        setIsChatOpen(false)
      }
    }
    handleScroll()

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen)
  }

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    typingSound.current = new Audio("/sounds/typing.mpeg");

    return () => {
      if (typingSound.current) {
        typingSound.current.pause();
        typingSound.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isLoading && typingSound.current) {
      typingSound.current.loop = true;
      typingSound.current.play().catch((err) => console.error("Audio playback error:", err));
    } else if (typingSound.current) {
      typingSound.current.pause();
      typingSound.current.currentTime = 0;
    }
  }, [isLoading]);


  type MockEvent = {
    preventDefault: () => void;
    target: { value: string };
  };

  const sendMessage = async (message: string) => {
    const mockEvent: MockEvent = {
      preventDefault: () => { },
      target: { value: message },
    };

    handleSubmit(mockEvent);
  };


  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };


  return (
    <div className={`${poppins.className}`}>
      {/* Animated Chat Icon */}
      <AnimatePresence>
        {showChatIcon && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-20"
          >
            <Button
              ref={chatIconRef}
              onClick={toggleChat}
              className="rounded-full bg-[#B88E2F] hover:bg-[#b18623] p-1 sm:w-[60px] sm:h-[60px] w-14 h-14 flex justify-center items-center [&_svg]:w-3/5 [&_svg]:h-3/5"
            >
              {!isChatOpen ? (
                <RiChatSmileAiFill />
              ) : (
                <X />
              )}
            </Button>

          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 sm:right-6 w-[95%] sm:ml-0 ml-[2.5vw] mx-auto sm:w-[400px] z-20"
          >
            <Card className='border-2'>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-3'>
                <CardTitle className='text-lg font-bold'>
                  Chat with Furniro AI
                </CardTitle>
                <Button onClick={toggleChat} size={"sm"} variant={"ghost"} className='px-2 py-0'>
                  <X className='size-4' />
                  <span className='sr-only'>Close Chat</span>
                </Button>
              </CardHeader>
              <CardContent>
                <ScrollArea className='h-[300px] pr-4'>
                  {messages?.length === 0 && (
                    <div className='flex flex-col items-center justify-betweet w-full gap-3 text-gray-500'>
                      <div className='mt-12'>No message yet.</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-[#B88E2F] border border-[#B88E2F] hover:bg-[#B88E2F] hover:text-white p-3 rounded-lg"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {messages?.map((message, index) => (
                    <div
                      key={index}
                      className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {/* Avatar for AI */}
                      {message.role !== "user" && (
                        <div className="flex-shrink-0 mr-2">
                          <Image
                            src="/images/logo.png"
                            alt="AI"
                            width={100}
                            height={100}
                            className="w-10 h-6 rounded-full"
                          />
                        </div>
                      )}

                      {/* Message Bubble */}
                      <div>
                        <div
                          className={`inline-block p-3 rounded-lg text-[12px] sm:text-[14px] ${message.role === "user"
                            ? "bg-transparent border border-[#B88E2F] text-[#B88E2F]"
                            : "bg-[#B88E2F] text-white"
                            }`}
                        >
                          <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                              code({ inline, children, ...props }: CodeProps) {
                                return inline ? (
                                  <code {...props} className="bg-gray-200 px-1 rounded">
                                    {children}
                                  </code>
                                ) : (
                                  <pre className="bg-gray-200 p-2 rounded">
                                    <code {...props}>{children}</code>
                                  </pre>
                                );
                              },
                              ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal ml-4">{children}</ol>,
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>

                        </div>
                      </div>

                      {/* Avatar for User */}
                      {message.role === "user" && (
                        <div className="flex-shrink-0 ml-2">
                          <Avatar>
                            <AvatarFallback>You</AvatarFallback>
                          </Avatar>
                        </div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="w-full flex justify-start items-center gap-2">
                      <div className="flex-shrink-0 mr-2">
                        <Image
                          src="/images/logo.png"
                          alt="AI"
                          width={100}
                          height={100}
                          className="w-10 h-6 rounded-full"
                        />
                      </div>
                      <div className="flex items-center">
                        <div className="dot animate-bounce delay-100">.</div>
                        <div className="dot animate-bounce delay-200">.</div>
                        <div className="dot animate-bounce delay-300">.</div>
                      </div>

                    </div>
                  )}



                  {error && (
                    <div className='w-full items-center flex justify-center gap-3'>
                      <div>An error occurred</div>
                      <button className="underline" type='button' onClick={() => reload()}>Retry</button>
                    </div>
                  )}

                  <div ref={scrollRef}></div>

                </ScrollArea>
              </CardContent>
              <CardFooter>
                <form onSubmit={handleSubmit} className='flex items-center w-full space-x-2'>
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder='Type your message here...'
                    className='flex-1'
                  />
                  <Button
                    type="submit"
                    className="size-9 group bg-[#B88E2F] hover:bg-transparent border border-transparent hover:border-[#b18623]"
                    size="icon"
                  >
                    {isLoading ? (
                      <button
                        className="text-[10px] group"
                        type="button"
                        onClick={stop}
                      >
                        <IoStop className='text-white group-hover:text-[#B88E2F]' />
                      </button>
                    ) : (
                      <Send className="size-4 text-white group-hover:text-[#B88E2F]" />
                    )}
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
