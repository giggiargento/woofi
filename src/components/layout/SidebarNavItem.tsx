import { Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { cn } from '@/utils/cn';
import { COLORS } from '@/constants';

export interface SidebarNavItemProps {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  collapsed?: boolean;
  onPress?: () => void;
}

export function SidebarNavItem({
  label,
  icon,
  active,
  collapsed,
  onPress,
}: SidebarNavItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        'mb-1 flex-row items-center rounded-2xl px-3 py-2.5 web:hover:bg-sand/40',
        active && 'bg-sand/60',
        collapsed && 'justify-center px-2'
      )}
    >
      <Ionicons
        name={icon}
        size={22}
        color={active ? COLORS.textDark : COLORS.muted}
      />
      {!collapsed ? (
        <Text
          className={cn(
            'ml-3 text-sm font-semibold',
            active ? 'text-text-dark' : 'text-muted'
          )}
        >
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}

export function SidebarNavGroup({ children }: { children: React.ReactNode }) {
  return <View className="py-2">{children}</View>;
}

export function SidebarDivider() {
  return <View className="my-3 border-t border-border-strong" />;
}
