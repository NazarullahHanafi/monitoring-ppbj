<!doctype html>
<html lang="id" class="bg-gray-50 dark:bg-gray-900">

<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title', 'Monitoring PPBJ')</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <link rel="icon" href="{{ asset('images/logo4.png') }}" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <script>
        (function () { var s = localStorage.getItem('theme'), d = window.matchMedia && window.matchMedia('(prefers-color-scheme:dark)').matches; document.documentElement.classList.toggle('dark', s === 'dark' || (!s && d)) })();
    </script>
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.1/xlsx.full.min.js"></script>
    @stack('styles')

    <style>
        .nav-item {
            position: relative;
            overflow: hidden;
            transition: all .3s cubic-bezier(.4, 0, .2, 1)
        }

        .nav-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(59, 130, 246, .1), transparent);
            transition: left .5s ease;
            z-index: 0
        }

        .nav-item:hover::before {
            left: 100%
        }

        .nav-item:hover {
            transform: translateX(4px) scale(1.02);
            box-shadow: 0 4px 15px -3px rgba(59, 130, 246, .3)
        }

        .nav-item.active {
            background: linear-gradient(135deg, #3b82f6, #2563eb);
            color: #fff !important;
            box-shadow: 0 4px 15px -3px rgba(59, 130, 246, .4);
            animation: navPulse 2s ease-in-out infinite
        }

        @keyframes navPulse {

            0%,
            100% {
                box-shadow: 0 4px 15px -3px rgba(59, 130, 246, .4)
            }

            50% {
                box-shadow: 0 8px 25px -5px rgba(59, 130, 246, .6)
            }
        }

        .nav-item .icon-box {
            transition: all .3s cubic-bezier(.68, -.55, .265, 1.55)
        }

        .nav-item:hover .icon-box {
            transform: rotate(10deg) scale(1.1)
        }

        .nav-item.active .icon-box {
            animation: iconBounce .6s ease
        }

        @keyframes iconBounce {

            0%,
            100% {
                transform: scale(1)
            }

            50% {
                transform: scale(1.2)
            }
        }

        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, .4);
            transform: scale(0);
            animation: rippleEff .6s ease-out;
            pointer-events: none
        }

        @keyframes rippleEff {
            to {
                transform: scale(4);
                opacity: 0
            }
        }

        #sidebarDesktop {
            transition: width .4s cubic-bezier(.4, 0, .2, 1)
        }

        @media (min-width: 768px) {
            #sidebarDesktop {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                height: 100vh;
                z-index: 45;
            }

            #mainContent {
                flex: none;
                width: calc(100% - 16rem);
                margin-left: 16rem;
                transition: width .4s cubic-bezier(.4, 0, .2, 1), margin-left .4s cubic-bezier(.4, 0, .2, 1);
            }

            #sidebarDesktop.w-20 ~ #mainContent {
                width: calc(100% - 5rem);
                margin-left: 5rem;
            }
        }

        .nav-text {
            transition: opacity .3s ease, transform .3s ease;
            white-space: nowrap
        }

        #sidebarDesktop.w-20 .nav-text {
            opacity: 0;
            transform: translateX(-10px);
            pointer-events: none
        }

        #sidebarMobile {
            transition: transform .3s cubic-bezier(.4, 0, .2, 1)
        }

        .badge-pulse {
            animation: badgePulse 2s ease-in-out infinite
        }

        @keyframes badgePulse {

            0%,
            100% {
                transform: scale(1)
            }

            50% {
                transform: scale(1.1)
            }
        }

        .dark .nav-item:hover {
            box-shadow: 0 4px 20px -3px rgba(59, 130, 246, .5), 0 0 0 1px rgba(59, 130, 246, .3)
        }

        .toggle-btn {
            transition: transform .3s ease
        }

        .toggle-btn:hover {
            transform: rotate(180deg)
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(-20px)
            }

            to {
                opacity: 1;
                transform: translateX(0)
            }
        }

        .nav-item {
            animation: slideIn .4s ease backwards
        }

        .nav-item:nth-child(1) {
            animation-delay: .05s
        }

        .nav-item:nth-child(2) {
            animation-delay: .1s
        }

        .nav-item:nth-child(3) {
            animation-delay: .15s
        }

        .nav-item:nth-child(4) {
            animation-delay: .2s
        }

        .nav-item:nth-child(5) {
            animation-delay: .25s
        }

        .nav-item:nth-child(6) {
            animation-delay: .3s
        }

        .nav-item:nth-child(7) {
            animation-delay: .35s
        }

        .chat-trigger-mention {
            position: absolute;
            bottom: -5px;
            right: -5px;
            min-width: 18px;
            height: 18px;
            padding: 0 5px;
            background: #6366f1;
            color: #fff;
            font-size: 9px;
            font-weight: 800;
            border-radius: 99px;
            display: none;
            align-items: center;
            justify-content: center;
            border: 2px solid #fff;
            line-height: 1;
            animation: chatBadgePop .35s cubic-bezier(.68, -.55, .265, 1.55)
        }

        .dark .chat-trigger-mention {
            border-color: #1e293b
        }

        .chat-trigger-mention.has-count {
            font-size: 8px;
            min-width: 22px
        }

        .cp-head-mention {
            cursor: pointer;
            font-size: .82rem;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 8px;
            background: rgba(255, 255, 255, .15);
            transition: all .15s;
            line-height: 1;
            flex-shrink: 0
        }

        .cp-head-mention:hover {
            background: rgba(255, 255, 255, .25);
            transform: scale(1.1)
        }

        .msg-wrap.mention-seen .msg-bubble {
            border-color: transparent !important;
            box-shadow: none !important;
            animation: none !important
        }

        @keyframes mentionFlash {
            0% {
                box-shadow: 0 0 0 0 rgba(99, 102, 241, .5)
            }

            50% {
                box-shadow: 0 0 0 6px rgba(99, 102, 241, .2)
            }

            100% {
                box-shadow: 0 0 0 0 rgba(99, 102, 241, 0)
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px)
            }

            to {
                opacity: 1;
                transform: translateY(0)
            }
        }

        .animate-fade-in {
            animation: fadeIn .5s ease-out
        }

        .custom-scrollbar::-webkit-scrollbar {
            width: 4px
        }

        .custom-scrollbar::-webkit-scrollbar-track {
            background: transparent
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, .4);
            border-radius: 2px
        }

        .presence-wrap {
            position: relative
        }

        .presence-trigger {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 5px 10px 5px 6px;
            border-radius: 99px;
            border: 1px solid rgba(0, 0, 0, .08);
            background: rgba(255, 255, 255, .6);
            backdrop-filter: blur(8px);
            cursor: pointer;
            transition: all .2s;
            user-select: none
        }

        .dark .presence-trigger {
            background: rgba(30, 41, 59, .6);
            border-color: rgba(255, 255, 255, .1)
        }

        .presence-trigger:hover {
            background: rgba(255, 255, 255, .9);
            border-color: rgba(99, 102, 241, .3);
            box-shadow: 0 2px 12px rgba(99, 102, 241, .15)
        }

        .avatar-stack {
            display: flex;
            align-items: center
        }

        .av {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .62rem;
            font-weight: 800;
            color: #fff;
            border: 2px solid #fff;
            flex-shrink: 0;
            position: relative
        }

        .dark .av {
            border-color: #1e293b
        }

        .av+.av {
            margin-left: -8px
        }

        .av-overflow {
            background: #e5e7eb;
            color: #374151;
            font-size: .58rem;
            font-weight: 800
        }

        .dark .av-overflow {
            background: #374151;
            color: #d1d5db
        }

        .online-indicator {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: .72rem;
            font-weight: 600;
            color: #374151;
            white-space: nowrap
        }

        .dark .online-indicator {
            color: #d1d5db
        }

        .green-dot {
            width: 7px;
            height: 7px;
            background: #22c55e;
            border-radius: 50%;
            flex-shrink: 0;
            box-shadow: 0 0 0 2px rgba(34, 197, 94, .3);
            animation: gPulse 2s ease-in-out infinite
        }

        @keyframes gPulse {

            0%,
            100% {
                box-shadow: 0 0 0 2px rgba(34, 197, 94, .3)
            }

            50% {
                box-shadow: 0 0 0 5px rgba(34, 197, 94, 0)
            }
        }

        .presence-panel {
            position: absolute;
            right: 0;
            top: calc(100% + 10px);
            width: 260px;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, .08);
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, .12);
            overflow: hidden;
            z-index: 60;
            opacity: 0;
            transform: translateY(-8px) scale(.97);
            pointer-events: none;
            transition: opacity .18s ease, transform .18s ease
        }

        .dark .presence-panel {
            background: #1e293b;
            border-color: rgba(255, 255, 255, .1);
            box-shadow: 0 8px 32px rgba(0, 0, 0, .5)
        }

        .presence-panel.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto
        }

        .pp-header {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 16px 10px;
            border-bottom: 1px solid rgba(0, 0, 0, .06)
        }

        .pp-title {
            font-size: .72rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: .08em;
            color: #9ca3af
        }

        .pp-count {
            margin-left: auto;
            background: #dcfce7;
            color: #15803d;
            font-size: .62rem;
            font-weight: 800;
            padding: 2px 8px;
            border-radius: 99px
        }

        .dark .pp-count {
            background: rgba(34, 197, 94, .15);
            color: #4ade80
        }

        .pp-list {
            max-height: 260px;
            overflow-y: auto;
            padding: 6px
        }

        .pp-list::-webkit-scrollbar {
            width: 3px
        }

        .pp-list::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, .3);
            border-radius: 2px
        }

        .pp-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border-radius: 10px;
            transition: background .15s;
            cursor: default
        }

        .pp-row:hover {
            background: rgba(99, 102, 241, .06)
        }

        .dark .pp-row:hover {
            background: rgba(99, 102, 241, .12)
        }

        .pp-row.me {
            background: rgba(99, 102, 241, .07)
        }

        .dark .pp-row.me {
            background: rgba(99, 102, 241, .15)
        }

        .pp-av {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .65rem;
            font-weight: 800;
            color: #fff;
            flex-shrink: 0;
            position: relative
        }

        .pp-av::after {
            content: '';
            position: absolute;
            bottom: 0;
            right: 0;
            width: 9px;
            height: 9px;
            background: #22c55e;
            border-radius: 50%;
            border: 2px solid #fff
        }

        .dark .pp-av::after {
            border-color: #1e293b
        }

        .pp-info {
            flex: 1;
            min-width: 0
        }

        .pp-name {
            font-size: .8rem;
            font-weight: 600;
            color: #111827;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis
        }

        .dark .pp-name {
            color: #f1f5f9
        }

        .pp-dept {
            font-size: .68rem;
            color: #9ca3af;
            text-transform: capitalize
        }

        .pp-me-tag {
            font-size: .6rem;
            font-weight: 700;
            background: rgba(99, 102, 241, .12);
            color: #6366f1;
            padding: 2px 7px;
            border-radius: 6px;
            flex-shrink: 0
        }

        .dark .pp-me-tag {
            background: rgba(99, 102, 241, .2);
            color: #a5b4fc
        }

        .pp-empty {
            padding: 20px;
            text-align: center;
            font-size: .78rem;
            color: #9ca3af
        }

        .pp-footer {
            padding: 8px 12px;
            border-top: 1px solid rgba(0, 0, 0, .06);
            text-align: center
        }

        .dark .pp-footer {
            border-top-color: rgba(255, 255, 255, .08)
        }

        .pp-footer-btn {
            font-size: .72rem;
            color: #6366f1;
            font-weight: 700;
            cursor: pointer;
            background: none;
            border: none;
            padding: 5px 12px;
            border-radius: 8px;
            transition: all .2s
        }

        .pp-footer-btn:hover {
            background: rgba(99, 102, 241, .08)
        }

        .dark .pp-footer-btn {
            color: #a5b4fc
        }

        @keyframes moodPop {
            0% {
                transform: scale(0) rotate(-15deg)
            }

            60% {
                transform: scale(1.25) rotate(5deg)
            }

            100% {
                transform: scale(1) rotate(0)
            }
        }

        @keyframes moodFloat {

            0%,
            100% {
                transform: translateY(0)
            }

            50% {
                transform: translateY(-2px)
            }
        }

        .mood-tag {
            position: absolute;
            bottom: -3px;
            right: -3px;
            font-size: 11px;
            line-height: 1;
            width: 16px;
            height: 16px;
            background: #fff;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 1px 4px rgba(0, 0, 0, .15);
            z-index: 2;
            animation: moodPop .4s cubic-bezier(.68, -.55, .265, 1.55)
        }

        .dark .mood-tag {
            background: #1e293b
        }

        .mood-tag-sm {
            bottom: -4px;
            right: -4px;
            font-size: 9px;
            width: 14px;
            height: 14px
        }

        .my-mood-float {
            font-size: 1rem;
            animation: moodFloat 3s ease-in-out infinite;
            display: inline-block;
            cursor: default
        }

        .mood-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            padding: 8px 4px;
            max-width: 340px;
            margin: 0 auto
        }

        @media(max-width:400px) {
            .mood-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 8px
            }
        }

        .mood-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
            padding: 12px 6px 10px;
            border-radius: 14px;
            border: 2px solid transparent;
            background: rgba(0, 0, 0, .03);
            cursor: pointer;
            transition: all .25s cubic-bezier(.4, 0, .2, 1);
            user-select: none
        }

        .mood-btn:hover {
            background: rgba(99, 102, 241, .08);
            border-color: rgba(99, 102, 241, .25);
            transform: translateY(-4px) scale(1.08)
        }

        .mood-btn:active {
            transform: translateY(0) scale(.95);
            transition-duration: .1s
        }

        .dark .mood-btn {
            background: rgba(255, 255, 255, .04)
        }

        .dark .mood-btn:hover {
            background: rgba(99, 102, 241, .12);
            border-color: rgba(99, 102, 241, .3)
        }

        .mood-btn .m-emoji {
            font-size: 1.8rem;
            line-height: 1;
            transition: transform .2s
        }

        .mood-btn:hover .m-emoji {
            transform: scale(1.15) rotate(-5deg)
        }

        .mood-btn .m-label {
            font-size: .62rem;
            font-weight: 700;
            color: #6b7280
        }

        .dark .mood-btn .m-label {
            color: #9ca3af
        }

        .mood-btn:hover .m-label {
            color: #6366f1
        }

        .mood-desc {
            text-align: center;
            font-size: .75rem;
            color: #9ca3af;
            margin-top: 4px;
            min-height: 1.2em
        }

        .dark .mood-desc {
            color: #6b7280
        }

        .mood-skip {
            display: block;
            text-align: center;
            margin-top: 10px;
            font-size: .72rem;
            color: #9ca3af;
            cursor: pointer;
            padding: 4px;
            transition: color .2s;
            background: none;
            border: none;
            width: 100%
        }

        .mood-skip:hover {
            color: #6366f1
        }

        .chat-trigger {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            border-radius: 12px;
            background: rgba(255, 255, 255, .6);
            border: 1px solid rgba(0, 0, 0, .08);
            cursor: pointer;
            transition: all .25s cubic-bezier(.4, 0, .2, 1);
            flex-shrink: 0;
            backdrop-filter: blur(8px)
        }

        .dark .chat-trigger {
            background: rgba(30, 41, 59, .6);
            border-color: rgba(255, 255, 255, .1)
        }

        .chat-trigger:hover {
            background: rgba(99, 102, 241, .12);
            border-color: rgba(99, 102, 241, .35);
            transform: scale(1.06)
        }

        .chat-trigger:active {
            transform: scale(.94)
        }

        .chat-trigger.active {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-color: transparent;
            color: #fff;
            box-shadow: 0 4px 16px rgba(99, 102, 241, .4)
        }

        .chat-trigger-badge {
            position: absolute;
            top: -4px;
            right: -4px;
            min-width: 17px;
            height: 17px;
            padding: 0 4px;
            background: #ef4444;
            color: #fff;
            font-size: 10px;
            font-weight: 800;
            border-radius: 99px;
            display: none;
            align-items: center;
            justify-content: center;
            border: 2px solid #fff;
            line-height: 1
        }

        .dark .chat-trigger-badge {
            border-color: #111827
        }

        .chat-trigger-badge.visible {
            display: flex
        }

        .chat-panel {
            position: fixed;
            top: 64px;
            right: 12px;
            width: 385px;
            max-width: calc(100vw - 24px);
            height: calc(100dvh - 80px);
            max-height: 540px;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, .09);
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, .12);
            z-index: 100;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            opacity: 0;
            transform: translateY(-14px) scale(.96);
            pointer-events: none;
            transition: opacity .22s ease, transform .25s cubic-bezier(.34, 1.56, .64, 1);
            transform-origin: top right
        }

        .dark .chat-panel {
            background: #1e293b;
            border-color: rgba(255, 255, 255, .1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, .5)
        }

        .chat-panel.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto
        }

        @media(max-width:640px) {
            .chat-panel {
                top: 58px;
                right: 6px;
                left: 6px;
                width: auto;
                max-width: none;
                height: calc(100dvh - 64px);
                max-height: none;
                border-radius: 16px;
                transform-origin: top center
            }
        }

        @media(max-width:380px) {
            .chat-panel {
                top: 52px;
                right: 0;
                left: 0;
                height: calc(100dvh - 52px);
                border-radius: 0
            }
        }

        .chat-panel.fullscreen {
            inset: 0;
            width: 100vw;
            max-width: none;
            height: 100dvh;
            max-height: none;
            border: 0;
            border-radius: 0;
            z-index: 160;
            transform-origin: center
        }

        .chat-panel.fullscreen .cp-messages .msg-wrap,
        .chat-panel.fullscreen .cp-history-control {
            width: min(920px, 100%);
            margin-left: auto;
            margin-right: auto
        }

        .chat-panel.fullscreen .cp-messages {
            padding-left: max(16px, calc((100vw - 960px) / 2));
            padding-right: max(16px, calc((100vw - 960px) / 2))
        }

        .chat-panel.fullscreen .cp-input-wrap,
        .chat-panel.fullscreen .cp-reply-bar,
        .chat-panel.fullscreen .cp-typing {
            width: min(920px, 100%);
            margin-left: auto;
            margin-right: auto
        }

        .chat-panel.minimized {
            inset: auto 12px 12px auto;
            width: min(310px, calc(100vw - 24px));
            max-width: none;
            height: 56px;
            max-height: 56px;
            border-radius: 16px;
            transform-origin: bottom right
        }

        .chat-panel.minimized > :not(.cp-head) {
            display: none !important
        }

        .chat-panel.minimized .cp-head {
            min-height: 56px;
            padding: 9px 10px 9px 14px;
            cursor: pointer
        }

        .chat-panel.minimized #cpSearchBtn,
        .chat-panel.minimized #cpNotifyBtn,
        .chat-panel.minimized #cpFullscreenBtn,
        .chat-panel.minimized #cpHeadMention {
            display: none !important
        }

        body.chat-fullscreen-open {
            overflow: hidden
        }

        .cp-head {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 14px 16px 12px;
            flex-shrink: 0;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: #fff
        }

        .cp-head-info {
            flex: 1;
            min-width: 0
        }

        .cp-head-action {
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 8px;
            background: rgba(255, 255, 255, .15);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            opacity: .8;
            transition: all .15s;
            flex-shrink: 0
        }

        .cp-head-action:hover,
        .cp-head-action.active {
            opacity: 1;
            background: rgba(255, 255, 255, .28)
        }

        .cp-head-action.notify-active {
            color: #d1fae5;
            box-shadow: inset 0 0 0 1px rgba(209, 250, 229, .5)
        }

        .cp-head-action svg {
            width: 16px;
            height: 16px
        }

        .cp-title {
            font-size: .85rem;
            font-weight: 700;
            flex: 1
        }

        .cp-sub {
            font-size: .68rem;
            opacity: .8;
            margin-top: 1px
        }

        .cp-close {
            cursor: pointer;
            opacity: .7;
            font-size: 18px;
            line-height: 1;
            border: none;
            background: rgba(255, 255, 255, .15);
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all .15s
        }

        .cp-close:hover {
            opacity: 1;
            background: rgba(255, 255, 255, .25)
        }

        .cp-search-panel {
            display: none;
            padding: 10px 12px;
            background: #f8fafc;
            border-bottom: 1px solid #e5e7eb;
            flex-shrink: 0
        }

        .dark .cp-search-panel {
            background: #172033;
            border-color: rgba(255, 255, 255, .08)
        }

        .cp-search-panel.open {
            display: block
        }

        .cp-search-row {
            display: flex;
            gap: 7px;
            align-items: center
        }

        .cp-search-input {
            flex: 1;
            min-width: 0;
            border: 1px solid #d1d5db;
            border-radius: 10px;
            padding: 8px 10px;
            font-size: .76rem;
            color: #111827;
            background: #fff;
            outline: none
        }

        .cp-search-input:focus {
            border-color: #818cf8;
            box-shadow: 0 0 0 2px rgba(99, 102, 241, .12)
        }

        .dark .cp-search-input {
            background: #273449;
            color: #f1f5f9;
            border-color: #475569
        }

        .cp-search-cancel {
            border: none;
            background: transparent;
            color: #6366f1;
            font-size: .7rem;
            font-weight: 700;
            cursor: pointer;
            padding: 6px 2px
        }

        .cp-search-status {
            font-size: .65rem;
            color: #9ca3af;
            padding-top: 7px
        }

        .cp-search-results {
            max-height: 190px;
            overflow-y: auto;
            margin-top: 4px
        }

        .cp-search-result {
            width: 100%;
            border: none;
            background: transparent;
            text-align: left;
            padding: 8px 6px;
            border-radius: 9px;
            cursor: pointer;
            display: block
        }

        .cp-search-result:hover {
            background: rgba(99, 102, 241, .08)
        }

        .dark .cp-search-result:hover {
            background: rgba(129, 140, 248, .12)
        }

        .cp-search-result-head {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            font-size: .64rem;
            color: #9ca3af
        }

        .cp-search-result-name {
            color: #6366f1;
            font-weight: 700
        }

        .dark .cp-search-result-name {
            color: #a5b4fc
        }

        .cp-search-result-text {
            margin-top: 3px;
            font-size: .72rem;
            line-height: 1.35;
            color: #374151;
            word-break: break-word
        }

        .dark .cp-search-result-text {
            color: #e2e8f0
        }

        .cp-messages {
            flex: 1;
            overflow-y: auto;
            padding: 12px 12px 8px;
            display: flex;
            flex-direction: column;
            gap: 8px;
            scroll-behavior: smooth
        }

        .cp-messages::-webkit-scrollbar {
            width: 4px
        }

        .cp-messages::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, .3);
            border-radius: 2px
        }

        .msg-wrap {
            display: flex;
            gap: 8px;
            align-items: flex-end;
            animation: msgIn .25s ease
        }

        @keyframes msgIn {
            from {
                opacity: 0;
                transform: translateY(10px)
            }

            to {
                opacity: 1;
                transform: translateY(0)
            }
        }

        .msg-wrap.mine {
            flex-direction: row-reverse
        }

        .msg-av {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            font-weight: 800;
            color: #fff;
            flex-shrink: 0
        }

        .msg-body {
            display: flex;
            flex-direction: column;
            gap: 2px;
            max-width: 75%
        }

        .msg-wrap.mine .msg-body {
            align-items: flex-end
        }

        .msg-sender {
            font-size: .62rem;
            color: #9ca3af;
            font-weight: 600;
            padding: 0 4px
        }

        .msg-wrap.mine .msg-sender {
            display: none
        }

        .mention-hl {
            color: #818cf8;
            font-weight: 700
        }

        .msg-wrap.mine .mention-hl {
            color: #c7d2fe
        }

        .mention-all-hl {
            background: rgba(99, 102, 241, .15);
            color: #6366f1;
            font-weight: 700;
            padding: 0 3px;
            border-radius: 4px
        }

        .msg-wrap.mine .mention-all-hl {
            background: rgba(255, 255, 255, .2);
            color: #fff
        }

        .msg-wrap.mentioned-me .msg-bubble {
            border: 1.5px solid rgba(99, 102, 241, .4);
            box-shadow: 0 0 0 1px rgba(99, 102, 241, .1)
        }

        .dark .msg-wrap.mentioned-me .msg-bubble {
            border-color: rgba(129, 140, 248, .4)
        }

        .msg-reply {
            font-size: .68rem;
            background: rgba(0, 0, 0, .05);
            border-left: 3px solid #6366f1;
            padding: 4px 8px;
            border-radius: 6px 6px 0 0;
            color: #6b7280;
            margin-bottom: -4px
        }

        .dark .msg-reply {
            background: rgba(255, 255, 255, .06);
            color: #9ca3af
        }

        .msg-reply-author {
            font-weight: 700;
            color: #6366f1;
            font-size: .63rem
        }

        .dark .msg-reply-author {
            color: #a5b4fc
        }

        .msg-bubble {
            padding: 9px 13px;
            border-radius: 18px;
            font-size: .82rem;
            line-height: 1.45;
            word-break: break-word;
            cursor: default;
            background: #f3f4f6;
            color: #111827;
            border-bottom-left-radius: 4px;
            transition: filter .15s
        }

        .dark .msg-bubble {
            background: #334155;
            color: #f1f5f9
        }

        .msg-wrap.mine .msg-bubble {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: #fff;
            border-bottom-left-radius: 18px;
            border-bottom-right-radius: 4px
        }

        .msg-bubble:hover {
            filter: brightness(.97)
        }

        .msg-share-card {
            width: min(270px, 72vw);
            margin-bottom: 5px;
            padding: 10px 11px;
            border: 1px solid rgba(99, 102, 241, .2);
            border-radius: 14px;
            background: linear-gradient(145deg, #fff, #f5f7ff);
            box-shadow: 0 4px 14px rgba(79, 70, 229, .08)
        }

        .dark .msg-share-card {
            background: linear-gradient(145deg, #1e293b, #25324a);
            border-color: rgba(165, 180, 252, .2)
        }

        .msg-wrap.mine .msg-share-card {
            border-color: rgba(139, 92, 246, .28)
        }

        .msg-share-head {
            display: flex;
            align-items: center;
            gap: 7px;
            margin-bottom: 6px
        }

        .msg-share-label {
            padding: 2px 7px;
            border-radius: 999px;
            background: #4f46e5;
            color: #fff;
            font-size: .58rem;
            font-weight: 800;
            letter-spacing: .05em
        }

        .msg-share-number {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #4338ca;
            font-size: .7rem;
            font-weight: 750
        }

        .dark .msg-share-number {
            color: #c7d2fe
        }

        .msg-share-title {
            color: #111827;
            font-size: .76rem;
            font-weight: 700;
            line-height: 1.35;
            margin-bottom: 8px
        }

        .dark .msg-share-title {
            color: #f8fafc
        }

        .msg-share-fields {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 6px 10px
        }

        .msg-share-field-label {
            display: block;
            color: #9ca3af;
            font-size: .56rem;
            text-transform: uppercase;
            letter-spacing: .03em
        }

        .msg-share-field-value {
            display: block;
            overflow: hidden;
            color: #4b5563;
            font-size: .66rem;
            font-weight: 600;
            text-overflow: ellipsis;
            white-space: nowrap
        }

        .dark .msg-share-field-value {
            color: #cbd5e1
        }

        .msg-meta {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 0 4px;
            position: relative
        }

        .msg-edited {
            color: #9ca3af;
            font-size: .56rem;
            font-style: italic
        }

        .msg-react-add {
            border: none;
            background: transparent;
            color: #9ca3af;
            font-size: .7rem;
            cursor: pointer;
            opacity: 0;
            padding: 1px 3px;
            border-radius: 5px;
            transition: all .15s
        }

        .msg-wrap:hover .msg-react-add,
        .msg-react-add:focus {
            opacity: 1
        }

        .msg-react-add:hover {
            color: #6366f1;
            background: rgba(99, 102, 241, .1)
        }

        .msg-reactions {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            margin-top: 2px;
            min-height: 0
        }

        .msg-wrap.mine .msg-reactions {
            justify-content: flex-end
        }

        .msg-reaction {
            border: 1px solid #e5e7eb;
            background: #fff;
            border-radius: 999px;
            padding: 2px 7px;
            font-size: .68rem;
            line-height: 1.25;
            cursor: pointer;
            color: #6b7280;
            box-shadow: 0 1px 2px rgba(0, 0, 0, .04)
        }

        .dark .msg-reaction {
            background: #273449;
            border-color: #475569;
            color: #cbd5e1
        }

        .msg-reaction.mine {
            border-color: #818cf8;
            background: #eef2ff;
            color: #4f46e5
        }

        .dark .msg-reaction.mine {
            background: rgba(99, 102, 241, .22);
            color: #c7d2fe
        }

        @media(max-width:640px) {
            .msg-react-add {
                opacity: .8
            }
        }

        .msg-time {
            font-size: .6rem;
            color: #9ca3af
        }

        .msg-checks {
            font-size: .58rem;
            color: #9ca3af;
            cursor: pointer;
            padding: 1px 3px;
            border-radius: 3px;
            transition: all .15s;
            line-height: 1;
            letter-spacing: -1px
        }

        .msg-checks:hover {
            background: rgba(99, 102, 241, .1);
            color: #6366f1
        }

        .msg-checks-read {
            color: #818cf8
        }

        .dark .msg-checks-read {
            color: #a5b4fc
        }

        .read-popup {
            position: absolute;
            bottom: calc(100% + 6px);
            right: 0;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, .08);
            border-radius: 12px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, .12);
            padding: 10px 14px;
            min-width: 180px;
            max-width: 240px;
            z-index: 20;
            opacity: 0;
            transform: translateY(4px) scale(.95);
            pointer-events: none;
            transition: all .18s ease
        }

        .dark .read-popup {
            background: #1e293b;
            border-color: rgba(255, 255, 255, .1);
            box-shadow: 0 8px 24px rgba(0, 0, 0, .4)
        }

        .read-popup.open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto
        }

        .read-popup-title {
            font-size: .65rem;
            font-weight: 700;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: .06em;
            margin-bottom: 6px
        }

        .read-popup-names {
            font-size: .75rem;
            color: #374151;
            line-height: 1.6
        }

        .dark .read-popup-names {
            color: #d1d5db
        }

        .read-popup-name {
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 2px 0
        }

        .read-popup-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            flex-shrink: 0
        }

        .read-popup-empty {
            font-size: .72rem;
            color: #9ca3af;
            font-style: italic
        }

        .msg-del {
            font-size: .6rem;
            color: #9ca3af;
            cursor: pointer;
            opacity: 0;
            background: none;
            border: none;
            padding: 2px 4px;
            transition: opacity .15s, color .15s;
            border-radius: 4px
        }

        .msg-wrap:hover .msg-del {
            opacity: 1
        }

        .msg-del:hover {
            color: #ef4444;
            background: rgba(239, 68, 68, .1)
        }

        .ctx-menu {
            position: fixed;
            z-index: 200;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, .08);
            border-radius: 14px;
            box-shadow: 0 12px 36px rgba(0, 0, 0, .15);
            padding: 6px;
            min-width: 160px;
            display: none;
            animation: ctxIn .15s ease
        }

        .ctx-reactions {
            display: flex;
            gap: 3px;
            padding: 4px 5px 7px;
            border-bottom: 1px solid #f3f4f6;
            margin-bottom: 3px
        }

        .dark .ctx-reactions {
            border-color: rgba(255, 255, 255, .08)
        }

        .ctx-reaction-btn {
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 8px;
            background: transparent;
            cursor: pointer;
            font-size: 17px;
            transition: transform .12s, background .12s
        }

        .ctx-reaction-btn:hover {
            transform: scale(1.18);
            background: rgba(99, 102, 241, .1)
        }

        .dark .ctx-menu {
            background: #1e293b;
            border-color: rgba(255, 255, 255, .1);
            box-shadow: 0 12px 36px rgba(0, 0, 0, .5)
        }

        @keyframes ctxIn {
            from {
                opacity: 0;
                transform: scale(.9)
            }

            to {
                opacity: 1;
                transform: scale(1)
            }
        }

        .ctx-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 10px 14px;
            border-radius: 10px;
            font-size: .82rem;
            font-weight: 500;
            color: #374151;
            cursor: pointer;
            transition: all .12s;
            user-select: none
        }

        .dark .ctx-item {
            color: #e5e7eb
        }

        .ctx-item:hover {
            background: rgba(99, 102, 241, .08);
            color: #6366f1
        }

        .dark .ctx-item:hover {
            background: rgba(99, 102, 241, .15);
            color: #a5b4fc
        }

        .ctx-item.danger:hover {
            background: rgba(239, 68, 68, .08);
            color: #ef4444
        }

        .dark .ctx-item.danger:hover {
            background: rgba(239, 68, 68, .15);
            color: #f87171
        }

        .ctx-icon {
            font-size: 16px;
            width: 22px;
            text-align: center;
            flex-shrink: 0
        }

        @keyframes msgRemove {
            to {
                opacity: 0;
                transform: scale(.8) translateX(20px);
                height: 0;
                margin: 0;
                padding: 0;
                overflow: hidden
            }
        }

        .cp-reply-bar {
            display: none;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: rgba(99, 102, 241, .06);
            border-top: 1px solid rgba(99, 102, 241, .15);
            font-size: .72rem;
            flex-shrink: 0
        }

        .dark .cp-reply-bar {
            background: rgba(99, 102, 241, .1);
            border-color: rgba(99, 102, 241, .2)
        }

        .cp-reply-bar.visible {
            display: flex
        }

        .cp-reply-bar-icon {
            color: #6366f1;
            font-size: 13px
        }

        .cp-reply-text {
            flex: 1;
            color: #6366f1;
            font-weight: 600;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap
        }

        .dark .cp-reply-text {
            color: #a5b4fc
        }

        .cp-reply-close {
            cursor: pointer;
            color: #9ca3af;
            font-size: 14px;
            line-height: 1;
            background: none;
            border: none;
            padding: 2px 4px;
            border-radius: 4px
        }

        .cp-reply-close:hover {
            color: #ef4444;
            background: rgba(239, 68, 68, .1)
        }

        .cp-input-wrap {
            padding: 10px 12px;
            border-top: 1px solid rgba(0, 0, 0, .07);
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
            position: relative
        }

        .dark .cp-input-wrap {
            border-top-color: rgba(255, 255, 255, .08)
        }

        .cp-input-row {
            display: flex;
            gap: 8px;
            align-items: flex-end
        }

        .cp-textarea {
            flex: 1;
            resize: none;
            border: 1.5px solid rgba(0, 0, 0, .1);
            border-radius: 14px;
            padding: 9px 13px;
            font-size: .82rem;
            line-height: 1.4;
            color: #111827;
            background: #f9fafb;
            transition: border-color .15s, box-shadow .15s;
            max-height: 100px;
            overflow-y: auto;
            font-family: inherit
        }

        .dark .cp-textarea {
            background: #0f172a;
            border-color: rgba(255, 255, 255, .12);
            color: #f1f5f9
        }

        .cp-textarea:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, .12);
            background: #fff
        }

        .dark .cp-textarea:focus {
            background: #1e293b
        }

        .cp-textarea::placeholder {
            color: #9ca3af
        }

        .cp-send {
            width: 38px;
            height: 38px;
            border-radius: 12px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: #fff;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            transition: all .2s
        }

        .cp-send:hover:not(:disabled) {
            transform: scale(1.08);
            box-shadow: 0 4px 12px rgba(99, 102, 241, .4)
        }

        .cp-send:active:not(:disabled) {
            transform: scale(.93)
        }

        .cp-send:disabled {
            opacity: .35;
            cursor: not-allowed
        }

        .cp-send svg {
            width: 16px;
            height: 16px
        }

        .cp-send .send-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, .3);
            border-top-color: #fff;
            border-radius: 50%;
            animation: spinSend .6s linear infinite
        }

        @keyframes spinSend {
            to {
                transform: rotate(360deg)
            }
        }

        .cp-emoji-row {
            display: flex;
            gap: 3px;
            overflow-x: auto;
            scrollbar-width: none;
            padding-bottom: 2px;
            align-items: center
        }

        .cp-emoji-row::-webkit-scrollbar {
            display: none
        }

        .cp-eq {
            font-size: 18px;
            cursor: pointer;
            padding: 4px 5px;
            border-radius: 7px;
            flex-shrink: 0;
            transition: all .15s;
            border: 1.5px solid transparent;
            user-select: none;
            line-height: 1
        }

        .cp-eq:hover {
            background: rgba(99, 102, 241, .1);
            border-color: rgba(99, 102, 241, .2);
            transform: scale(1.2)
        }

        .cp-eq:active {
            transform: scale(.9)
        }

        .at-btn {
            position: relative;
            font-size: .78rem;
            font-weight: 800;
            color: #6366f1;
            cursor: pointer;
            padding: 4px 9px;
            border-radius: 7px;
            border: 1.5px solid transparent;
            transition: all .15s;
            user-select: none;
            flex-shrink: 0;
            margin-left: auto;
            background: rgba(99, 102, 241, .06)
        }

        .dark .at-btn {
            color: #a5b4fc;
            background: rgba(99, 102, 241, .1)
        }

        .at-btn:hover {
            background: rgba(99, 102, 241, .15);
            border-color: rgba(99, 102, 241, .3);
            transform: scale(1.05)
        }

        .at-btn:active {
            transform: scale(.92)
        }

        .at-btn-badge {
            position: absolute;
            top: -5px;
            right: -5px;
            min-width: 16px;
            height: 16px;
            padding: 0 4px;
            background: #ef4444;
            color: #fff;
            font-size: 9px;
            font-weight: 800;
            border-radius: 99px;
            display: none;
            align-items: center;
            justify-content: center;
            border: 1.5px solid #fff;
            line-height: 1
        }

        .dark .at-btn-badge {
            border-color: #1e293b
        }

        .at-btn-badge.visible {
            display: flex
        }

        .mention-dd {
            position: absolute;
            bottom: 100%;
            left: 0;
            right: 0;
            margin-bottom: 6px;
            background: #fff;
            border: 1px solid rgba(0, 0, 0, .08);
            border-radius: 14px;
            box-shadow: 0 -8px 28px rgba(0, 0, 0, .1);
            max-height: 220px;
            overflow-y: auto;
            display: none;
            z-index: 15
        }

        .dark .mention-dd {
            background: #1e293b;
            border-color: rgba(255, 255, 255, .1);
            box-shadow: 0 -8px 28px rgba(0, 0, 0, .4)
        }

        .mention-dd.open {
            display: block;
            animation: mentionIn .15s ease
        }

        @keyframes mentionIn {
            from {
                opacity: 0;
                transform: translateY(6px)
            }

            to {
                opacity: 1;
                transform: translateY(0)
            }
        }

        .mention-dd::-webkit-scrollbar {
            width: 3px
        }

        .mention-dd::-webkit-scrollbar-thumb {
            background: rgba(156, 163, 175, .3);
            border-radius: 2px
        }

        .mention-dd-header {
            padding: 8px 14px 6px;
            font-size: .65rem;
            font-weight: 700;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: .06em
        }

        .mention-dd-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 14px;
            cursor: pointer;
            transition: background .1s
        }

        .mention-dd-item:hover,
        .mention-dd-item.active {
            background: rgba(99, 102, 241, .08)
        }

        .dark .mention-dd-item:hover,
        .dark .mention-dd-item.active {
            background: rgba(99, 102, 241, .15)
        }

        .mention-dd-av {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 9px;
            font-weight: 800;
            color: #fff;
            flex-shrink: 0
        }

        .mention-dd-name {
            font-size: .8rem;
            font-weight: 600;
            color: #111827
        }

        .dark .mention-dd-name {
            color: #f1f5f9
        }

        .mention-dd-dept {
            font-size: .65rem;
            color: #9ca3af;
            text-transform: capitalize
        }

        .mention-dd-all {
            border-top: 1px solid rgba(0, 0, 0, .06);
            padding-top: 2px
        }

        .dark .mention-dd-all {
            border-top-color: rgba(255, 255, 255, .08)
        }

        .mention-dd-all-icon {
            font-size: 18px
        }

        .mention-dd-all-label {
            font-size: .8rem;
            font-weight: 700;
            color: #6366f1
        }

        .dark .mention-dd-all-label {
            color: #a5b4fc
        }

        .mention-dd-all-desc {
            font-size: .65rem;
            color: #9ca3af
        }

        .cp-char {
            font-size: .62rem;
            color: #9ca3af;
            text-align: right
        }

        .cp-char.warn {
            color: #f59e0b
        }

        .cp-char.danger {
            color: #ef4444;
            font-weight: 700
        }

        .cp-empty {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 10px;
            color: #9ca3af;
            padding: 20px
        }

        .cp-empty-icon {
            font-size: 40px;
            opacity: .4
        }

        .cp-empty-text {
            font-size: .78rem;
            text-align: center;
            line-height: 1.6
        }

        .cp-history-control {
            display: flex;
            justify-content: center;
            padding: 5px 0 10px
        }

        .cp-load-older {
            border: 1px solid rgba(99, 102, 241, .2);
            border-radius: 999px;
            background: rgba(99, 102, 241, .08);
            color: #4f46e5;
            cursor: pointer;
            font-size: .68rem;
            font-weight: 700;
            padding: 6px 12px;
            transition: all .15s
        }

        .cp-load-older:hover {
            background: rgba(99, 102, 241, .14);
            transform: translateY(-1px)
        }

        .cp-load-older:disabled {
            cursor: wait;
            opacity: .65;
            transform: none
        }

        .dark .cp-load-older {
            border-color: rgba(165, 180, 252, .22);
            color: #c7d2fe
        }

        .cp-typing {
            padding: 4px 12px;
            font-size: .65rem;
            color: #9ca3af;
            min-height: 18px;
            flex-shrink: 0
        }

        @keyframes sendFlash {
            0% {
                box-shadow: 0 0 0 0 rgba(34, 197, 94, .5)
            }

            70% {
                box-shadow: 0 0 0 8px rgba(34, 197, 94, 0)
            }

            100% {
                box-shadow: 0 0 0 0 rgba(34, 197, 94, 0)
            }
        }

        .send-flash {
            animation: sendFlash .5s ease
        }
    </style>
