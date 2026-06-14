
import type { ComponentType } from "react"

export interface MenuItem {
  icon: ComponentType<any>   
  label: string
  path: string
  adminRoles?:string[]
  role?: string;
  children?: MenuItem[]
}