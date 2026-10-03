export type RetroAppType = 
  | 'about'
  | 'projects'
  | 'capabilities'
  | 'experience'
  | 'contact'
  | 'terminal'
  | 'paint'
  | 'walkman'
  | 'trash'
  | 'settings';

export interface RetroWindowState {
  id: string;
  title: string;
  appType: RetroAppType;
  isMinimized: boolean;
  isZoomed: boolean;
  isCollapsed: boolean; // Windowshade rollup effect
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
  zIndex: number;
  params?: Record<string, any>;
  themeColor?: string; // App-specific retro accent color
}

export type RetroIconName = 
  | 'mac' 
  | 'folder' 
  | 'cpu' 
  | 'briefcase' 
  | 'mail' 
  | 'terminal' 
  | 'paint' 
  | 'tape' 
  | 'trash' 
  | 'trash-full' 
  | 'settings' 
  | 'floppy';

export interface RetroDesktopIcon {
  id: string;
  title: string;
  appType: RetroAppType;
  iconName: RetroIconName;
  position: { x: number; y: number };
  params?: Record<string, any>;
  badge?: string;
  color?: string;
}

export type RetroTheme = 
  | 'vaporwave-sunset' 
  | 'win95-teal' 
  | 'candy-pastel' 
  | 'cyber-matrix' 
  | 'imac-bondi' 
  | 'classic-grey';
