export default function DesktopIcon({ iconPath, label, onOpen }) {
  return (
    <button
      type="button"
      onDoubleClick={onOpen}
      className="desktop-icon"
      title="Double click to open"
    >
      <img className="desktop-icon__img" src={iconPath} alt="" />
      <span className="desktop-icon__label">{label}</span>
    </button>
  );
}
