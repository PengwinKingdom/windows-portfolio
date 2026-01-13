import ProjectsPage from "../pages/ProjectsPage";
import SkillsPage from "../pages/SkillsPage";
import AboutPage from "../pages/AboutPage";
import HowPage from "../pages/HowPage";
import ContactPage from "../pages/ContactPage";

export const sections=[
    {
        id:"projects",
        title:"Projects",
        iconPath: "icons/folder.png",
        assistantDialogKey: "sections.projects.assistantDialog",
        content:{
            type: "component",
            component: ProjectsPage,
        },
    },

    {
        id:"skills",
        title:"Skills",
        iconPath: "icons/goals.png",
        assistantDialogKey: "sections.skills.assistantDialog",
        content:{
            type: "component",
            component: SkillsPage
        },
    },

    {
        id:"about",
        title:"About Me",
        iconPath: "icons/notebook.png",
        assistantDialogKey: "sections.about.assistantDialog",
        content:{
            type: "component",
            component: AboutPage
        },
    },

    {
        id:"how",
        title:"How I Work",
        iconPath: "icons/gears.png",
        assistantDialogKey: "sections.how.assistantDialog",
        content:{
            type: "component",
            component: HowPage
        },
    },

    {
        id:"contact",
        title:"Contact",
        iconPath: "icons/gmail.png",
        assistantDialogKey: "sections.contact.assistantDialog",
        content:{
            type: "component",
            component: ContactPage
        },
    },
];