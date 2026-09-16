import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Icon from './Icon'
import { logout } from '../../auth/services/auth.api'
import { useDispatch } from 'react-redux'
import { setUser } from '../../auth/auth.slice'

const ChatHeader = ({ setSidebarOpen, activeChat, handleNewChat, initials, displayName, theme, setTheme }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch();


    const handleLogout = async () => {
        try {
            await logout()
            dispatch(setUser(null))
            navigate('/login', { replace: true })
        } catch (error) {
            console.log(error)
        }
    }

    return (
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
                <div className="logout-wrapper">
                    <button className="logout-btn" onClick={handleLogout}>
                        <Icon name="exit" />
                    </button>

                    <div className="logout-tooltip">
                        Logout
                    </div>
                </div>
            </div>
        </header>
    )
}

export default ChatHeader