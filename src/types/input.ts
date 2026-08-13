export interface InputProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string;
  containerWidth?: string;
  width?: string;
  height?: string;
  gap?: string;
  showPasswordToggle?: boolean;
}