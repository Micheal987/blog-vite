import type { SettingType } from "@/api/setting/setting_api"
import type { FieldRule } from "@arco-design/web-vue/es/form"

export interface ConfigColumnType<T extends SettingType> {
    label: string
    field: keyof T
    rules?: FieldRule[]
    placeholder?: string
    inputType?: 'password'
    type: 'string' | 'number' | 'boolean'
}