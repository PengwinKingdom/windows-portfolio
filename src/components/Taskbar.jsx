import { useRef, useEffect, useState } from "react";
import { playClick } from "../sfx";
import "../styles/taskbar.css";

export default function Taskbar({
    openWindows,
    sectionsById,
    activeWindowId,
    onFocus,
    lang,
    setLanguage,
}) {

    const[now,setNow]=useState(new Date());
    const locale = lang === "es" ? "es-PE" : "en-GB";


    useEffect(()=>{
        const interval=setInterval(()=>{
            setNow(new Date());
        },60_000);

        return()=>clearInterval(interval);
    },[]);

    const [langOpen,setLangOpen]=useState(false);
    const langRef = useRef(null);

    useEffect(()=>{
        const onDocPointerDown=(e)=>{
            if (!langRef.current) return;
            if (!langRef.current.contains(e.target)) setLangOpen(false);
        };

        document.addEventListener("pointerdown", onDocPointerDown);
        return () => document.removeEventListener("pointerdown", onDocPointerDown);
    },[]);

    useEffect(()=>{
        const onKeyDown=(e)=>{
            if (!langOpen) return;
            if (e.key === "Escape") setLangOpen(false);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    },[langOpen]);

    const chooseLang = (next) => {
        setLanguage(next);
        setLangOpen(false);
    };

    return(
        <div className="taskbar">

            <div className="taskbar-apps">
                {openWindows.map((id)=>{
                    const s=sectionsById.get(id);
                    return(
                        <button
                        key={id}
                        type="button"
                        className={`taskbar-btn ${id === activeWindowId ? "active" : ""}`}
                        onClick={()=>onFocus(id)}
                        title={s?.title??id}
                        >
                            {s?.title ?? id}
                        </button>
                    );
                })}
            </div>

            <div className="tray">
                <div className="lang" ref={langRef}>
                    
                    <button
                    type="button"
                    className="lang-btn"
                    onClick={() => {
                        playClick();
                        setLangOpen((v) => !v)
                    }}
                    aria-haspopup="menu"
                    aria-expanded={langOpen}>
                        {lang?.toUpperCase?.() ?? "EN"} <span className="caret">▾</span>
                    </button>

                    {langOpen && (
                        <div className="lang-menu" role="menu">
                            <button
                            type="button"
                            className={`lang-item ${lang === "en" ? "selected" : ""}`}
                            onClick={() => {
                                chooseLang("en");
                            }}
                            role="menuitem">
                                English (EN)
                            </button>
                            
                            <button
                            type="button"
                            className={`lang-item ${lang === "es" ? "selected" : ""}`}
                            onClick={() => {
                                chooseLang("es");
                            }}
                            role="menuitem">
                                Español (ES)
                            </button>
                        </div>
          )}
                </div>
                <img className="tray-img" src="/tray/wifi.png" alt="Wi-Fi" />
                <img className="tray-img" src="/tray/volume.png" alt="Volume" />
                <img className="tray-img" src="/tray/battery.png" alt="Battery" />
            </div>

            <div className="taskbar-right">

                <div className="clock">
                    <div className="clock-time">
                        {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                    
                    <div className="clock-date">
                        {now.toLocaleDateString(locale, {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                        })}
                    </div>
                </div>
            </div>

        </div>
    );
}