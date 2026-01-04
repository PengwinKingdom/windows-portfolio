import DesktopIcon from "./DesktopIcon";
import "../styles/Desktop.css";

export default function Desktop({sections,onOpen}){
    return (
        <div className="desktop">
            <div className="icons">
                {sections.map((s)=>(
                    <DesktopIcon
                    key={s.id}
                    iconPath={s.iconPath}
                    label={s.title}
                    onOpen={()=>onOpen(s.id)}
                    />
                ))}
            </div>
        </div>
    );
}

