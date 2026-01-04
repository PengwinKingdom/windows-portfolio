import { useEffect, useRef } from "react";
import "../styles/window.css";

export default function Window({id,title,zIndex,onClose,onFocus,children,position,onMove}){

    const dragRef=useRef({
        dragging:false,
        startX:0,
        startY:0,
        winX:0,
        winY:0,
    });

    const x=position?.x??120;
    const y=position?.y??80;

    const onPointerDownTitle=(e)=>{
        e.preventDefault();
        onFocus?.(id);

        dragRef.current.dragging = true;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.winX = x;
        dragRef.current.winY = y;

        e.currentTarget.setPointerCapture?.(e.pointerId);
    };

    useEffect(()=>{
        const handleMove=(e)=>{
            if(!dragRef.current.dragging){
                return;
            }

            const dx=e.clientX-dragRef.current.startX;
            const dy = e.clientY - dragRef.current.startY;

            const nextX = Math.max(0, dragRef.current.winX + dx);
            const nextY = Math.max(0, dragRef.current.winY + dy);

            onMove?.({x:nextX,y:nextY});
        };

        const handleUp=()=>{
            dragRef.current.dragging=false;
        };

        window.addEventListener("pointermove", handleMove);
        window.addEventListener("pointerup", handleUp);

        return()=>{
            window.removeEventListener("pointermove",handleMove);
            window.removeEventListener("pointerup", handleUp);
        };
    },[onMove]);

    return(
        <div className="window" style={{ position:"fixed", left:x, top:y, zIndex }} onPointerDown={() => onFocus?.(id)}>
            <div className="window-titlebar" onPointerDown={onPointerDownTitle}>
                <div className="window-title">{title}</div>
                
                <button
                className="window-close"
                onPointerDown={(e) => e.stopPropagation()} 
                onClick={() => onClose?.(id)}
                aria-label="Close window">
                    ✕
                </button>
                
            </div>
            
            <div className="window-body">
                {children}
            </div>
        
        </div>

    );
}