import Image from "next/image";

export type Icon = React.ReactNode | string;

interface InputIconProps {
  icon: Icon;
  side: "left" | "right";
}
const InputIcon = (props: InputIconProps) => {
  const { icon: iconProp, side } = props;

  if (!iconProp) return null;

  const icon =
    typeof iconProp === "string" ? (
      <Image src={iconProp} alt="Icon" width={20} height={20} />
    ) : (
      iconProp
    );

  const sideClass = side === "left" ? "left-0 pr-3" : "right-0 pl-3";

  return (
    <div className={`flex items-center justify-center ${sideClass}`}>
      {icon}
    </div>
  );
};

export default InputIcon;
