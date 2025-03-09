import type { ButtonType } from 'ant-design-vue/es/button'
import type {
  PaginationProps,
} from 'ant-design-vue/es/pagination'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { VNode } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

// export type ColumnItemType = 'default'|'select'|'actions'|'switch'
export type ColumnItemType = 'default' | 'actions'

export interface ColumnItem extends ColumnType {
  type: ColumnItemType
  actions?: Array<ActionItem | DropdownActions>
  helpMsg?: string
  isShow?: (record: Record<string, any>) => boolean
  value?: (record: Record<string, any>) => string | ActionItem[]
}

export interface popConfirm {
  title: string
  confirmText?: string // 确认按钮文字
  cancelText?: string // 取消按钮文字
  onConfirm?: () => void // 点击确认事件
  onCancel?: () => void // 点击取消事件
  icon?: string
}
export interface ActionItem {
  label: string
  disabled?: boolean
  color?: 'success' | 'error' | 'warning' | 'primary'
  // type?: 'primary' | 'ghost' | 'dashed' | 'link' | 'text' | 'default'
  // type?: string
  type?: ButtonType | undefined
  props?: any
  icon?: string
  popConfirm?: popConfirm
  isShow?: (record: Record<string, any>) => boolean
  onClick?: (record: Record<string, any>) => void
  tooltips?: string
}

export type DropdownActions = ActionItem[]
export interface BasicTableProps {
  title: string
  pagination: PaginationProps
  columns: ColumnItem[]
  request: (
    pagination: PaginationProps,
    filters?: Record<string, any>,
    // sorter: Record<string, any>,
  ) => Promise<unknown>
  actions?: Array<ActionItem | DropdownActions>
  filters?: any[]
  initFilters?: Record<string, any>
  loading?: boolean
  polling?: boolean
  pollingInterval?: number // 轮询的间隔
  toolbarRender?: () => VNode | JSX.Element | false // 工具插槽
  filtersRender?: () => VNode | JSX.Element | false // 过滤插槽
  tableAreaRender?: () => VNode | JSX.Element | false // 表格区域插槽
  paginationRender?: () => VNode | JSX.Element | false // 分页插槽
  titleHelpMsg?: string
}
