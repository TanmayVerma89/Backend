import { useEffect, useMemo, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChatId } from '../chat.slice'
import Icon from '../components/Icon'
import ChatSideBar from '../components/ChatSideBar'
import '../styles/dashboard.css'
import { useChat } from '../hooks/useChat'

const suggestions = [
    'Explain a concept simply',
    'Brainstorm project ideas',
    'Help me write something',
]

const isAssistant = (role) => role?.toLowerCase() === 'ai' || role?.toLowerCase() === 'assistant'

const TypingMarkdown = ({ content, animate, onTypingStart }) => {
    const words = useMemo(() => content.match(/\S+\s*/g) || [], [content])
    const [shouldType] = useState(() => animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const [visibleWordCount, setVisibleWordCount] = useState(() => shouldType ? 0 : words.length)
    const isComplete = visibleWordCount >= words.length

    useEffect(() => {
        if (!shouldType || !words.length) return undefined

        onTypingStart()
        const intervalId = window.setInterval(() => {
            setVisibleWordCount((currentCount) => {
                if (currentCount >= words.length) {
                    window.clearInterval(intervalId)
                    return currentCount
                }

                return currentCount + 1
            })
        }, 65)

        return () => window.clearInterval(intervalId)
    }, [onTypingStart, shouldType, words.length])

    return (
        <>
            <ReactMarkdown>{words.slice(0, visibleWordCount).join('')}</ReactMarkdown>
            {shouldType && !isComplete && <span className="chat-message__typing-caret" aria-hidden="true" />}
        </>
    )
}

const Dashboard = () => {
    const { intializeSocketConnection, handleGetChats, handleSendMessage, hangleGetMessages } = useChat()
    const { chats } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.auth)
    const { currentChatId } = useSelector((state) => state.chat)

    useEffect(() => {
        intializeSocketConnection();
        handleGetChats();
    }, [handleGetChats, intializeSocketConnection]);

    const [prompt, setPrompt] = useState('')
    const [pendingMessage, setPendingMessage] = useState('')
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [theme, setTheme] = useState(() => localStorage.getItem('perplexity-theme') || 'light')
    const scrollAreaRef = useRef(null)
    const shouldAnimateNextAssistantMessage = useRef(false)

    const messages = useMemo(() => chats[currentChatId]?.messages || [], [chats, currentChatId])
    const activeChat = chats[currentChatId]
    const dispatch = useDispatch();
    
    useEffect(() => {
        localStorage.setItem('perplexity-theme', theme)
    }, [theme])

    useEffect(() => {
        const element = scrollAreaRef.current

        if (!element) return

        element.scrollTop = element.scrollHeight
    }, [currentChatId, messages])

    const handleNewChat = () => {
        setPrompt('')
        setPendingMessage('')
        dispatch(setCurrentChatId(null))
        setSidebarOpen(false)
    }

    const handleSelectChat = (chat) => {
        dispatch(setCurrentChatId(chat.id))
        hangleGetMessages({ chatId: chat.id })
        setSidebarOpen(false)
    }

    const handleSend = (event) => {
        event.preventDefault()
        const message = prompt.trim()
        if (!message) return

        shouldAnimateNextAssistantMessage.current = true
        setPendingMessage(message)
        handleSendMessage({ message, chatId: currentChatId }).finally(() => setPendingMessage(''))

        setPrompt('');
    }

    const handlePromptKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            handleSend(event)
        }
    }

    const displayName = user?.username || user?.name || 'You';
    const initials = displayName.slice(0, 2).toUpperCase();

    return (
        <main className={`chat-workspace chat-workspace--${theme}`}>
            {sidebarOpen && <button className="chat-sidebar-backdrop" type="button" aria-label="Close menu" onClick={() => setSidebarOpen(false)} />}

            <ChatSideBar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                currentChatId={currentChatId}
                chats={chats}
                handleNewChat={handleNewChat}
                onSelectChat={handleSelectChat}
            />

            <section className="chat-main" aria-label="AI chat">
                <header className="chat-header">
                    <div className="chat-header__start">
                        <button className="chat-header__icon-button chat-header__menu" type="button" aria-label="Open chat history" onClick={() => setSidebarOpen(true)}>
                            <Icon name="menu" />
                        </button>
                        <h1 className="chat-header__title">
                            {activeChat?.title || 'New conversation'}
                            <span className="chat-header__status">AI ready</span>
                        </h1>
                    </div>

                    <div className="chat-header__end">
                        <button className="chat-theme-toggle" type="button" role="switch" aria-checked={theme === 'dark'} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`} onClick={() => setTheme((currentTheme) => currentTheme === 'light' ? 'dark' : 'light')}>
                            <span className="chat-theme-toggle__thumb"><Icon name={theme === 'light' ? 'sun' : 'moon'} /></span>
                        </button>
                        <button className="chat-header__icon-button" type="button" aria-label="Start a new chat" onClick={handleNewChat}>
                            <Icon name="plus" />
                        </button>
                        <button className="chat-user-menu" type="button" aria-label="Open account menu">
                            <span className="chat-user-menu__avatar">{initials}</span>
                            <span className="chat-user-menu__name">{displayName}</span>
                        </button>
                    </div>
                </header>

                <div className="chat-scroll-area" ref={scrollAreaRef}>
                    <div className="chat-conversation">
                        {!messages.length && !pendingMessage ? (
                            <section className="chat-welcome">
                                <div className="chat-welcome__content">
                                    <div className="chat-welcome__mark" aria-hidden="true">✦</div>
                                    <h1>Where would you like to begin?</h1>
                                    <p>Ask for an explanation, work through an idea, or turn a thought into something useful.</p>
                                    <div className="chat-suggestions">
                                        {suggestions.map((suggestion) => <button className="chat-suggestion" type="button" key={suggestion} onClick={() => setPrompt(suggestion)}>{suggestion}</button>)}
                                    </div>
                                </div>
                            </section>
                        ) : (
                            <div className="chat-messages" aria-live="polite">
                                {messages.map((message, index) => {
                                    const assistant = isAssistant(message.role)
                                    const shouldAnimate = assistant && index === messages.length - 1 && shouldAnimateNextAssistantMessage.current
                                    return (
                                        <article className={`chat-message ${assistant ? 'chat-message--assistant' : 'chat-message--user'}`} key={message._id || `${message.role}-${index}`}>
                                            <div className="chat-message__avatar" aria-hidden="true">{assistant ? '✦' : initials}</div>
                                            <div className="chat-message__body">
                                                <div className="chat-message__meta">
                                                    <span className="chat-message__author">{assistant ? 'Perplexity' : displayName}</span>
                                                    <span className="chat-message__role">{assistant ? 'AI assistant' : 'You'}</span>
                                                </div>
                                                <div className="chat-message__content">
                                                    {assistant ? <TypingMarkdown content={message.content} animate={shouldAnimate} onTypingStart={() => { shouldAnimateNextAssistantMessage.current = false }} /> : message.content}
                                                </div>
                                                {assistant && (
                                                    <div className="chat-message__actions">
                                                        <button className="chat-message__action" type="button" aria-label="Copy response"><Icon name="copy" /></button>
                                                        <button className="chat-message__action" type="button" aria-label="Helpful response"><Icon name="thumbsUp" /></button>
                                                        <button className="chat-message__action" type="button" aria-label="Unhelpful response"><Icon name="thumbsDown" /></button>
                                                    </div>
                                                )}
                                            </div>
                                        </article>
                                    )
                                })}
                                {pendingMessage && (
                                    <article className="chat-message chat-message--user">
                                        <div className="chat-message__avatar" aria-hidden="true">{initials}</div>
                                        <div className="chat-message__body">
                                            <div className="chat-message__meta">
                                                <span className="chat-message__author">{displayName}</span>
                                                <span className="chat-message__role">You</span>
                                            </div>
                                            <div className="chat-message__content">{pendingMessage}</div>
                                        </div>
                                    </article>
                                )}
                                {pendingMessage && (
                                    <article className="chat-message chat-message--assistant" aria-label="Perplexity is writing a response">
                                        <div className="chat-message__avatar" aria-hidden="true">✦</div>
                                        <div className="chat-message__body">
                                            <div className="chat-message__meta">
                                                <span className="chat-message__author">Perplexity</span>
                                                <span className="chat-message__role">AI assistant</span>
                                            </div>
                                            <div className="chat-message__content"><div className="chat-typing" aria-hidden="true"><span /><span /><span /></div></div>
                                        </div>
                                    </article>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className="chat-composer-area">
                    <form className="chat-composer" onSubmit={handleSend}>
                        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={handlePromptKeyDown} placeholder="Message Perplexity…" aria-label="Message Perplexity" rows="1" disabled={Boolean(pendingMessage)} />
                        <div className="chat-composer__footer">
                            <div className="chat-composer__tools">
                                <button className="chat-composer__icon-button" type="button" aria-label="Attach a file"><Icon name="attachment" /></button>
                                <button className="chat-composer__icon-button" type="button" aria-label="Search the web"><Icon name="globe" /></button>
                            </div>
                            <button className="chat-composer__send" type="submit" disabled={!prompt.trim() || Boolean(pendingMessage)} aria-label="Send message"><Icon name="send" /></button>
                        </div>
                    </form>
                    <p className="chat-disclaimer">Perplexity can make mistakes. Please verify important information.</p>
                </div>
            </section>
        </main>
    )
}

export default Dashboard
