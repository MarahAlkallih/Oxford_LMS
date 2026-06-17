export interface InputProps {
    label:string,
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    containerWidth?:string,
    containerHeight?:string,
    width?:string,
    height?:string,
    gap?:string,
    error?:string;
    type?:string
    
}