import { Button } from "./ui/button";

export function ButtonWithIcon({ icon: Icon, iconColor, iconSize, children, ...props }: { icon: React.ElementType, iconColor?: React.CSSProperties['color'], iconSize?: number } & React.ComponentProps<typeof Button>) {
  return (
    <Button {...props} className="flex items-center gap-2">
      <Icon data-icon="inline-start" style={iconColor ? { color: iconColor } : undefined} className={`size-${iconSize || 5}`} />
      {children}
    </Button>
  )
}