</head>

<body class="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
    <div class="min-h-screen flex">
        {{-- SIDEBAR DESKTOP --}}
        <aside id="sidebarDesktop"
            class="hidden md:flex md:flex-col bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 transition-all duration-300 w-64 shadow-xl shadow-gray-200/20 dark:shadow-black/20">
            <div
                class="px-5 py-4 flex items-center justify-between border-b border-gray-200/50 dark:border-gray-800/50">
                <div
                    class="font-bold text-lg whitespace-nowrap text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <span class="text-2xl">📊</span><span class="sidebar-text dark:text-white mt-1">Monitoring
                        PPBJ</span>
                </div>
                <button type="button" id="btnToggleSidebar" title="Toggle Sidebar"
                    class="toggle-btn p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all"><svg
                        class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                    </svg></button>
            </div>
            <nav class="px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar flex-1">
                @if(auth()->user()?->department === 'umum')
                    <a href="{{ route('dashboard.indexumum') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('dashboard*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📊</span><span class="nav-text font-medium">Dashboard</span></a>
                    <a href="{{ route('ppbj.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('ppbj*') && !request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📁</span><span class="nav-text font-medium">Management PPBJ</span></a>
                    <a href="{{ route('ppbj.report') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📈</span><span class="nav-text font-medium">Laporan</span></a>
                    <a href="{{ route('spph.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('spph*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📋</span><span class="nav-text font-medium">Penomoran SPPH</span></a>
                    <a href="{{ route('sp.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ (request()->is('sp') || request()->is('sp/*')) ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📝</span><span class="nav-text font-medium">Penomoran SP</span></a>
                    <a href="{{ route('sp-master-options.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('sp-master-options*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}">
                        <span class="icon-box text-xl">⚙️</span>
                        <span class="nav-text font-medium">Master Kontrak SP</span>
                    </a>

                    <a href="{{ route('approval.pr.index') }}"
                        class="nav-item group flex items-center justify-between gap-3 px-4 py-3 rounded-xl {{ request()->is('approval/pr-receipts*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}">
                        <div class="flex items-center gap-3"><span class="icon-box text-xl">✅</span><span
                                class="nav-text font-medium">Approval
                                PR</span>@if(isset($pendingApprovalCount) && $pendingApprovalCount > 0)<span
                                class="ml-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white dark:ring-gray-800 animate-bounce">{{ $pendingApprovalCount }}</span>@endif
                        </div>
                        <span id="badgePendingPr"
                            class="badge-pulse hidden text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full shadow-lg shadow-red-500/30">0</span>
                    </a>
                    @if(auth()->user()->role === 'superadmin')
                        <a href="{{ route('users.index') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('users*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                                class="icon-box text-xl">👥</span><span class="nav-text font-medium">Management Users</span></a>
                    @endif
                    <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                            href="{{ route('account.edit') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                                class="icon-box text-xl">👤</span><span class="nav-text font-medium">Management
                                Akun</span></a></div>
                @endif
                @if(auth()->user()?->department === 'operasional')
                    <a href="{{ route('ops.dashboard') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('ops/dashboard') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">📊</span><span class="nav-text font-medium">Dashboard</span></a>
                    <a href="{{ route('torpr.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('torpr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">🧾</span><span class="nav-text font-medium">TORPR</span></a>
                    <a href="{{ route('tracking.index') }}"
                        class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('tracking-pr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                            class="icon-box text-xl">🛰️</span><span class="nav-text font-medium">Tracking PR</span></a>
                    <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                            href="{{ route('account.edit') }}"
                            class="nav-item group flex items-center gap-3 px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400' }}"><span
                                class="icon-box text-xl">👤</span><span class="nav-text font-medium">Management
                                Akun</span></a></div>
                @endif
            </nav>
        </aside>

        {{-- SIDEBAR MOBILE --}}
        <div id="sidebarMobileWrapper" class="fixed inset-0 z-50 hidden md:hidden">
            <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" id="overlayCloseMobile"></div>
            <aside id="sidebarMobile"
                class="absolute left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-2xl transform -translate-x-full">
                <div
                    class="px-5 py-4 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <div class="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2"><span
                            class="text-2xl">📊</span> Monitoring PPBJ</div>
                    <button id="btnCloseMobile"
                        class="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all hover:rotate-90"><svg
                            class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg></button>
                </div>
                <nav class="px-3 py-4 space-y-1 overflow-y-auto h-[calc(100%-4rem)]">
                    @if(auth()->user()?->department === 'umum')
                        <a href="{{ route('dashboard.indexumum') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('dashboard*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📊</span><span
                                    class="font-medium">Dashboard</span></span></a>
                        <a href="{{ route('ppbj.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('ppbj*') && !request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📁</span><span
                                    class="font-medium">Management PPBJ</span></span></a>
                        <a href="{{ route('ppbj.report') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('ppbj/report*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📈</span><span
                                    class="font-medium">Laporan</span></span></a>
                        <a href="{{ route('spph.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('spph*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📋</span><span
                                    class="font-medium">Penomoran SPPH</span></span></a>
                        <a href="{{ route('sp.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('sp') || request()->is('sp/*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📝</span><span
                                    class="font-medium">Penomoran SP</span></span></a>
                        <a href="{{ route('approval.pr.index') }}"
                            class="nav-item flex items-center justify-between px-4 py-3 rounded-xl {{ request()->is('approval/pr-receipts*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">✅</span><span
                                    class="font-medium">Approval PR</span></span><span id="badgePendingPrMobile"
                                class="badge-pulse hidden text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full">0</span></a>
                        @if(auth()->user()->role === 'superadmin')
                            <a href="{{ route('users.index') }}"
                                class="nav-item block px-4 py-3 rounded-xl {{ request()->is('users*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                    class="flex items-center gap-3"><span class="text-xl">👥</span><span
                                        class="font-medium">Management Users</span></span></a>
                        @endif
                        <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                                href="{{ route('account.edit') }}"
                                class="nav-item block px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                    class="flex items-center gap-3"><span class="text-xl">👤</span><span
                                        class="font-medium">Management Akun</span></span></a></div>
                    @endif
                    @if(auth()->user()?->department === 'operasional')
                        <a href="{{ route('ops.dashboard') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('ops/dashboard') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">📊</span><span
                                    class="font-medium">Dashboard</span></span></a>
                        <a href="{{ route('torpr.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('torpr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">🧾</span><span
                                    class="font-medium">TORPR</span></span></a>
                        <a href="{{ route('tracking.index') }}"
                            class="nav-item block px-4 py-3 rounded-xl {{ request()->is('tracking-pr*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                class="flex items-center gap-3"><span class="text-xl">🛰️</span><span
                                    class="font-medium">Tracking PR</span></span></a>
                        <div class="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-800/50"><a
                                href="{{ route('account.edit') }}"
                                class="nav-item block px-4 py-3 rounded-xl {{ request()->is('account*') ? 'active' : 'text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20' }}"><span
                                    class="flex items-center gap-3"><span class="text-xl">👤</span><span
                                        class="font-medium">Management Akun</span></span></a></div>
                    @endif
                </nav>
            </aside>
        </div>

        {{-- MAIN --}}
        <main id="mainContent" class="flex-1 min-w-0">
            <div
                class="bg-white dark:bg-gray-800 md:bg-white/80 dark:md:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-700 md:border-gray-200/50 dark:md:border-gray-800/50 px-4 sm:px-6 py-3 flex items-center justify-between gap-2 sticky top-0 z-40">
                <div class="flex items-center gap-2 md:gap-3">
                    <button type="button" id="btnOpenMobile" title="Menu"
                        class="md:hidden p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-sm transition-all"><svg
                            class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg></button>
                    <div class="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                        {{ auth()->user()->name }} <span class="text-gray-400">|</span> <span
                            class="text-blue-600 dark:text-blue-400 capitalize">{{ auth()->user()->department }}</span>
                    </div>
                </div>
                <div class="flex items-center gap-2 sm:gap-3">
                    <div class="presence-wrap" id="presenceWrap">
                        <button type="button" class="presence-trigger" id="presenceTrigger"
                            title="Lihat siapa yang online">
                            @php
                                $colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6'];
                                $myColor = $colors[auth()->id() % count($colors)];
                                $myInitials = strtoupper(mb_substr(auth()->user()->name, 0, 1));
                                if (strpos(auth()->user()->name, ' ') !== false) {
                                    $pp = explode(' ', auth()->user()->name);
                                    $myInitials = strtoupper(mb_substr($pp[0], 0, 1) . mb_substr($pp[1], 0, 1));
                                }
                            @endphp
                            <div class="avatar-stack hidden sm:flex" id="avatarStack">
                                <div class="av" style="background:{{ $myColor }}">{{ $myInitials }}</div>
                            </div>
                            <div class="online-indicator">
                                <span class="green-dot"></span>
                                <span class="hidden sm:inline">Online</span>
                                <span id="onlineCountLabel"
                                    class="font-bold text-indigo-600 dark:text-indigo-400">1</span>
                                <span id="myMoodFloat" class="my-mood-float hidden"></span>
                            </div>
                        </button>
                        <div class="presence-panel" id="presencePanel">
                            <div class="pp-header"><span class="green-dot"></span><span class="pp-title">Sedang
                                    Online</span><span class="pp-count" id="ppCount">1</span></div>
                            <div class="pp-list" id="ppList">
                                <div class="pp-row me">
                                    <div class="pp-av" style="background:{{ $myColor }}">{{ $myInitials }}</div>
                                    <div class="pp-info">
                                        <div class="pp-name">{{ auth()->user()->name }}</div>
                                        <div class="pp-dept">{{ auth()->user()->department }}</div>
                                    </div><span class="pp-me-tag">Kamu</span>
                                </div>
                            </div>
                            <div class="pp-footer"><button type="button" class="pp-footer-btn" id="btnChangeMood">✏️
                                    Ganti mood</button></div>
                        </div>
                    </div>
                    <button type="button" class="chat-trigger" id="chatTrigger" title="Chat Tim">
                        <span class="chat-trigger-icon">💬</span>
                        <span class="chat-trigger-badge" id="chatBadge">0</span>
                        <span class="chat-trigger-mention" id="chatMentionBadge">@</span>
                    </button>
                    <button id="themeToggle" type="button" title="Toggle theme"
                        class="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">
                        <div class="transition-transform duration-500 rotate-0 dark:rotate-180"><span
                                class="dark:hidden text-xl">🌙</span><span class="hidden dark:inline text-xl">☀️</span>
                        </div>
                    </button>
                    <a href="/"
                        class="p-2.5 md:px-4 md:py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition-all shadow-md hover:shadow-lg group"><svg
                            class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V10z" />
                        </svg><span class="hidden md:inline">Dashboard</span></a>
                    <form method="POST" action="{{ route('logout') }}">@csrf<button type="submit"
                            class="p-2.5 sm:px-4 sm:py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all font-semibold text-gray-700 dark:text-gray-200 hover:text-red-600 dark:hover:text-red-400 flex items-center gap-2 group"><span
                                class="hidden sm:inline">Logout</span><svg
                                class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg></button></form>
                </div>
            </div>
            <div class="p-4 sm:p-6 animate-fade-in">@yield('content')</div>
        </main>
    </div>

    {{-- CONTEXT MENU --}}
    <div class="ctx-menu" id="ctxMenu">
        <div class="ctx-reactions" id="ctxReactions"></div>
        <div class="ctx-item" id="ctxReply"><span class="ctx-icon">↩️</span>Balas</div>
        <div class="ctx-item" id="ctxEdit"><span class="ctx-icon">✏️</span>Edit Pesan</div>
        <div class="ctx-item" id="ctxMention"><span class="ctx-icon">🏷️</span>Tag @Nama</div>
        <div class="ctx-item danger" id="ctxDelete"><span class="ctx-icon">🗑️</span>Hapus Pesan</div>
    </div>

    {{-- CHAT PANEL --}}
    <div class="chat-panel" id="chatPanel">
        <div class="cp-head">
            <div class="cp-head-info">
                <div class="cp-title">💬 Chat Tim</div>
                <div class="cp-sub" id="cpOnlineCount">Memuat...</div>
            </div>
            <button type="button" class="cp-head-action" id="cpSearchBtn" title="Cari pesan" aria-label="Cari pesan">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m21 21-4.35-4.35m1.35-5.65a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
            </button>
            <button type="button" class="cp-head-action" id="cpNotifyBtn" title="Aktifkan notifikasi dan suara" aria-label="Notifikasi chat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .53-.21 1.04-.59 1.41L4 17h5m6 0a3 3 0 0 1-6 0"/></svg>
            </button>
            <button type="button" class="cp-head-action" id="cpFullscreenBtn" title="Layar penuh" aria-label="Buka chat layar penuh">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5"/></svg>
            </button>
            <button type="button" class="cp-head-action" id="cpMinimizeBtn" title="Minimize" aria-label="Minimize chat">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>
            </button>
            <span class="cp-head-mention" id="cpHeadMention" title="Lihat pesan yang menandai">@</span>
            <button type="button" class="cp-close" id="btnCloseChat" title="Tutup">✕</button>
        </div>
        <div class="cp-search-panel" id="cpSearchPanel">
            <div class="cp-search-row">
                <input type="search" class="cp-search-input" id="cpSearchInput" maxlength="100" placeholder="Cari isi pesan atau nama..." autocomplete="off">
                <button type="button" class="cp-search-cancel" id="cpSearchClose">Tutup</button>
            </div>
            <div class="cp-search-status" id="cpSearchStatus">Ketik minimal 2 karakter.</div>
            <div class="cp-search-results" id="cpSearchResults"></div>
        </div>
        <div class="cp-messages custom-scrollbar" id="cpMessages">
            <div class="cp-empty" id="cpEmpty">
                <div class="cp-empty-icon">💬</div>
                <div class="cp-empty-text">Belum ada pesan.<br>Mulai percakapan sekarang!</div>
            </div>
        </div>
        <div class="cp-typing" id="cpTyping"></div>
        <div class="cp-reply-bar" id="cpReplyBar">
            <span class="cp-reply-bar-icon">↩</span>
            <span class="cp-reply-text" id="cpReplyText">Membalas pesan</span>
            <button type="button" class="cp-reply-close" id="btnCancelReply" title="Batal">✕</button>
        </div>
        <div class="cp-input-wrap" id="cpInputWrap">
            <div class="mention-dd" id="mentionDd">
                <div class="mention-dd-header">Tag seseorang</div>
                <div id="mentionDdList"></div>
            </div>
            <div class="cp-emoji-row" id="cpEmojiRow"></div>
            <div class="cp-input-row">
                <textarea class="cp-textarea" id="cpInput" placeholder="Ketik pesan... (Enter kirim)" rows="1"
                    maxlength="500"></textarea>
                <button type="button" class="cp-send" id="cpSendBtn" title="Kirim" disabled><svg id="sendIconSvg"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg></button>
            </div>
            <div class="cp-char" id="cpChar">0/500</div>
        </div>
    </div>

    @stack('scripts')

    <script>
        /* ═══ SIDEBAR ═══ */
        (function () {
            document.querySelectorAll('.nav-item').forEach(function (el) { el.addEventListener('click', function (e) { var r = this.getBoundingClientRect(), s = document.createElement('span'); s.style.cssText = 'width:20px;height:20px;left:' + (e.clientX - r.left - 10) + 'px;top:' + (e.clientY - r.top - 10) + 'px'; s.classList.add('ripple'); this.appendChild(s); setTimeout(function () { s.remove() }, 600) }) });
            if (localStorage.getItem('sidebar_collapsed') === '1') applyDC(true);
            function applyDC(c) { var el = document.getElementById('sidebarDesktop'); if (!el) return; el.classList.toggle('w-20', c); el.classList.toggle('w-64', !c); document.querySelectorAll('#sidebarDesktop .nav-text').forEach(function (t) { if (c) { t.style.opacity = '0'; t.style.transform = 'translateX(-10px)'; setTimeout(function () { t.classList.add('hidden') }, 300) } else { t.classList.remove('hidden'); setTimeout(function () { t.style.opacity = '1'; t.style.transform = 'translateX(0)' }, 50) } }); var ti = document.querySelector('#sidebarDesktop .sidebar-text'); if (ti) { if (c) { ti.style.opacity = '0'; setTimeout(function () { ti.classList.add('hidden') }, 300) } else { ti.classList.remove('hidden'); setTimeout(function () { ti.style.opacity = '1' }, 50) } } }
            function tSD() { var c = document.getElementById('sidebarDesktop') && document.getElementById('sidebarDesktop').classList.contains('w-20'); applyDC(!c); localStorage.setItem('sidebar_collapsed', !c ? '1' : '0') }
            function oSM() { var w = document.getElementById('sidebarMobileWrapper'); if (!w) return; w.classList.remove('hidden'); void w.offsetWidth; requestAnimationFrame(function () { document.getElementById('sidebarMobile') && document.getElementById('sidebarMobile').classList.remove('-translate-x-full') }) }
            function cSM() { document.getElementById('sidebarMobile') && document.getElementById('sidebarMobile').classList.add('-translate-x-full'); setTimeout(function () { document.getElementById('sidebarMobileWrapper') && document.getElementById('sidebarMobileWrapper').classList.add('hidden') }, 300) }
            var b = document.getElementById('btnToggleSidebar'); if (b) b.addEventListener('click', tSD);
            var b2 = document.getElementById('btnOpenMobile'); if (b2) b2.addEventListener('click', oSM);
            var b3 = document.getElementById('btnCloseMobile'); if (b3) b3.addEventListener('click', cSM);
            var b4 = document.getElementById('overlayCloseMobile'); if (b4) b4.addEventListener('click', cSM);
            document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { cSM(); cPP(); if (window._chatOpen) { if (window._chatHandleEscape) window._chatHandleEscape(); else window._chatToggle() } hideCtx() } });
        })();

        /* ═══ THEME ═══ */
        (function () { var r = document.documentElement, b = document.getElementById('themeToggle'); if (!b) return; var i = b.querySelector('div'); function s() { i.style.transform = r.classList.contains('dark') ? 'rotate(180deg)' : 'rotate(0deg)' } s(); b.addEventListener('click', function () { r.classList.toggle('dark'); localStorage.setItem('theme', r.classList.contains('dark') ? 'dark' : 'light'); s(); b.classList.add('animate-pulse'); setTimeout(function () { b.classList.remove('animate-pulse') }, 300) }) })();

        /* ═══ PRESENCE + MOOD ═══ */
        var cPP;
        (function () {
            var UH = '{{ route('presence.heartbeat') }}', UG = '{{ route('presence.mood.get') }}', US = '{{ route('presence.mood') }}',
                CSRF = (document.querySelector('meta[name="csrf-token"]') || {}).content || '', IV = 60000, MA = 4,
                CL = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'],
                MO = [{ e: '\u{1F604}', l: 'Senang', d: 'Hari menyenangkan!' }, { e: '\u{1F60A}', l: 'Baik', d: 'Berjalan lancar' }, { e: '\u{1F60E}', l: 'Keren', d: 'On top of the world' }, { e: '\u{1F525}', l: 'Semangat', d: "Full energy!" }, { e: '\u{1F389}', l: 'Eksis', d: 'Ada spesial' }, { e: '\u{1F62E}', l: 'Wow', d: 'Banyak kejutan' }, { e: '\u{1F610}', l: 'Biasa', d: 'Gitu aja' }, { e: '\u{1F62B}', l: 'Lelah', d: 'Butuh kopi' }, { e: '\u{1F622}', l: 'Sedih', d: 'Besok lebih baik' }, { e: '\u{1F912}', l: 'Sakit', d: 'Tidak enak badan' }];
            var tm = null, pO = false, myM = null, mC = false, mS = false;
            window._presenceUsers = [];
            function eH(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }
            function render(u) {
                window._presenceUsers = u; var st = document.getElementById('avatarStack'), pl = document.getElementById('ppList'), c = u.length,
                    oc = document.getElementById('onlineCountLabel'), pc = document.getElementById('ppCount'), cp = document.getElementById('cpOnlineCount');
                if (oc) oc.textContent = c; if (pc) pc.textContent = c; if (cp) cp.textContent = c + ' orang online';
                var me = null; for (var i = 0; i < u.length; i++) { if (u[i].is_me) { me = u[i]; break } }
                if (me) myM = me.mood || null; var mf = document.getElementById('myMoodFloat'); if (mf) { if (myM) { mf.textContent = myM; mf.classList.remove('hidden') } else { mf.classList.add('hidden') } }
                if (st) { var v = u.slice(0, MA), ov = c - MA, h = ''; for (var j = 0; j < v.length; j++) { var x = v[j]; h += '<div class="av" style="background:' + x.color + '" title="' + eH(x.name) + (x.mood ? ' ' + x.mood : '') + '">' + x.initials + (x.mood ? '<span class="mood-tag mood-tag-sm">' + x.mood + '</span>' : '') + '</div>' } if (ov > 0) h += '<div class="av av-overflow" title="' + ov + ' lainnya">+' + ov + '</div>'; st.innerHTML = h }
                if (pl) { if (!c) { pl.innerHTML = '<div class="pp-empty">Tidak ada yang online</div>'; return } var ph = ''; for (var k = 0; k < u.length; k++) { var w = u[k]; ph += '<div class="pp-row' + (w.is_me ? ' me' : '') + '"><div class="pp-av" style="background:' + w.color + '">' + w.initials + (w.mood ? '<span class="mood-tag">' + w.mood + '</span>' : '') + '</div><div class="pp-info"><div class="pp-name">' + eH(w.name) + '</div><div class="pp-dept">' + eH(w.department) + '</div></div>' + (w.is_me ? '<span class="pp-me-tag">Kamu</span>' : '') + '</div>' } pl.innerHTML = ph }
            }
            function hb() { fetch(UH, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { if (Array.isArray(d.online)) render(d.online) }).catch(function () { }) }
            function cmM() { if (mC) return; mC = true; fetch(UG, { headers: { 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { if (d.mood) { myM = d.mood; var mf = document.getElementById('myMoodFloat'); if (mf) { mf.textContent = myM; mf.classList.remove('hidden') } } else { setTimeout(sMP, 1500) } }).catch(function () { }) }
            function sMP() { if (typeof Swal !== 'undefined' && Swal.isVisible()) return; var de = document.createElement('div'); de.className = 'mood-desc'; de.textContent = 'Pilih salah satu'; var ge = document.createElement('div'); ge.className = 'mood-grid'; MO.forEach(function (m) { var b = document.createElement('button'); b.type = 'button'; b.className = 'mood-btn'; b.innerHTML = '<span class="m-emoji">' + m.e + '</span><span class="m-label">' + m.l + '</span>'; b.addEventListener('mouseenter', function () { de.textContent = m.d; de.style.color = '#6366f1' }); b.addEventListener('mouseleave', function () { de.textContent = 'Pilih salah satu'; de.style.color = '' }); b.addEventListener('click', function () { if (mS) return; mS = true; Swal.close(); fetch(US, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ mood: m.e }) }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { myM = d.mood; var mf = document.getElementById('myMoodFloat'); if (mf) { mf.textContent = myM; mf.classList.remove('hidden') } hb() }).catch(function () { myM = m.e; var mf = document.getElementById('myMoodFloat'); if (mf) { mf.textContent = myM; mf.classList.remove('hidden') } }).finally(function () { mS = false }); setTimeout(function () { Swal.fire({ html: '<div style="text-align:center;padding:12px 0"><div style="font-size:3.5rem;line-height:1">' + m.e + '</div><div style="font-size:.9rem;color:#111827;font-weight:700;margin-top:10px">' + m.l + '!</div><div style="font-size:.78rem;color:#9ca3af;margin-top:4px">' + m.d + '</div></div>', timer: 1600, timerProgressBar: true, showConfirmButton: false, background: 'rgba(255,255,255,.95)', backdrop: 'rgba(0,0,0,.08)', customClass: { popup: 'rounded-2xl shadow-2xl' } }) }, 200) }); ge.appendChild(b) }); var sb = document.createElement('button'); sb.type = 'button'; sb.className = 'mood-skip'; sb.textContent = 'Lewati dulu'; sb.addEventListener('click', function () { Swal.close() }); var ct = document.createElement('div'); ct.appendChild(ge); ct.appendChild(de); ct.appendChild(sb); Swal.fire({ title: 'Bagaimana harimu?', html: ct, showConfirmButton: false, showCloseButton: true, allowOutsideClick: false, background: 'rgba(255,255,255,.97)', backdrop: 'rgba(0,0,0,.15)', width: 'auto', padding: '0 0 4px 0', customClass: { popup: 'rounded-2xl shadow-2xl', closeButton: 'hover:rotate-90 transition-transform duration-300' }, didOpen: function () { ge.querySelectorAll('.mood-btn').forEach(function (b, i) { b.style.opacity = '0'; b.style.transform = 'translateY(15px) scale(.8)'; setTimeout(function () { b.style.transition = 'all .35s cubic-bezier(.68,-.55,.265,1.55)'; b.style.opacity = '1'; b.style.transform = 'translateY(0) scale(1)' }, 50 * i) }) } }) }
            window.showMoodPicker = sMP;
            function tPP() { pO = !pO; var p = document.getElementById('presencePanel'); if (p) p.classList.toggle('open', pO) }
            cPP = function () { pO = false; var p = document.getElementById('presencePanel'); if (p) p.classList.remove('open') };
            window.closePresencePanel = cPP;
            var pt = document.getElementById('presenceTrigger'); if (pt) pt.addEventListener('click', function (e) { e.stopPropagation(); tPP() });
            var mb = document.getElementById('btnChangeMood'); if (mb) mb.addEventListener('click', sMP);
            document.addEventListener('click', function (e) { var w = document.getElementById('presenceWrap'); if (pO && w && !w.contains(e.target)) cPP() });
            function start() { if (tm) return; hb(); cmM(); tm = setInterval(hb, IV) } function stop() { clearInterval(tm); tm = null }
            document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start() }); if (!document.hidden) start();
        })();

        /* ═══════════════════════════════════════
   LIVE CHAT — @ Badge, persisten via database
═══════════════════════════════════════ */
        (function () {
            var URL_MSGS = '/chat/messages', URL_MENTION_COUNT = '/chat/mentions/unread', URL_SEND = '/chat/send', URL_DEL = '/chat/',
                URL_READ = '/chat/read', URL_READS = '/chat/', URL_USERS = '/chat/users', URL_SEARCH = '/chat/search',
                URL_REACTIONS = '/chat/reactions', URL_REACT = '/chat/', URL_SHARE = '/chat/share',
                CSRF = (document.querySelector('meta[name="csrf-token"]') || {}).content || '',
                MY_ID = {{ auth()->id() }}, MAX_LEN = 500,
                EMOJIS = ['\u{1F604}', '\u{1F60A}', '\u{1F44D}', '\u{1F525}', '\u2764\uFE0F', '\u{1F389}', '\u{1F602}', '\u{1F914}', '\u{1F60E}', '\u{1F4AF}', '\u{1F64F}', '\u2705'],
                REACTION_EMOJIS = ['\u{1F44D}', '\u2764\uFE0F', '\u{1F602}', '\u{1F62E}', '\u{1F622}', '\u{1F64F}'],
                UCLS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6', '#f97316', '#84cc16', '#06b6d4', '#a855f7'];

            var chatOpen = false, chatFullscreen = false, chatMinimized = false, chatMaxId = 0, chatTimer = null, reactionTimer = null, mentionTimer = null, mentionRequestPending = false, replyToId = null, replyUser = null, unread = 0, sending = false;
            var mentionUnread = 0;
            var draftMentions = [];
            var mentionState = { active: false, start: 0, query: '' };
            var activeReadPopup = null;
            var ctxMsgData = null;
            var allUsersLoaded = null;
            var swalActive = false;
            var searchTimer = null, searchSequence = 0;
            var historyHasMore = false, historyLoading = false;
            var notifyEnabled = localStorage.getItem('chat_notify_' + MY_ID) === '1';
            var soundEnabled = localStorage.getItem('chat_sound_' + MY_ID) === '1';
            var summaryInitialized = false, lastSummaryMessageId = 0, audioContext = null, notificationWorkerPromise = null;

            /* ✅ Set pesan mention yang sudah dilihat (dari database i_read) */
            var seenMentionIds = {};

            function markMentionSeen(msgId) {
                seenMentionIds[String(msgId)] = true;
            }

            function isMentionSeen(msgId) {
                return !!seenMentionIds[String(msgId)];
            }

            var panel = document.getElementById('chatPanel'), trigger = document.getElementById('chatTrigger'), badge = document.getElementById('chatBadge'),
                mentionBadgeEl = document.getElementById('chatMentionBadge'),
                cpHeadMention = document.getElementById('cpHeadMention'),
                messagesEl = document.getElementById('cpMessages'), emptyEl = document.getElementById('cpEmpty'), inp = document.getElementById('cpInput'),
                sendBtn = document.getElementById('cpSendBtn'), charEl = document.getElementById('cpChar'), emojiRow = document.getElementById('cpEmojiRow'),
                mentionDd = document.getElementById('mentionDd'), mentionDdList = document.getElementById('mentionDdList'),
                ctxMenu = document.getElementById('ctxMenu'), ctxReactions = document.getElementById('ctxReactions'),
                searchBtn = document.getElementById('cpSearchBtn'), searchPanel = document.getElementById('cpSearchPanel'),
                searchInput = document.getElementById('cpSearchInput'), searchClose = document.getElementById('cpSearchClose'),
                searchStatus = document.getElementById('cpSearchStatus'), searchResults = document.getElementById('cpSearchResults'),
                notifyBtn = document.getElementById('cpNotifyBtn'), fullscreenBtn = document.getElementById('cpFullscreenBtn'),
                minimizeBtn = document.getElementById('cpMinimizeBtn'), chatHead = panel ? panel.querySelector('.cp-head') : null;

            function eH(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') }
            function isChatReadable() { return chatOpen && !chatMinimized && !document.hidden }
            function isNB() { if (!messagesEl) return true; return messagesEl.scrollHeight - messagesEl.scrollTop - messagesEl.clientHeight < 80 }
            function sBB() { if (messagesEl) messagesEl.scrollTop = messagesEl.scrollHeight }
            function sE(show) {
                if (!messagesEl) return;
                var current = messagesEl.querySelector('.cp-empty');
                if (!show) { if (current) current.remove(); return }
                if (!current) {
                    current = document.createElement('div'); current.className = 'cp-empty'; current.id = 'cpEmpty';
                    current.innerHTML = '<div class="cp-empty-icon">\u{1F4AC}</div><div class="cp-empty-text">Belum ada pesan.<br>Mulai percakapan sekarang!</div>';
                    messagesEl.appendChild(current);
                }
            }
            function renderHistoryControl() {
                if (!messagesEl) return;
                var old = messagesEl.querySelector('.cp-history-control'); if (old) old.remove();
                if (!historyHasMore) return;
                var holder = document.createElement('div'); holder.className = 'cp-history-control';
                var button = document.createElement('button'); button.type = 'button'; button.className = 'cp-load-older';
                button.disabled = historyLoading; button.textContent = historyLoading ? 'Memuat riwayat...' : 'Muat pesan lebih lama';
                holder.appendChild(button); messagesEl.insertBefore(holder, messagesEl.firstChild);
            }
            function rSB() { if (!sendBtn || !inp) return; sendBtn.disabled = sending || !inp.value.trim() || inp.value.length > MAX_LEN }
            function uB() { if (!badge) return; badge.textContent = unread > 9 ? '9+' : unread; if (unread > 0) badge.classList.add('visible'); else badge.classList.remove('visible') }

            function updateMentionBadges() {
                var c = mentionUnread;
                if (mentionBadgeEl) {
                    if (c > 0) { mentionBadgeEl.textContent = '@' + c; mentionBadgeEl.style.display = 'flex'; mentionBadgeEl.classList.add('has-count') }
                    else { mentionBadgeEl.textContent = '@'; mentionBadgeEl.style.display = 'none'; mentionBadgeEl.classList.remove('has-count') }
                }
                if (cpHeadMention) {
                    if (c > 0) { cpHeadMention.textContent = '@' + c; cpHeadMention.style.display = 'inline' }
                    else { cpHeadMention.style.display = 'none' }
                }
            }

            function refreshMentionSummary() {
                if (isChatReadable() || mentionRequestPending) return;
                mentionRequestPending = true;
                fetch(URL_MENTION_COUNT, { headers: { 'Accept': 'application/json' } })
                    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
                    .then(function (data) {
                        mentionUnread = Math.max(0, parseInt(data.count, 10) || 0);
                        unread = Math.max(0, parseInt(data.unread_count, 10) || 0);
                        uB();
                        updateMentionBadges();
                        handleSummaryNotification(data.latest_message || null);
                    })
                    .catch(function () { })
                    .finally(function () { mentionRequestPending = false });
            }

            function scrollToNextMention() {
                if (!messagesEl) return;
                var unseen = messagesEl.querySelectorAll('.msg-wrap.mentioned-me:not(.mention-seen)');
                if (!unseen.length) {
                    mentionUnread = 0; updateMentionBadges(); return;
                }
                unseen[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                unseen[0].classList.add('mention-seen');
                var bb = unseen[0].querySelector('.msg-bubble');
                if (bb) { bb.style.animation = 'mentionFlash .6s ease' }
                /* ✅ Simpan ke memori (sudah di database via markRead) */
                markMentionSeen(unseen[0].getAttribute('data-msg-id'));
                mentionUnread = Math.max(0, mentionUnread - 1);
                updateMentionBadges();
            }

            function toast(msg, type) { var dk = document.documentElement.classList.contains('dark'); if (typeof Swal !== 'undefined') Swal.fire({ toast: true, position: 'top-end', icon: type || 'info', title: msg, showConfirmButton: false, timer: 2500, timerProgressBar: true, background: dk ? '#1f2937' : '#fff', color: dk ? '#f3f4f6' : '#111827' }); else alert(msg) }
            function setSL(on) { if (!sendBtn) return; requestAnimationFrame(function () { if (on) { var sv = sendBtn.querySelector('svg'); if (sv) { var sp = document.createElement('span'); sp.className = 'send-spinner'; sv.replaceWith(sp) } } else { var sp2 = sendBtn.querySelector('.send-spinner'); if (sp2) { var ns = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); ns.setAttribute('fill', 'none'); ns.setAttribute('stroke', 'currentColor'); ns.setAttribute('viewBox', '0 0 24 24'); ns.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>'; sp2.replaceWith(ns) } } }) }

            function updateNotifyButton() {
                if (!notifyBtn) return;
                var active = notifyEnabled || soundEnabled;
                notifyBtn.classList.toggle('notify-active', active);
                notifyBtn.classList.toggle('active', active);
                notifyBtn.title = notifyEnabled ? 'Tes notifikasi dan suara' : 'Aktifkan notifikasi dan suara';
            }

            function saveNotificationPreferences() {
                localStorage.setItem('chat_notify_' + MY_ID, notifyEnabled ? '1' : '0');
                localStorage.setItem('chat_sound_' + MY_ID, soundEnabled ? '1' : '0');
                updateNotifyButton();
            }

            function registerNotificationWorker() {
                if (!window.isSecureContext || !('serviceWorker' in navigator)) return;
                notificationWorkerPromise = navigator.serviceWorker.register('/chat-notifications-sw.js')
                    .then(function (registration) { return registration })
                    .catch(function () { return null });
            }

            function playChatSound(force) {
                if (!force && !soundEnabled) return;
                try {
                    var AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (!AudioCtx) return;
                    if (!audioContext) audioContext = new AudioCtx();
                    if (audioContext.state === 'suspended') audioContext.resume();
                    var oscillator = audioContext.createOscillator(), gain = audioContext.createGain(), now = audioContext.currentTime;
                    oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(720, now); oscillator.frequency.exponentialRampToValueAtTime(920, now + .12);
                    gain.gain.setValueAtTime(.0001, now); gain.gain.exponentialRampToValueAtTime(.12, now + .015); gain.gain.exponentialRampToValueAtTime(.0001, now + .18);
                    oscillator.connect(gain); gain.connect(audioContext.destination); oscillator.start(now); oscillator.stop(now + .2);
                } catch (e) { }
            }

            function unlockChatAudio() {
                if (!soundEnabled) return;
                try {
                    var AudioCtx = window.AudioContext || window.webkitAudioContext;
                    if (!AudioCtx) return;
                    if (!audioContext) audioContext = new AudioCtx();
                    if (audioContext.state === 'suspended') audioContext.resume();
                } catch (e) { }
            }

            function showBrowserNotification(message) {
                if (!notifyEnabled || !('Notification' in window) || Notification.permission !== 'granted') return;
                var title = message.user_name || 'Chat Tim';
                var options = { body: (message.message || 'Pesan baru').substring(0, 140), tag: 'team-chat-' + message.id, icon: '/images/logo4.png', badge: '/images/logo4.png', data: { url: window.location.href } };
                var fallback = function () {
                    try {
                        var notification = new Notification(title, options);
                        notification.onclick = function () { window.focus(); notification.close(); if (!chatOpen) doToggle(); else if (chatMinimized) restoreChat() };
                        setTimeout(function () { notification.close() }, 7000);
                    } catch (e) { }
                };
                if (notificationWorkerPromise) {
                    notificationWorkerPromise.then(function (registration) {
                        if (registration && registration.showNotification) registration.showNotification(title, options).catch(fallback);
                        else fallback();
                    });
                } else fallback();
            }

            function showNotificationTest() {
                playChatSound(true);
                showBrowserNotification({ id: 'test-' + Date.now(), user_name: 'Chat Tim', message: 'Notifikasi dan suara berhasil diaktifkan.' });
            }

            function handleSummaryNotification(message) {
                if (!message || !message.id) return;
                var messageId = parseInt(message.id, 10) || 0;
                if (!summaryInitialized) { summaryInitialized = true; lastSummaryMessageId = messageId; return }
                if (messageId <= lastSummaryMessageId) return;
                lastSummaryMessageId = messageId;
                if (String(message.user_id) === String(MY_ID) || isChatReadable()) return;
                playChatSound(false);
                showBrowserNotification(message);
            }

            function toggleNotifications() {
                if (notifyEnabled) { showNotificationTest(); toast('Notifikasi tes dikirim', 'success'); return }
                soundEnabled = true; playChatSound(true);
                if (!('Notification' in window)) {
                    notifyEnabled = false; saveNotificationPreferences();
                    toast('Suara aktif. Browser ini tidak mendukung notifikasi.', 'info'); return;
                }
                if (Notification.permission === 'granted') {
                    notifyEnabled = true; saveNotificationPreferences(); showNotificationTest(); toast('Notifikasi tes dikirim', 'success'); return;
                }
                if (Notification.permission === 'denied') {
                    notifyEnabled = false; saveNotificationPreferences();
                    toast('Izin browser diblokir; suara tetap aktif.', 'warning'); return;
                }
                Notification.requestPermission().then(function (permission) {
                    notifyEnabled = permission === 'granted'; saveNotificationPreferences();
                    if (notifyEnabled) showNotificationTest();
                    toast(notifyEnabled ? 'Notifikasi tes dikirim' : 'Izin ditolak; suara tetap aktif.', notifyEnabled ? 'success' : 'warning');
                });
            }

            function toggleSearch(show) {
                if (!searchPanel) return;
                searchPanel.classList.toggle('open', show);
                if (searchBtn) searchBtn.classList.toggle('active', show);
                if (show) { setTimeout(function () { if (searchInput) searchInput.focus() }, 50) }
                else { clearTimeout(searchTimer); searchSequence++; if (searchInput) searchInput.value = ''; if (searchResults) searchResults.innerHTML = ''; if (searchStatus) searchStatus.textContent = 'Ketik minimal 2 karakter.' }
            }

            function renderSearchResults(messages, query) {
                if (!searchResults || !searchStatus) return;
                searchResults.innerHTML = '';
                if (!messages.length) { searchStatus.textContent = 'Tidak ada pesan yang cocok.'; return }
                searchStatus.textContent = messages.length + ' hasil untuk “' + query + '”';
                for (var i = 0; i < messages.length; i++) {
                    var message = messages[i], item = document.createElement('button'), time = '';
                    try { time = new Date(message.created_at).toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) } catch (e) { }
                    item.type = 'button'; item.className = 'cp-search-result'; item.setAttribute('data-search-id', message.id);
                    item.innerHTML = '<span class="cp-search-result-head"><span class="cp-search-result-name">' + eH(message.user_name || 'Pengguna') + '</span><span>' + eH(time) + '</span></span><span class="cp-search-result-text">' + eH(message.message || '') + '</span>';
                    searchResults.appendChild(item);
                }
            }

            function runSearch(query) {
                query = (query || '').trim();
                if (!searchStatus || !searchResults) return;
                if (query.length < 2) { searchStatus.textContent = 'Ketik minimal 2 karakter.'; searchResults.innerHTML = ''; return }
                var sequence = ++searchSequence; searchStatus.textContent = 'Mencari...'; searchResults.innerHTML = '';
                fetch(URL_SEARCH + '?q=' + encodeURIComponent(query), { headers: { 'Accept': 'application/json' } })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) { if (sequence !== searchSequence) return; renderSearchResults(data.messages || [], query) })
                    .catch(function () { if (sequence === searchSequence) searchStatus.textContent = 'Pencarian gagal. Coba lagi.' });
            }

            updateNotifyButton();
            registerNotificationWorker();
            document.addEventListener('pointerdown', unlockChatAudio, { once: true });
            if ('serviceWorker' in navigator) navigator.serviceWorker.addEventListener('message', function (event) { if (event.data && event.data.type === 'OPEN_TEAM_CHAT') { if (!chatOpen) doToggle(); else if (chatMinimized) restoreChat() } });

            function getAllUsers() {
                if (allUsersLoaded) return Promise.resolve(allUsersLoaded);
                return fetch(URL_USERS, { headers: { 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (data) { allUsersLoaded = data.map(function (u) { var p = (u.name || '').split(' '); return { id: u.id, name: u.name, department: u.department || '', initials: p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : (u.name || '??').substring(0, 2).toUpperCase(), color: UCLS[u.id % UCLS.length] } }); return allUsersLoaded }).catch(function () { return [] });
            }

            if (emojiRow) {
                for (var ei = 0; ei < EMOJIS.length; ei++) { (function (em) { var sp = document.createElement('span'); sp.className = 'cp-eq'; sp.textContent = em; sp.addEventListener('click', function (e) { e.stopPropagation(); if (!inp) return; var s = inp.selectionStart, en = inp.selectionEnd; inp.value = inp.value.substring(0, s) + em + inp.value.substring(en); inp.selectionStart = inp.selectionEnd = s + em.length; inp.dispatchEvent(new Event('input')); inp.focus() }); emojiRow.appendChild(sp) })(EMOJIS[ei]) }
                var atBtn = document.createElement('span'); atBtn.className = 'at-btn'; atBtn.textContent = '@';
                var atBadge = document.createElement('span'); atBadge.className = 'at-btn-badge'; atBadge.id = 'atBtnBadge'; atBadge.textContent = '0';
                atBtn.appendChild(atBadge); emojiRow.appendChild(atBtn);
                atBtn.addEventListener('click', function (e) { e.stopPropagation(); if (mentionDd.classList.contains('open')) closeMentionDd(); else { getAllUsers().then(function () { openMentionDd('') }); if (inp) inp.focus() } });
            }

            function openMentionDd(query) { mentionState.active = true; mentionState.query = (query || '').toLowerCase(); renderMentionDd(); mentionDd.classList.add('open') }
            function closeMentionDd() { mentionState.active = false; mentionState.query = ''; mentionDd.classList.remove('open') }
            function renderMentionDd() {
                var users = allUsersLoaded || [], q = mentionState.query, html = '';
                var filtered = users.filter(function (u) { return q === '' || u.name.toLowerCase().indexOf(q) !== -1 });
                for (var i = 0; i < filtered.length; i++) { var u = filtered[i]; html += '<div class="mention-dd-item" data-uid="' + u.id + '" data-uname="' + eH(u.name) + '"><div class="mention-dd-av" style="background:' + u.color + '">' + u.initials + '</div><div><div class="mention-dd-name">' + eH(u.name) + '</div><div class="mention-dd-dept">' + eH(u.department) + '</div></div></div>' }
                var allMatch = q === '' || 'semua'.indexOf(q) !== -1;
                if (allMatch) { html += '<div class="mention-dd-item mention-dd-all" data-uid="all" data-uname="Semua"><span class="mention-dd-all-icon">\u{1F465}</span><div><div class="mention-dd-all-label">@Semua</div><div class="mention-dd-all-desc">Tag semua user</div></div></div>' }
                if (!html) html = '<div style="padding:16px;text-align:center;font-size:.78rem;color:#9ca3af">Tidak ditemukan</div>';
                mentionDdList.innerHTML = html;
            }

            function insertMention(uid, uname) {
                if (!inp) return; var val = inp.value, pos = inp.selectionStart, txt = '@' + uname + ' ';
                if (mentionState.active && mentionState.start !== undefined) { val = val.substring(0, mentionState.start) + txt + val.substring(pos); inp.value = val; inp.selectionStart = inp.selectionEnd = mentionState.start + txt.length }
                else { val = val.substring(0, pos) + txt + val.substring(pos); inp.value = val; inp.selectionStart = inp.selectionEnd = pos + txt.length }
                if (uid === 'all') { draftMentions = [{ id: 'all', name: 'Semua' }] }
                else { var ex = false; for (var i = 0; i < draftMentions.length; i++) { if (String(draftMentions[i].id) === String(uid)) { ex = true; break } } if (!ex) draftMentions.push({ id: uid, name: uname }) }
                updateAtBadge(); closeMentionDd(); inp.dispatchEvent(new Event('input')); inp.focus();
            }

            function updateAtBadge() {
                var b = document.getElementById('atBtnBadge');
                if (!b) return; var c = draftMentions.length; b.textContent = c;
                if (c > 0) { b.classList.add('visible'); b.style.display = 'flex' }
                else { b.classList.remove('visible'); b.style.display = 'none' }
            }

            function cleanDraftMentions() {
                var text = inp ? inp.value : ''; var cleaned = [];
                for (var i = 0; i < draftMentions.length; i++) {
                    var m = draftMentions[i];
                    if (m.id === 'all') { if (text.indexOf('@Semua') !== -1 || text.indexOf('@semua') !== -1) cleaned.push(m) }
                    else { if (text.indexOf('@' + m.name) !== -1) cleaned.push(m) }
                }
                if (cleaned.length !== draftMentions.length) draftMentions = cleaned;
                updateAtBadge();
            }

            mentionDdList.addEventListener('click', function (e) { var item = e.target.closest('.mention-dd-item'); if (!item) return; e.stopPropagation(); insertMention(item.getAttribute('data-uid'), item.getAttribute('data-uname')) });

            if (inp) {
                inp.addEventListener('input', function () {
                    var len = this.value.length; if (charEl) { charEl.textContent = len + '/' + MAX_LEN; charEl.className = 'cp-char' + (len > 450 ? ' danger' : len > 380 ? ' warn' : '') } rSB(); this.style.height = 'auto'; this.style.height = Math.min(this.scrollHeight, 100) + 'px';
                    var pos = this.selectionStart, text = this.value, before = text.substring(0, pos), atIdx = before.lastIndexOf('@');
                    if (atIdx !== -1) { var afterAt = before.substring(atIdx + 1); if ((atIdx === 0 || text.charAt(atIdx - 1) === ' ') && afterAt.indexOf(' ') === -1) { mentionState.start = atIdx; mentionState.query = afterAt; if (!mentionState.active) { getAllUsers().then(function () { openMentionDd(afterAt) }) } else renderMentionDd() } else { if (mentionState.active) closeMentionDd() } } else { if (mentionState.active) closeMentionDd() }
                    cleanDraftMentions();
                });
                inp.addEventListener('keydown', function (e) { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); e.stopPropagation(); doSend() } if (e.key === 'Escape' && mentionState.active) { e.preventDefault(); closeMentionDd() } });
            }

            function renderReactionsForMessage(messageId, reactions) {
                if (!messagesEl) return;
                var wrap = messagesEl.querySelector('.msg-wrap[data-msg-id="' + messageId + '"]'); if (!wrap) return;
                var container = wrap.querySelector('.msg-reactions'); if (!container) return;
                container.innerHTML = '';
                for (var i = 0; i < (reactions || []).length; i++) {
                    var reaction = reactions[i], button = document.createElement('button');
                    button.type = 'button'; button.className = 'msg-reaction' + (reaction.mine ? ' mine' : '');
                    button.setAttribute('data-reaction-id', messageId); button.setAttribute('data-reaction-emoji', reaction.emoji || '');
                    button.title = (reaction.users || []).join(', '); button.textContent = (reaction.emoji || '') + ' ' + (parseInt(reaction.count, 10) || 0);
                    container.appendChild(button);
                }
            }

            function doReact(messageId, emoji) {
                if (!messageId || !emoji) return;
                fetch(URL_REACT + messageId + '/reaction', { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ emoji: emoji }) })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) { renderReactionsForMessage(messageId, data.reactions || []) })
                    .catch(function () { toast('Gagal memberi reaksi', 'error') });
            }

            function refreshVisibleReactions() {
                if (!chatOpen || !messagesEl) return;
                var nodes = messagesEl.querySelectorAll('.msg-wrap[data-msg-id]'), ids = [];
                for (var i = 0; i < nodes.length && i < 40; i++) ids.push(nodes[i].getAttribute('data-msg-id'));
                if (!ids.length) return;
                fetch(URL_REACTIONS + '?message_ids=' + encodeURIComponent(ids.join(',')), { headers: { 'Accept': 'application/json' } })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) {
                        var map = data.reactions || {}; for (var j = 0; j < ids.length; j++) renderReactionsForMessage(ids[j], map[ids[j]] || []);
                        var updates = data.message_updates || []; for (var k = 0; k < updates.length; k++) applyMessageUpdate(updates[k]);
                    })
                    .catch(function () { });
            }

            function messageDataFromWrap(wrap) {
                if (!wrap) return null;
                var avatar = wrap.querySelector('.msg-av'), bubble = wrap.querySelector('.msg-bubble');
                return { id: parseInt(wrap.getAttribute('data-msg-id')), isMe: wrap.classList.contains('mine'), canEdit: wrap.getAttribute('data-can-edit') === '1', preview: bubble ? bubble.textContent.substring(0, 60) : '', fullMessage: bubble ? (bubble.getAttribute('data-full-message') || bubble.textContent) : '', name: avatar ? avatar.title : '', uid: wrap.getAttribute('data-uid') || '' };
            }

            if (ctxReactions) {
                for (var ri = 0; ri < REACTION_EMOJIS.length; ri++) {
                    (function (emoji) { var button = document.createElement('button'); button.type = 'button'; button.className = 'ctx-reaction-btn'; button.textContent = emoji; button.title = 'Beri reaksi ' + emoji; button.addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; var id = ctxMsgData.id; hideCtx(); doReact(id, emoji) }); ctxReactions.appendChild(button) })(REACTION_EMOJIS[ri]);
                }
            }

            function showCtx(x, y, data) { ctxMsgData = data; ctxMenu.style.display = 'block'; var r = ctxMenu.getBoundingClientRect(); if (x + r.width > window.innerWidth - 8) x = window.innerWidth - r.width - 8; if (y + r.height > window.innerHeight - 8) y -= r.height + 8; if (x < 8) x = 8; if (y < 8) y = 8; ctxMenu.style.left = x + 'px'; ctxMenu.style.top = y + 'px'; var cm = document.getElementById('ctxMention'); if (cm) cm.style.display = data.isMe ? 'none' : 'flex'; var ce = document.getElementById('ctxEdit'); if (ce) ce.style.display = data.isMe && data.canEdit ? 'flex' : 'none'; var cd = document.getElementById('ctxDelete'); if (cd) cd.style.display = data.isMe ? 'flex' : 'none' }
            function hideCtx() { ctxMenu.style.display = 'none'; ctxMsgData = null }
            document.addEventListener('click', function (e) { if (ctxMenu.style.display === 'block' && !ctxMenu.contains(e.target)) hideCtx() });
            document.getElementById('ctxReply').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; doStartReply(ctxMsgData.id, ctxMsgData.preview, ctxMsgData.name); hideCtx() });
            document.getElementById('ctxEdit').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; var data = ctxMsgData; hideCtx(); doEdit(data) });
            document.getElementById('ctxMention').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; getAllUsers().then(function () { insertMention(ctxMsgData.uid, ctxMsgData.name) }); hideCtx() });
            document.getElementById('ctxDelete').addEventListener('click', function (e) { e.stopPropagation(); if (!ctxMsgData) return; var id = ctxMsgData.id; hideCtx(); doDelete(id) });

            var lpTimer = null;
            if (messagesEl) {
                messagesEl.addEventListener('contextmenu', function (e) { var b = e.target.closest('.msg-wrap'); if (!b) return; e.preventDefault(); showCtx(e.clientX, e.clientY, messageDataFromWrap(b)) });
                messagesEl.addEventListener('touchstart', function (e) { var b = e.target.closest('.msg-wrap'); if (!b) return; var t = e.touches[0], tx = t.clientX, ty = t.clientY; lpTimer = setTimeout(function () { showCtx(tx, ty, messageDataFromWrap(b)); if (navigator.vibrate) navigator.vibrate(30) }, 500) }, { passive: true });
                messagesEl.addEventListener('touchend', function () { clearTimeout(lpTimer) }, { passive: true });
                messagesEl.addEventListener('touchmove', function () { clearTimeout(lpTimer) }, { passive: true });
                messagesEl.addEventListener('click', function (e) {
                    var older = e.target.closest('.cp-load-older'); if (older) { e.stopPropagation(); loadOlderMessages(); return }
                    var db = e.target.closest('.msg-del'); if (db) { e.stopPropagation(); doDelete(parseInt(db.getAttribute('data-del-id'))); return }
                    var ck = e.target.closest('.msg-checks'); if (ck) { e.stopPropagation(); toggleReadPopup(ck, parseInt(ck.getAttribute('data-check-id'))); return }
                    var reaction = e.target.closest('.msg-reaction'); if (reaction) { e.stopPropagation(); doReact(parseInt(reaction.getAttribute('data-reaction-id')), reaction.getAttribute('data-reaction-emoji')); return }
                    var addReaction = e.target.closest('.msg-react-add'); if (addReaction) { e.stopPropagation(); var aw = addReaction.closest('.msg-wrap'), ar = addReaction.getBoundingClientRect(); showCtx(ar.left, ar.bottom + 6, messageDataFromWrap(aw)); return }
                    var bu = e.target.closest('.msg-bubble'); if (bu) { var wr = bu.closest('.msg-wrap'); if (wr && !wr.classList.contains('mine')) { doStartReply(parseInt(bu.getAttribute('data-msg-id')), bu.getAttribute('data-preview') || '', bu.getAttribute('data-name') || '') } }
                });
            }

            function toggleReadPopup(checkEl, msgId) {
                if (activeReadPopup) { activeReadPopup.classList.remove('open'); activeReadPopup = null; return }
                var old = document.querySelector('.read-popup.open'); if (old) { old.classList.remove('open') }
                checkEl.style.opacity = '.5';
                fetch(URL_READS + msgId + '/reads', { headers: { 'Accept': 'application/json' } })
                    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
                    .then(function (d) {
                        checkEl.style.opacity = '';
                        var pp = document.createElement('div'); pp.className = 'read-popup';
                        if (!d.readers || !d.readers.length) {
                            pp.innerHTML = '<div class="read-popup-title">\u{1F441} Dilihat</div><div class="read-popup-empty">Belum ada yang melihat</div>';
                        } else {
                            var names = ''; for (var i = 0; i < d.readers.length; i++) {
                                var rd = d.readers[i], rdName = rd.user_name || ('User #' + rd.user_id), c = UCLS[(rd.user_id || 0) % UCLS.length] || '#6366f1'; var rdTime = ''; try { rdTime = new Date(rd.read_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) } catch (e) { }
                                names += '<div class="read-popup-name"><span class="read-popup-dot" style="background:' + c + '"></span><span>' + eH(rdName) + '</span><span style="margin-left:auto;font-size:.6rem;color:#9ca3af">' + rdTime + '</span></div>';
                            }
                            pp.innerHTML = '<div class="read-popup-title">\u{1F441} Dilihat ' + d.readers.length + ' orang</div><div class="read-popup-names">' + names + '</div>';
                        }
                        checkEl.parentElement.style.position = 'relative'; checkEl.parentElement.appendChild(pp);
                        requestAnimationFrame(function () { pp.classList.add('open') }); activeReadPopup = pp;
                    }).catch(function () { checkEl.style.opacity = '' });
            }
            document.addEventListener('click', function (e) { if (activeReadPopup && !e.target.closest('.read-popup') && !e.target.closest('.msg-checks')) { activeReadPopup.classList.remove('open'); activeReadPopup = null } });

            function renderMentionText(text, mp) { var html = eH(text); if (!mp || !mp.length) return html; var hasAll = false; for (var i = 0; i < mp.length; i++) { if (mp[i].id === 'all') { hasAll = true; continue } var name = mp[i].name || ''; if (name) { var esc = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); html = html.replace(new RegExp('@' + esc, 'g'), '<span class="mention-hl">@' + eH(name) + '</span>') } } if (hasAll) html = html.replace(/@(Semua|semua)/gi, '<span class="mention-all-hl">@$1</span>'); return html }
            function amMentioned(mp) { if (!mp || !mp.length) return false; for (var i = 0; i < mp.length; i++) { if (mp[i].id === 'all') return true; if (String(mp[i].id) === String(MY_ID)) return true } return false }

            function createShareCard(data) {
                if (!data || !data.label) return null;
                var card = document.createElement('div'); card.className = 'msg-share-card';
                var head = document.createElement('div'); head.className = 'msg-share-head';
                var label = document.createElement('span'); label.className = 'msg-share-label'; label.textContent = data.label;
                var number = document.createElement('span'); number.className = 'msg-share-number'; number.textContent = data.number || '-'; number.title = data.number || '-';
                head.appendChild(label); head.appendChild(number); card.appendChild(head);
                var title = document.createElement('div'); title.className = 'msg-share-title'; title.textContent = data.title || 'Data pengadaan'; card.appendChild(title);
                var fields = document.createElement('div'); fields.className = 'msg-share-fields';
                for (var i = 0; i < (data.fields || []).length; i++) {
                    var field = data.fields[i], item = document.createElement('div');
                    var fieldLabel = document.createElement('span'); fieldLabel.className = 'msg-share-field-label'; fieldLabel.textContent = field.label || '';
                    var fieldValue = document.createElement('span'); fieldValue.className = 'msg-share-field-value'; fieldValue.textContent = field.value || '-'; fieldValue.title = field.value || '-';
                    item.appendChild(fieldLabel); item.appendChild(fieldValue); fields.appendChild(item);
                }
                card.appendChild(fields); return card;
            }

            function applyMessageUpdate(message) {
                if (!messagesEl || !message) return;
                var wrap = messagesEl.querySelector('.msg-wrap[data-msg-id="' + message.id + '"]'); if (!wrap) return;
                var bubble = wrap.querySelector('.msg-bubble'); if (bubble) {
                    bubble.innerHTML = renderMentionText(message.message || '', message.mentions_parsed || []);
                    bubble.setAttribute('data-preview', (message.message || '').substring(0, 60));
                    bubble.setAttribute('data-full-message', message.message || '');
                }
                var meta = wrap.querySelector('.msg-meta'), edited = wrap.querySelector('.msg-edited');
                if (message.edited_at && meta && !edited) { edited = document.createElement('span'); edited.className = 'msg-edited'; edited.textContent = 'diedit'; meta.insertBefore(edited, meta.firstChild ? meta.firstChild.nextSibling : null) }
                if (Object.prototype.hasOwnProperty.call(message, 'can_edit')) wrap.setAttribute('data-can-edit', message.can_edit ? '1' : '0');
            }

            function appendMsg(m, prepend) {
                if (!messagesEl) return; var isMe = String(m.user_id) === String(MY_ID), time = ''; try { time = new Date(m.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) } catch (e) { }
                var wr = document.createElement('div'); wr.className = 'msg-wrap' + (isMe ? ' mine' : '');
                if (amMentioned(m.mentions_parsed) && !isMe) wr.classList.add('mentioned-me');
                wr.setAttribute('data-msg-id', m.id); wr.setAttribute('data-uid', m.user_id || ''); wr.setAttribute('data-can-edit', m.can_edit ? '1' : '0');
                var av = document.createElement('div'); av.className = 'msg-av'; av.style.background = m.user_color || '#6366f1'; av.title = m.user_name || ''; av.textContent = m.user_initials || '??';
                var bd = document.createElement('div'); bd.className = 'msg-body';
                if (!isMe) { var sn = document.createElement('div'); sn.className = 'msg-sender'; sn.textContent = m.user_name || ''; bd.appendChild(sn) }
                if (m.reply_to) { var rp = document.createElement('div'); rp.className = 'msg-reply'; rp.innerHTML = '<span class="msg-reply-author">' + eH(m.reply_user || 'Seseorang') + '</span><br>' + eH(m.reply_preview || ''); bd.appendChild(rp) }
                var shareCard = createShareCard(m.share_data_parsed); if (shareCard) bd.appendChild(shareCard);
                var bb = document.createElement('div'); bb.className = 'msg-bubble'; bb.innerHTML = renderMentionText(m.message, m.mentions_parsed); bb.setAttribute('data-msg-id', m.id); bb.setAttribute('data-preview', (m.message || '').substring(0, 60)); bb.setAttribute('data-full-message', m.message || ''); bb.setAttribute('data-name', m.user_name || ''); bd.appendChild(bb);
                var mt = document.createElement('div'); mt.className = 'msg-meta'; var ts = document.createElement('span'); ts.className = 'msg-time'; ts.textContent = time; mt.appendChild(ts);
                if (m.edited_at) { var edited = document.createElement('span'); edited.className = 'msg-edited'; edited.textContent = 'diedit'; mt.appendChild(edited) }
                var reactAdd = document.createElement('button'); reactAdd.type = 'button'; reactAdd.className = 'msg-react-add'; reactAdd.title = 'Beri reaksi'; reactAdd.textContent = '\u263A'; mt.appendChild(reactAdd);
                if (isMe) {
                    var rc = parseInt(m.read_count) || 0;
                    if (rc > 0) { var ck = document.createElement('span'); ck.className = 'msg-checks msg-checks-read'; ck.textContent = '\u2713\u2713'; ck.setAttribute('data-check-id', m.id); mt.appendChild(ck) }
                    else { var ck2 = document.createElement('span'); ck2.className = 'msg-checks'; ck2.textContent = '\u2713'; mt.appendChild(ck2) }
                    var dl = document.createElement('button'); dl.type = 'button'; dl.className = 'msg-del'; dl.title = 'Hapus'; dl.textContent = '\u2715'; dl.setAttribute('data-del-id', m.id); mt.appendChild(dl);
                }
                bd.appendChild(mt); var reactions = document.createElement('div'); reactions.className = 'msg-reactions'; bd.appendChild(reactions); wr.appendChild(av); wr.appendChild(bd);
                if (prepend) { var firstMessage = messagesEl.querySelector('.msg-wrap'); messagesEl.insertBefore(wr, firstMessage || null) } else messagesEl.appendChild(wr);
                renderReactionsForMessage(m.id, m.reactions || []);
            }

            function doStartReply(id, preview, userName) { replyToId = id; replyUser = userName; var bar = document.getElementById('cpReplyBar'), txt = document.getElementById('cpReplyText'); if (txt) txt.innerHTML = 'Balas <strong>' + eH(userName.split(' ')[0]) + '</strong>: ' + eH(preview) + (preview.length >= 60 ? '\u2026' : ''); if (bar) bar.classList.add('visible'); if (inp) inp.focus() }
            function doCancelReply() { replyToId = null; replyUser = null; var bar = document.getElementById('cpReplyBar'); if (bar) bar.classList.remove('visible'); if (inp) inp.focus() }
            var crb = document.getElementById('btnCancelReply'); if (crb) crb.addEventListener('click', function (e) { e.stopPropagation(); doCancelReply() });

            /* ── Load messages ── */
            function loadMessages(initial) {
                var since = initial ? 0 : chatMaxId;
                fetch(URL_MSGS + '?since=' + since, { headers: { 'Accept': 'application/json' } })
                    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json() })
                    .then(function (data) {
                        var msgs = data.messages;
                        if (initial) { historyHasMore = !!data.has_more; historyLoading = false }
                        if (!msgs || !msgs.length) { if (initial) { messagesEl.innerHTML = ''; sE(true); renderHistoryControl() } return }
                        sE(false); var wasB = isNB();
                        if (initial) {
                            messagesEl.innerHTML = '';
                            renderHistoryControl();
                            for (var i = 0; i < msgs.length; i++) appendMsg(msgs[i]);

                            /* ✅ FIX: Gunakan i_read dari database, bukan localStorage */
                            mentionUnread = 0;
                            for (var m = 0; m < msgs.length; m++) {
                                if (String(msgs[m].user_id) !== String(MY_ID) && amMentioned(msgs[m].mentions_parsed)) {
                                    if (msgs[m].i_read) {
                                        /* Database bilang sudah baca → tandai seen di DOM + memori */
                                        markMentionSeen(msgs[m].id);
                                        var seenEl = messagesEl.querySelector('[data-msg-id="' + msgs[m].id + '"]');
                                        if (seenEl) seenEl.classList.add('mention-seen');
                                    } else {
                                        /* Belum baca → masukkan counter */
                                        mentionUnread++;
                                    }
                                }
                            }
                            updateMentionBadges();
                        } else {
                            var nc = 0; for (var j = 0; j < msgs.length; j++) {
                                if (!messagesEl.querySelector('[data-msg-id="' + msgs[j].id + '"]')) {
                                    appendMsg(msgs[j]); nc++;
                                    if (!isChatReadable()) {
                                        unread++;
                                        /* ✅ Mention baru saat chat tertutup — cek i_read dari database */
                                        if (String(msgs[j].user_id) !== String(MY_ID) && amMentioned(msgs[j].mentions_parsed) && !msgs[j].i_read) {
                                            mentionUnread++;
                                        }
                                    }
                                }
                            }
                            if (nc > 0 && !isChatReadable()) { uB(); updateMentionBadges() }
                        }
                        chatMaxId = data.max_id || chatMaxId; if (wasB || initial) sBB();
                        var idsToRead = []; for (var k = 0; k < msgs.length; k++) { if (String(msgs[k].user_id) !== String(MY_ID)) idsToRead.push(msgs[k].id) }
                        if (idsToRead.length && isChatReadable()) markRead(idsToRead);
                    })
                    .catch(function () { });
            }

            function loadOlderMessages() {
                if (!messagesEl || historyLoading || !historyHasMore) return;
                var first = messagesEl.querySelector('.msg-wrap[data-msg-id]'); if (!first) return;
                historyLoading = true; renderHistoryControl();
                var before = first.getAttribute('data-msg-id'), previousHeight = messagesEl.scrollHeight, previousTop = messagesEl.scrollTop;
                fetch(URL_MSGS + '?before=' + encodeURIComponent(before), { headers: { 'Accept': 'application/json' } })
                    .then(function (response) { if (!response.ok) throw new Error(response.status); return response.json() })
                    .then(function (data) {
                        var older = data.messages || [];
                        for (var i = older.length - 1; i >= 0; i--) {
                            if (!messagesEl.querySelector('.msg-wrap[data-msg-id="' + older[i].id + '"]')) appendMsg(older[i], true);
                        }
                        historyHasMore = !!data.has_more;
                        requestAnimationFrame(function () { messagesEl.scrollTop = previousTop + (messagesEl.scrollHeight - previousHeight) });
                        var ids = []; for (var j = 0; j < older.length; j++) if (String(older[j].user_id) !== String(MY_ID)) ids.push(older[j].id);
                        if (ids.length) markRead(ids);
                    })
                    .catch(function () { toast('Riwayat pesan gagal dimuat', 'error') })
                    .finally(function () { historyLoading = false; renderHistoryControl() });
            }

            function markRead(ids) { fetch(URL_READ, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ message_ids: ids }) }).catch(function () { }) }

            function doSend() {
                if (!inp) return; var txt = inp.value.trim(); if (!txt || txt.length > MAX_LEN || sending) return;
                sending = true; rSB(); setSL(true);
                var body = { message: txt }; if (replyToId) body.reply_to = replyToId; if (draftMentions.length) body.mentions = draftMentions;
                fetch(URL_SEND, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
                    .then(function (r) { if (r.status === 429) { toast('Terlalu cepat! Tunggu.', 'warning'); throw new Error('429') } if (!r.ok) throw new Error('HTTP ' + r.status); return r.json() })
                    .then(function (data) { if (!data.message) { toast('Respons tidak valid', 'error'); throw new Error('No message') } sE(false); appendMsg(data.message); chatMaxId = Math.max(chatMaxId, data.message.id); inp.value = ''; inp.style.height = 'auto'; if (charEl) { charEl.textContent = '0/' + MAX_LEN; charEl.className = 'cp-char' } doCancelReply(); draftMentions = []; updateAtBadge(); sBB(); sendBtn.classList.add('send-flash'); setTimeout(function () { sendBtn.classList.remove('send-flash') }, 500) })
                    .catch(function (err) { if (err.message === '429') return; toast('Gagal mengirim', 'error') })
                    .finally(function () { sending = false; setSL(false); rSB() });
            }

            function doEdit(data) {
                if (!data || !data.canEdit) { toast('Batas edit pesan sudah berakhir', 'warning'); return }
                swalActive = true;
                Swal.fire({ title: 'Edit pesan', input: 'textarea', inputValue: data.fullMessage || '', inputAttributes: { maxlength: '500', 'aria-label': 'Isi pesan' }, showCancelButton: true, confirmButtonText: 'Simpan', cancelButtonText: 'Batal', confirmButtonColor: '#6366f1', inputValidator: function (value) { value = (value || '').trim(); if (!value) return 'Pesan tidak boleh kosong'; if (value.length > MAX_LEN) return 'Maksimal 500 karakter' }, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' })
                    .then(function (result) {
                        setTimeout(function () { swalActive = false }, 100); if (!result.isConfirmed) return;
                        fetch(URL_DEL + data.id, { method: 'PATCH', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ message: (result.value || '').trim() }) })
                            .then(function (response) { return response.json().then(function (body) { if (!response.ok) throw new Error(body.error || 'Gagal mengedit pesan'); return body }) })
                            .then(function (body) { applyMessageUpdate(body.message); toast('Pesan diperbarui', 'success') })
                            .catch(function (error) { toast(error.message || 'Gagal mengedit pesan', 'error') });
                    });
            }

            window.shareRecordToChat = function (type, id) {
                var labels = { pr: 'PR', spph: 'SPPH', sp: 'SP' }, label = labels[type] || 'data';
                swalActive = true;
                Swal.fire({ title: 'Bagikan ' + label + ' ke Chat Tim?', text: 'Data akan dikirim sebagai kartu ringkas agar mudah dibaca.', icon: 'question', showCancelButton: true, confirmButtonText: 'Bagikan', cancelButtonText: 'Batal', confirmButtonColor: '#6366f1', background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' })
                    .then(function (result) {
                        setTimeout(function () { swalActive = false }, 100); if (!result.isConfirmed) return;
                        fetch(URL_SHARE, { method: 'POST', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify({ type: type, id: id }) })
                            .then(function (response) { return response.json().then(function (body) { if (!response.ok) throw new Error(body.error || 'Gagal membagikan data'); return body }) })
                            .then(function (body) {
                                if (chatOpen) {
                                    if (chatMinimized) restoreChat();
                                    sE(false); if (!messagesEl.querySelector('.msg-wrap[data-msg-id="' + body.message.id + '"]')) appendMsg(body.message);
                                    chatMaxId = Math.max(chatMaxId, body.message.id); sBB();
                                } else doToggle();
                                toast(label + ' dibagikan ke Chat Tim', 'success');
                            })
                            .catch(function (error) { toast(error.message || 'Gagal membagikan data', 'error') });
                    });
            };

            function doDelete(id) {
                swalActive = true;
                Swal.fire({ title: 'Hapus pesan?', text: 'Pesan akan dihapus permanen.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#ef4444', cancelButtonColor: '#6b7280', confirmButtonText: 'Ya, hapus', cancelButtonText: 'Batal', allowOutsideClick: true, allowEscapeKey: true, background: document.documentElement.classList.contains('dark') ? '#1f2937' : '#fff', color: document.documentElement.classList.contains('dark') ? '#f3f4f6' : '#111827' })
                    .then(function (r) { setTimeout(function () { swalActive = false }, 100); if (!r.isConfirmed) return; fetch(URL_DEL + id, { method: 'DELETE', headers: { 'X-CSRF-TOKEN': CSRF, 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; var el = messagesEl.querySelector('[data-msg-id="' + id + '"]'); if (el) { el.style.animation = 'msgRemove .3s ease forwards'; setTimeout(function () { el.remove(); if (!messagesEl.querySelector('[data-msg-id]')) sE(true) }, 300) } }).catch(function () { toast('Gagal menghapus', 'error') }) });
            }

            function renderPanelModeButtons() {
                if (fullscreenBtn) {
                    fullscreenBtn.classList.toggle('active', chatFullscreen);
                    fullscreenBtn.title = chatFullscreen ? 'Keluar dari layar penuh' : 'Layar penuh';
                    fullscreenBtn.setAttribute('aria-label', fullscreenBtn.title);
                    fullscreenBtn.innerHTML = chatFullscreen
                        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 4v5H4m16 0h-5V4M4 15h5v5m6 0v-5h5"/></svg>'
                        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 3H3v5m13-5h5v5M8 21H3v-5m18 0v5h-5"/></svg>';
                }
                if (minimizeBtn) {
                    minimizeBtn.title = chatMinimized ? 'Buka kembali chat' : 'Minimize';
                    minimizeBtn.setAttribute('aria-label', minimizeBtn.title);
                    minimizeBtn.innerHTML = chatMinimized
                        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 18h14V6H5v12Z"/></svg>'
                        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14"/></svg>';
                }
            }

            function setChatFullscreen(enabled) {
                chatFullscreen = !!enabled; chatMinimized = false;
                if (panel) { panel.classList.toggle('fullscreen', chatFullscreen); panel.classList.remove('minimized') }
                document.body.classList.toggle('chat-fullscreen-open', chatFullscreen);
                renderPanelModeButtons();
                setTimeout(function () { if (messagesEl) sBB(); if (inp) inp.focus() }, 80);
            }

            function toggleChatFullscreen() {
                if (!chatOpen) { doToggle(); setTimeout(function () { setChatFullscreen(true) }, 30); return }
                if (chatMinimized) restoreChat();
                setChatFullscreen(!chatFullscreen);
            }

            function minimizeChat() {
                if (!chatOpen || chatMinimized) return;
                chatMinimized = true; chatFullscreen = false;
                if (panel) { panel.classList.add('minimized'); panel.classList.remove('fullscreen') }
                document.body.classList.remove('chat-fullscreen-open'); toggleSearch(false);
                if (inp) inp.blur(); renderPanelModeButtons(); refreshMentionSummary();
            }

            function restoreChat() {
                if (!chatOpen) { doToggle(); return }
                var hadMention = mentionUnread > 0;
                chatMinimized = false;
                if (panel) panel.classList.remove('minimized');
                unread = 0; uB(); renderPanelModeButtons(); loadMessages(true); startPoll(); startReactionPoll();
                if (hadMention) setTimeout(scrollToNextMention, 400);
                setTimeout(function () { if (inp) inp.focus() }, 180);
            }

            function closeChat() {
                if (!chatOpen) return;
                chatOpen = false; chatFullscreen = false; chatMinimized = false;
                if (panel) panel.classList.remove('open', 'fullscreen', 'minimized');
                if (trigger) trigger.classList.remove('active');
                document.body.classList.remove('chat-fullscreen-open');
                stopPoll(); stopReactionPoll(); toggleSearch(false); refreshMentionSummary();
                if (typeof cPP === 'function') cPP();
                if (activeReadPopup) { activeReadPopup.classList.remove('open'); activeReadPopup = null }
                renderPanelModeButtons(); window._chatOpen = false;
            }

            function doToggle() {
                if (chatOpen) { closeChat(); return }
                var hadMention = mentionUnread > 0;
                chatOpen = true; chatFullscreen = false; chatMinimized = false;
                if (panel) { panel.classList.add('open'); panel.classList.remove('fullscreen', 'minimized') }
                if (trigger) trigger.classList.add('active');
                unread = 0; uB(); renderPanelModeButtons(); loadMessages(true); startPoll(); startReactionPoll();
                if (hadMention) setTimeout(scrollToNextMention, 400);
                setTimeout(function () { if (inp) inp.focus() }, 280);
                window._chatOpen = true;
            }
            window._chatOpen = false; window._chatToggle = doToggle;
            window._chatHandleEscape = function () { if (chatFullscreen) setChatFullscreen(false); else closeChat() };

            function startPoll() { if (chatTimer) return; chatTimer = setInterval(function () { loadMessages(false) }, 4000) }
            function stopPoll() { if (chatTimer) { clearInterval(chatTimer); chatTimer = null } }
            function startReactionPoll() { if (reactionTimer) return; refreshVisibleReactions(); reactionTimer = setInterval(refreshVisibleReactions, 6000) }
            function stopReactionPoll() { if (reactionTimer) { clearInterval(reactionTimer); reactionTimer = null } }
            function startMentionPoll() { if (mentionTimer) return; refreshMentionSummary(); mentionTimer = setInterval(refreshMentionSummary, 4000) }
            function stopMentionPoll() { if (mentionTimer) { clearInterval(mentionTimer); mentionTimer = null } }
            document.addEventListener('visibilitychange', function () {
                if (document.hidden) { stopPoll(); stopReactionPoll(); if (!notifyEnabled && !soundEnabled) stopMentionPoll() }
                else { startMentionPoll(); if (chatOpen) { startPoll(); startReactionPoll() } }
            });
            if (!document.hidden) startMentionPoll();

            if (trigger) trigger.addEventListener('click', function (e) {
                e.stopPropagation();
                if (chatMinimized) { restoreChat(); return }
                if (mentionUnread > 0) {
                    if (!chatOpen) { doToggle() }
                    else { scrollToNextMention() }
                } else {
                    doToggle();
                }
            });

            if (cpHeadMention) {
                cpHeadMention.addEventListener('click', function (e) {
                    e.stopPropagation();
                    scrollToNextMention();
                });
            }

            if (searchBtn) searchBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleSearch(!searchPanel.classList.contains('open')) });
            if (searchClose) searchClose.addEventListener('click', function (e) { e.stopPropagation(); toggleSearch(false) });
            if (searchInput) searchInput.addEventListener('input', function () { var query = this.value; clearTimeout(searchTimer); searchTimer = setTimeout(function () { runSearch(query) }, 320) });
            if (searchResults) searchResults.addEventListener('click', function (e) {
                var item = e.target.closest('.cp-search-result'); if (!item) return; e.stopPropagation();
                var id = item.getAttribute('data-search-id'), wrap = messagesEl ? messagesEl.querySelector('.msg-wrap[data-msg-id="' + id + '"]') : null;
                if (!wrap) { toast('Pesan lama ditampilkan di hasil pencarian.', 'info'); return }
                toggleSearch(false); wrap.scrollIntoView({ behavior: 'smooth', block: 'center' }); var bubble = wrap.querySelector('.msg-bubble'); if (bubble) bubble.style.animation = 'mentionFlash .6s ease';
            });
            if (notifyBtn) notifyBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleNotifications() });
            if (fullscreenBtn) fullscreenBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleChatFullscreen() });
            if (minimizeBtn) minimizeBtn.addEventListener('click', function (e) { e.stopPropagation(); if (chatMinimized) restoreChat(); else minimizeChat() });
            if (chatHead) chatHead.addEventListener('click', function (e) { if (chatMinimized && !e.target.closest('button')) { e.stopPropagation(); restoreChat() } });

            var ccb = document.getElementById('btnCloseChat'); if (ccb) ccb.addEventListener('click', function (e) { e.stopPropagation(); closeChat() });
            if (sendBtn) sendBtn.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); doSend() });

            document.addEventListener('click', function (e) {
                if (swalActive) return;
                if (chatOpen && !chatMinimized && panel && !panel.contains(e.target) && trigger && !trigger.contains(e.target) && !ctxMenu.contains(e.target)) { closeChat() }
            });
        })();

        /* ═══ APPROVAL PR POLLING ═══ */
        @if(auth()->user()?->department === 'umum')
            (function () { var url = '{{ route('approval.pr.pendingCount') }}', b1 = document.getElementById('badgePendingPr'), b2 = document.getElementById('badgePendingPrMobile'), t = null; function refresh() { fetch(url, { headers: { 'Accept': 'application/json' } }).then(function (r) { if (!r.ok) throw 0; return r.json() }).then(function (d) { var c = Number(d.count || 0);[b1, b2].forEach(function (b) { if (b) { b.textContent = c; if (c > 0) b.classList.remove('hidden'); else b.classList.add('hidden') } }) }).catch(function () { }) } document.addEventListener('visibilitychange', function () { if (document.hidden) { clearInterval(t); t = null } else { refresh(); t = setInterval(refresh, 30000) } }); if (!document.hidden) { refresh(); t = setInterval(refresh, 30000) } })();
        @endif

    </script>

    @include('components.chatbot')
</body>

</html>
