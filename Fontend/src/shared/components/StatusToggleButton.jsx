export default function StatusToggleButton({
  isActive,
  onConfirm
}) {

  return (

    <span
      onClick={onConfirm}
      className={`
        px-4 py-2 text-sm font-medium text-white rounded-xl transition
        ${isActive
          ? "bg-red-500 hover:bg-red-600"
          : "bg-green-500 hover:bg-green-600"}
      `}
    >

      {isActive ? "Disable" : "Enable"}

    </span>
  );
}