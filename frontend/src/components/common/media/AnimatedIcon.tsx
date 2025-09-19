import styles from "./AnimatedIcon.module.css";

interface AnimatedIconProps {
  icon?: string; // ej. 'x-lg'
  animation?: keyof typeof styles; // ej. 'rotateOnHover'
  className?: string;
  color?: 'rosa' | 'azul' | ''; // Color del icono
  default?: boolean; // si se aplica 'icono-color'
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon = 'x-lg',
  animation = '',
  className = '',
  color = 'rosa',
  default: applyDefault = true,
  ...props
}) => {
  const animationClass = animation ? styles[animation] : '';
  const colorClass = applyDefault ? `icono-${color}` : '';

  return (
    <i
      className={`bi bi-${icon} ${animationClass} ${colorClass} ${className}`}
      {...props}
     />
  );
};

export default AnimatedIcon;
