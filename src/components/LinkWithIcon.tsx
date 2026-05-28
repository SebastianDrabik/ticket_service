import { Link } from "@tanstack/react-router";

export function LinkWithIcon({ icon: Icon, iconColor, iconSize, children, ...props }: { icon: React.ElementType, iconColor?: React.CSSProperties['color'], iconSize?: number } & React.ComponentProps<typeof Link>) {
  return (
    <Link {...props} className="flex items-center gap-2">
      {({ isActive, isTransitioning }) => (
        <>
          <Icon data-icon="inline-start" style={iconColor ? { color: iconColor } : undefined} className={`size-${iconSize || 5}`} />
          {typeof children === 'function' ? children({ isActive, isTransitioning }) : children}
        </>
      )}
    </Link>
  )
}