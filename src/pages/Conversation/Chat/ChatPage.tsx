import { useState, useEffect, useRef } from "react";
import SearchIcon from "@mui/icons-material/Search";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import AddCommentOutlinedIcon from "@mui/icons-material/AddCommentOutlined";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  useGetMyChatsQuery,
  useGetChatMessagesQuery,
  useSendMessageMutation,
  type Datum,
  type LastMessage,
  useMarkAsReadMutation,
} from "../../../services/conversation/chats/chatQuery";
import { ErrorHandler } from "../../../utils/ErrorHandler";

const formatTime = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isInternal, setIsInternal] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentAccountId = Number(localStorage.getItem("accountId") || 1);

  // RTK Queries & Mutations
  const { data: chatsData, isLoading: isLoadingChats } = useGetMyChatsQuery({});
  const [markAsRead] = useMarkAsReadMutation();

  const {
    data: messagesData,
    isLoading: isLoadingMessages,
    isFetching: isFetchingMessages,
  } = useGetChatMessagesQuery(
    { conversationId: selectedChatId! },
    { skip: !selectedChatId }
  );

  const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

  const chats = chatsData?.data || [];
  const messages = messagesData?.data || [];
  
  const isMessagesLoading = isLoadingMessages || isFetchingMessages;

  // 1. اختيار المحادثة الأولى تلقائياً عند تحميل البيانات
  useEffect(() => {
    if (chats.length > 0 && !selectedChatId) {
      setSelectedChatId(chats[0].id);
    }
  }, [chats, selectedChatId]);

  // 2. التمرير لأسفل عند تحميل أو إرسال الرسائل
  useEffect(() => {
    if (!isMessagesLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isMessagesLoading]);

  const activeChat = chats.find((c) => c.id === selectedChatId);

  // 3. ✨ هنا مكان إضافة لوجيك التعديل كمقروء ✨
  useEffect(() => {
    if (selectedChatId && activeChat && activeChat.status === "UNREAD") {
      markAsRead({ conversationId: selectedChatId })
        .unwrap()
        .catch((err) => console.error("Failed to mark as read", err));
    }
  }, [selectedChatId, activeChat?.status, markAsRead]);

  const filteredChats = chats.filter((chat) => {
    const query = search.toLowerCase();
    const matchSubject = chat.subject.toLowerCase().includes(query);
    const matchType = chat.requestTypeName.toLowerCase().includes(query);
    const matchParticipant = chat.participants.some((p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(query)
    );
    return matchSubject || matchType || matchParticipant;
  });

  const handleSend = async () => {
    if ((!messageBody.trim() && !selectedFiles) || !selectedChatId) return;

    try {
      await sendMessage({
        conversationId: selectedChatId,
        body: messageBody.trim(),
        isInternal: isInternal,
        files: selectedFiles,
      }).unwrap();

      setMessageBody("");
      setSelectedFiles(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      ErrorHandler.show(err);
    }
  };

  return (
    <div className="h-[calc(100vh-80px)] min-h-[600px] p-4 md:p-6 bg-(--light-color)">
      <div className="h-full max-w-7xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex">
        
        {/* Sidebar */}
        <aside className="w-full md:w-[320px] lg:w-[360px] border-r border-gray-100 flex flex-col bg-white">
          <div className="p-5 border-b border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h1 className="text-xl font-bold text-gray-900">Conversations</h1>
                <p className="text-xs text-gray-400 mt-1">Your direct messages</p>
              </div>
              <button
                className="w-10 h-10 rounded-xl bg-(--main-color) text-white flex items-center justify-center hover:bg-(--sec-color) transition cursor-pointer"
                title="Start new chat"
              >
                <AddCommentOutlinedIcon fontSize="small" />
              </button>
            </div>

            <div className="relative">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                sx={{ fontSize: 20 }}
              />
              <input
                type="text"
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-(--light-color) border border-transparent focus:border-(--third-color) focus:outline-none rounded-xl py-3 pl-10 pr-4 text-sm transition"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2">
            {isLoadingChats ? (
              <ChatsListSkeleton />
            ) : filteredChats.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">No conversations found</div>
            ) : (
              filteredChats.map((chat) => (
                <ChatItem
                  key={chat.id}
                  chat={chat}
                  isSelected={chat.id === selectedChatId}
                  onSelect={() => setSelectedChatId(chat.id)}
                />
              ))
            )}
          </div>
        </aside>

        {/* Main Chat Window */}
        <main className="hidden md:flex flex-1 flex-col min-w-0">
          {activeChat ? (
            <>
              <ChatHeader chat={activeChat} />

              <div className="flex-1 overflow-y-auto p-6 bg-[#fafaf7]">
                {isMessagesLoading ? (
                  <MessagesSkeleton />
                ) : messages.length === 0 ? (
                  <EmptyMessagesState />
                ) : (
                  <div className="max-w-4xl mx-auto space-y-4 flex flex-col-reverse">
                    <div ref={messagesEndRef} />
                    {messages.map((msg) => (
                      <MessageBubble
                        key={msg.id}
                        msg={msg}
                        isMe={msg.senderId === currentAccountId}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="max-w-4xl mx-auto flex items-end gap-3">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => setSelectedFiles(e.target.files)}
                    className="hidden"
                    id="file-upload"
                    multiple
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center cursor-pointer transition ${
                      selectedFiles?.length 
                        ? "bg-blue-100 text-(--orange-color)" 
                        : "bg-(--light-color) text-(--sec-color) hover:bg-(--light2-color)"
                    }`}
                    title="Attach file"
                  >
                    <AttachFileIcon fontSize="small" />
                  </button>

                  <textarea
                    rows={1}
                    value={messageBody}
                    onChange={(e) => setMessageBody(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                    placeholder="Write a message..."
                    className="flex-1 resize-none bg-(--light-color) rounded-2xl px-4 py-3 text-sm outline-none border border-transparent focus:border-(--third-color) transition max-h-32"
                  />

                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={(!messageBody.trim() && !selectedFiles?.length) || isSending}
                    className="w-11 h-11 shrink-0 rounded-xl bg-(--main-color) text-white flex items-center justify-center hover:bg-(--sec-color) disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
                    title="Send message"
                  >
                    <SendIcon fontSize="small" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Select a conversation to start chatting
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Sub-components
function MessagesSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse p-2">
      <div className="flex items-start gap-3 justify-start">
        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
        <div className="w-3/5 space-y-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-16 bg-gray-200 rounded-2xl rounded-tl-none w-full" />
        </div>
      </div>
      <div className="flex items-start gap-3 justify-end">
        <div className="w-1/2 space-y-2 flex flex-col items-end">
          <div className="h-12 bg-gray-300 rounded-2xl rounded-tr-none w-full" />
        </div>
      </div>
    </div>
  );
}

function ChatsListSkeleton() {
  return (
    <div className="space-y-3 p-1 animate-pulse">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl">
          <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function ChatItem({
  chat,
  isSelected,
  onSelect,
}: {
  chat: Datum;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const displayTitle = chat.subject || chat.requestTypeName;
  const lastMsgText = chat.lastMessage?.body || "No messages yet";
  const time = formatTime(chat.lastMessage?.createdAt || chat.createdAt);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full flex items-center gap-3 p-3 rounded-2xl text-left transition cursor-pointer ${
        isSelected ? "bg-(--light2-color)" : "hover:bg-gray-50"
      }`}
    >
      <div className="relative shrink-0">
        <div className="w-11 h-11 rounded-full bg-(--sec-color) text-white flex items-center justify-center font-semibold text-sm">
          {getInitials(displayTitle)}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm text-gray-800 truncate">
            {displayTitle}
          </span>
          <span className="text-[10px] text-gray-400 shrink-0">{time}</span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-gray-400 truncate">{lastMsgText}</p>
          {chat.status === "UNREAD" && (
            <span className="w-2 h-2 rounded-full bg-(--main-color) shrink-0" />
          )}
        </div>
      </div>
    </button>
  );
}

function ChatHeader({ chat }: { chat: Datum }) {
  return (
    <header className="h-[76px] px-6 border-b border-gray-100 flex items-center justify-between bg-white">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-(--sec-color) text-white flex items-center justify-center font-semibold">
          {getInitials(chat.subject || chat.requestTypeName)}
        </div>
        <div>
          <h2 className="font-bold text-gray-900 text-sm md:text-base">{chat.subject}</h2>
          <p className="text-xs text-gray-400 mt-0.5">{chat.requestTypeName}</p>
        </div>
      </div>

      <button
        type="button"
        className="w-9 h-9 rounded-xl hover:bg-(--light-color) text-gray-500 flex items-center justify-center cursor-pointer"
      >
        <MoreHorizIcon />
      </button>
    </header>
  );
}

function MessageBubble({ msg, isMe }: { msg: LastMessage; isMe: boolean }) {
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-xs ${
          isMe
            ? "bg-(--main-color) m-1 text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
        }`}
      >
        {!isMe && (
          <p className="text-[11px] font-semibold text-gray-500 mb-1">
            {msg.senderFirstName} {msg.senderLastName}
          </p>
        )}
        <p className="text-sm leading-6">{msg.body}</p>

        <div
          className={`flex items-center gap-1 mt-1 text-[10px] ${
            isMe ? "text-white/70 justify-end" : "text-gray-400"
          }`}
        >
          <span>{formatTime(msg.createdAt)}</span>
          {isMe && msg.isRead && <DoneAllIcon sx={{ fontSize: 13 }} />}
        </div>
      </div>
    </div>
  );
}

function EmptyMessagesState() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-2xl bg-(--light2-color) text-(--main-color) flex items-center justify-center mb-4">
        <ChatBubbleOutlineIcon />
      </div>
      <h3 className="font-bold text-gray-800">Start the conversation</h3>
      <p className="text-sm text-gray-400 mt-1 max-w-xs">
        Send a message to start chatting in this channel.
      </p>
    </div>
  );
}