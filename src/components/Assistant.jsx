import { useEffect, useMemo, useState } from "react";
import "../styles/assistant.css";

export default function Assistant({ message, actions, onAction }) {

    const [activeIndex,setActiveIndex]=useState(0);

    //Reset active index when actions change
    useEffect(()=>{
        setActiveIndex(0);
    },[actions]);

    //Keyboard navigation
    useEffect(()=>{
        const onKeyDown=(e)=>{
            if(!actions?.length) return;

            const tag=document.activeElement?.tagName.toLowerCase();
            if(tag==="input"||tag==="textarea") return;

            if(e.key==="ArrowDown"){
                e.preventDefault();
                setActiveIndex((i)=>(i+1)%actions.length);
            }else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((i) => (i - 1 + actions.length) % actions.length);
            }else if (e.key === "Enter") {
                e.preventDefault();
                const action = actions[activeIndex];
                if (action) onAction(action.id);
            }else if (e.key === "Escape") {
                setActiveIndex(0);
            }
        };

        window.addEventListener("keydown", onKeyDown);

        return () => window.removeEventListener("keydown", onKeyDown);
    }, [actions, activeIndex, onAction]);

    const handleClick=(idx)=>{
        setActiveIndex(idx);
        onAction(actions[idx].id);
    };


  return (
    <div className="assistant">
      <div className="assistant-bubble">
        <div className="msg">{message}</div>

        <ul className="assistant-menu" role="menu" aria-label="Assistant menu">
          {actions.map((a, idx) => (
            <li key={a.id} role="none">
              <a
                href="#"
                role="menuitem"
                className={"assistant-item " + (idx === activeIndex ? "active" : "")}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(idx);
                }}
                onMouseEnter={() => setActiveIndex(idx)}
              >
                <span className="tri" aria-hidden="true">▶</span>
                <span className="label">{a.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="assistant-hint">
          Use ↑ ↓ and Enter
        </div>
      </div>

      <img
        className="assistant-avatar"
        src="/assistant/dog.webp"
        alt="Assistant avatar"
      />
    </div>
  );
}