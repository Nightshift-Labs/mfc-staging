export interface ButtonProps {
    click?: React.MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    text:string,
    link:string,
    type:string,
    icon:boolean
}