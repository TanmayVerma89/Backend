import Icon from './Icon'

const ChatSideBar = ({ sidebarOpen, setSidebarOpen, currentChatId, handleNewChat, onSelectChat, chats }) => {
  return (
    <aside className={`chat-sidebar ${sidebarOpen ? 'chat-sidebar--open' : ''}`} aria-label="Chat history">
                <div className="chat-sidebar__top">
                    <div className="chat-brand">
                        <span className="chat-brand__mark" aria-hidden="true">✦</span>
                        <span>Perplexity</span>
                    </div>
                    <button className="chat-sidebar__close" type="button" aria-label="Close chat history" onClick={() => setSidebarOpen(false)}>
                        <Icon name="close" />
                    </button>
                </div>

                <button className="chat-new-button" type="button" onClick={handleNewChat}>
                    <Icon name="plus" />
                    New chat
                </button>

                <div className="chat-sidebar__history">
                    <p className="chat-sidebar__label">Recent conversations</p>
                    {Object.keys(chats).length ? (
                        <ul className="chat-history-list">
                            {Object.values(chats).map((chat) => (
                                <li key={chat.id}>
                                    <button className={`chat-history-item ${chat.id === currentChatId ? 'chat-history-item--active' : ''}`} type="button" onClick={() => onSelectChat(chat)}>
                                        <Icon name="chat" />
                                        <span className="chat-history-item__title">{chat.title || 'Untitled conversation'}</span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="chat-history-empty">Your conversations will appear here.</p>
                    )}
                </div>

                <div className="chat-sidebar__footer">
                    <button className="chat-sidebar__utility" type="button"><Icon name="settings" /> Settings</button>
                    <button className="chat-sidebar__utility" type="button"><Icon name="help" /> Help &amp; support</button>
                </div>
            </aside>
  )
}

export default ChatSideBar
