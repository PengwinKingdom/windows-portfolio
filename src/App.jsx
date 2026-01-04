import { useMemo, useState, useEffect } from "react";
import { initSfx, playClick } from "./sfx";
import { sections } from "./data/sections";
import { t } from "./i18n";
import Desktop from "./components/Desktop";
import Window from "./components/Window";
import Assistant from "./components/Assistant";
import Taskbar from "./components/Taskbar";
import "./styles/globals.css";


const getMainMenuAssistant = (hasGreeted, lang) => ({
  message: hasGreeted ? t(lang, "assistant.explore") : t(lang, "assistant.hello"),
  actions: [
    { id: "projects", label: t(lang, "taskbar.projects") },
    { id: "skills", label: t(lang, "taskbar.skills") },
    { id: "about", label: t(lang, "taskbar.about") },
    { id: "how", label: t(lang, "taskbar.how") },
    { id: "contact", label: t(lang, "taskbar.contact") }
  ]
});


const buildAssistantFlow = (lang) => ({
  projects: {
    message: t(lang, "assistant.viewing", { section: t(lang, "sections.projects.title") }),
    actions: [
      { id: "skills", label: t(lang, "assistant.next", { section: t(lang, "sections.skills.title") }) },
      { id: "menu", label: t(lang, "assistant.back") }
    ]
  },
  skills: {
    message: t(lang, "assistant.viewing", { section: t(lang, "sections.skills.title") }),
    actions: [
      { id: "about", label: t(lang, "assistant.next", { section: t(lang, "sections.about.title") }) },
      { id: "menu", label: t(lang, "assistant.back") }
    ]
  },
  about: {
    message: t(lang, "assistant.viewing", { section: t(lang, "sections.about.title") }),
    actions: [
      { id: "how", label: t(lang, "assistant.next", { section: t(lang, "sections.how.title") }) },
      { id: "menu", label: t(lang, "assistant.back") }
    ]
  },
  how: {
    message: t(lang, "assistant.viewing", { section: t(lang, "sections.how.title") }),
    actions: [
      { id: "contact", label: t(lang, "assistant.next", { section: t(lang, "sections.contact.title") }) },
      { id: "menu", label: t(lang, "assistant.back") }
    ]
  },
  contact: {
    message: t(lang, "assistant.viewing", { section: t(lang, "sections.contact.title") }),
    actions: [{ id: "menu", label: t(lang, "assistant.back") }]
  }
});

const DEFAULT_POSITIONS = {
  projects: { x: 120, y: 80 },
  skills:   { x: 160, y: 120 },
  about:    { x: 200, y: 160 },
  how:      { x: 240, y: 200 },
  contact:  { x: 280, y: 240 },
};


function App() {

  useEffect(() => {
  initSfx(); },
   []);
  
  /**
   * Builds a memoized Map for O(1) section lookup by id
   */
  const sectionsById=useMemo(()=>{
    const map=new Map();
    sections.forEach((s)=>map.set(s.id,s));
    return map;
  },[]);

  const [openWindows,setOpenWindows]=useState([]);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [assistant, setAssistant] = useState(() => getMainMenuAssistant(false, "en"));
  const [positions,setPositions]=useState({});
  const [lang,setLang]=useState("en");
  const assistantFlow = useMemo(() => buildAssistantFlow(lang), [lang]);

  /**
   * 
   */
  const openWindow = (id) => {
    playClick();
    
    if (!hasGreeted) setHasGreeted(true);
    
    setOpenWindows((prev) => {
      const alreadyOpen = prev.includes(id);
      const next = alreadyOpen ? prev.filter((x) => x !== id) : prev;
      return [...next, id];
    });
    
    setPositions((prev) => {
      if (prev[id]) return prev; 
      return { ...prev, [id]: DEFAULT_POSITIONS[id] ?? { x: 120, y: 80 } };
    });
    
    const flow = assistantFlow[id];
    if (flow) setAssistant(flow);
  };


  /**
   * 
   */
  const closeWindow = (id) => {
    playClick();
    setOpenWindows((prev) => {
      const next=prev.filter((x)=>x!==id);
      
      if(next.length===0){
        setAssistant(getMainMenuAssistant(true,lang));
        return next;
    }
    
    const top=next[next.length-1];
    const flow=assistantFlow[top];

    if(flow){
      setAssistant({
        message:flow.message,
        actions:flow.actions});
    }

    return next;
    });
  };

/**
* 
*/
const focusWindow = (id) => {
  setOpenWindows((prev) => {
    const next = prev.filter((x) => x !== id);
    return [...next, id];
  });

  const flow = assistantFlow[id];

  if(flow){
    setAssistant({
      message:flow.message,
      actions:flow.actions
    });
  }
};

const handleAssistantAction = (id) => {
  if (id === "menu") {
    playClick();
    setOpenWindows([]);
    setPositions({});
    setAssistant(getMainMenuAssistant(true, lang));
    return;
  }
  openWindow(id);
};

const changeLanguage = (nextLang) => {
  setLang(nextLang);

  const current = openWindows[openWindows.length - 1];
  if (!current) {
    setAssistant(getMainMenuAssistant(hasGreeted, nextLang));
  } else {
    const flow = buildAssistantFlow(nextLang)[current];
    if (flow) setAssistant(flow);
  }
};



const activeWindowId = openWindows.length
 ? openWindows[openWindows.length-1]
 :null;



  return(
    <div style={{ height: "100%" }}>
      <Desktop sections={sections} onOpen={openWindow}/>

      {openWindows.map((id,idx)=>{
        const s=sectionsById.get(id);
        if(!s){
          return null;
        }

        return(
          <Window
          key={id}
          id={id}
          title={`${s.icon ?? ""} ${s.title}`.trim()}
          zIndex={10+idx}
          onClose={closeWindow}
          onFocus={focusWindow}
          position={positions[id]}
          onMove={(pos)=>setPositions((prev)=>({...prev,[id]:pos}))}
          >
            {s.content.type === "component" && (
              <s.content.component lang={lang} />
              )}
              
              {s.content.type === "text" && (
                <div style={{ padding: 16, whiteSpace: "pre-line" }}>
                  {s.content.body}
                </div>
              )}
          </Window>
        );
      })}

      <Assistant
      message={assistant.message}
      actions={assistant.actions}
      onAction={handleAssistantAction}
      />

      <Taskbar
      openWindows={openWindows}
      sectionsById={sectionsById}
      activeWindowId={activeWindowId}
      onFocus={focusWindow}
      lang={lang}
      setLanguage={changeLanguage}
    />
    </div>
  );
}

export default App
