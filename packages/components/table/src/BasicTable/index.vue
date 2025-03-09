<script setup lang="tsx">
import type { FormInstance, PaginationProps } from 'ant-design-vue'
import type { ColumnType } from 'ant-design-vue/es/table'
import type { BasicTableProps } from './types'
import { MenuOutlined } from '@ant-design/icons-vue'
import { Button as AntButton, Dropdown as AntDropDown, Form as AntForm, FormItem as AntFormItem, Input as AntInput, Menu as AntMenu, MenuItem as AntMenuItem, Popconfirm as AntPopConfirm, Select as AntSelect, SelectOption as AntSelectOption, Table as AntTable } from 'ant-design-vue'
import { isArray, isNil, omit } from 'lodash-es'
import { computed, onMounted, onUnmounted, ref, useTemplateRef } from 'vue'

defineOptions({
  name: 'BasicTable',
})
const props = withDefaults(defineProps<BasicTableProps>(), {
  columns: () => [],
  request: () => Promise.resolve({}),
})
const filtersForm = useTemplateRef<FormInstance>('filtersForm')
const filtersFormState = ref<Record<string, any>>(props.initFilters as Record<string, any>) // initFilters 是可选的所以可能为undefined
const columnsArr = computed(() => {
  return props.columns.map((item) => {
    return omit(item, ['isShow', 'value', 'helpMsg', 'type']) as ColumnType
  })
})
const loading = ref<boolean>(false)
const isLoading = computed(() => props.loading ?? loading.value)
const dataSource = ref<any[]>([])
async function request(pagination: PaginationProps = { pageSize: 10, current: 1 }, filters?: Record<string, any>) {
  try {
    loading.value = true
    dataSource.value = await props.request(pagination, filters) as any
  }
  finally {
    loading.value = false
  }
}
// let timer: NodeJS.Timeout | number
let timer: ReturnType<typeof setInterval> | null | undefined = null
onMounted(() => {
  request(props.pagination, filtersForm.value?.getFieldsValue())
  if (props.polling) {
    timer = setInterval(() => {
      reload()
    }, props.pollingInterval || 10000)
  }
})
onUnmounted(() => {
  if (timer)
    clearInterval(timer)
})
// 刷新 用于轮询
function reload() {
  request(props.pagination, filtersForm.value?.getFieldsValue())
}

function handleChange(pagination: PaginationProps, filters?: Record<string, any>) {
  request(pagination, filters)
}
defineExpose({
  reload,
})

// function actionRender(action: ActionItem | DropdownActions) {
//   return (
// <AntDropDown v-slots={{ overlay: () =(
//     <AntMenu>
//       {action.filter((item, idx) => {
//
//       })}
//     </AntMenu>
//   )}}>
// </AntDropDown>
//   )
// }
</script>

<template>
  <div class="basic-table m-[15px]">
    <slot name="filters">
      <AntForm ref="filtersForm" layout="inline" :model="filtersFormState">
        <template v-for="(item) in filters" :key="item.label">
          <AntFormItem :label="item.label" :name="item.name">
            <template v-if="item.type === 'input'">
              <AntInput v-model:value="filtersFormState[item.name]" />
            </template>
            <template v-else-if="item.type === 'select'">
              <AntSelect v-model:value="filtersFormState[item.name]" style="width: 100%">
                <AntSelectOption v-for="(option, idx) in item.options" :key="idx" :value="option.value">
                  {{ option.label }}
                </AntSelectOption>
              </AntSelect>
            </template>
          </AntFormItem>
        </template>
        <AntFormItem>
          <AntButton type="primary" @click="reload">
            查询
          </AntButton>
        </AntFormItem>
      </AntForm>
    </slot>
    <slot name="toolbar">
      <div>
        <slot name="表格标题" class="font-200">
          {{ title }}
        </slot>
        <slot name="actions">
          <!-- <slot name="toolbar-right" /> -->
          <!-- TODO:actions -->
          <template v-for="(action, index) in actions" :key="index">
            <template v-if="isArray(action)">
              <AntDropDown>
                <MenuOutlined />
                <template #overlay>
                  <AntMenu>
                    <AntMenuItem v-for="(item, i) in action" :key="i" @click="item.onClick">
                      {{ item.label }}
                    </AntMenuItem>
                  </AntMenu>
                </template>
              </AntDropDown>
            </template>
            <template v-else>
              <!--    如果配置了popConfirm     -->
              <AntPopConfirm
                v-if="!isNil(action?.popConfirm)"
                :title="action.popConfirm?.title"
                :on-confirm="action.popConfirm?.onConfirm"
                :ok-text="action.popConfirm?.confirmText"
                :cancel-text="action.popConfirm?.cancelText"
                @confirm="action.popConfirm?.onConfirm"
                @cancel="action.popConfirm?.onCancel"
              >
                <AntButton :disabled="action.disabled" :type="action.type ?? 'default'" @click="action.onClick">
                  {{ action.label }}
                </AntButton>
              </AntPopConfirm>
              <AntButton v-else :disabled="action.disabled" :type="action.type ?? 'default'" @click="action.onClick">
                {{ action.label }}
              </AntButton>
            </template>
          </template>
        </slot>
      </div>
    </slot>
    <AntTable
      :columns="columnsArr"
      :data-source="dataSource"
      :pagination="!isNil($slots.pagination) ? false : pagination"
      :loading="isLoading"
      :row-key="(record) => record.id"
      :request="request"
      @change="handleChange"
    >
      <!--            <template #bodyCell="{ column }"> -->
      <!--              <template v-if="get(column,'type') === 'actions'"> -->
      <!--                <template v-for="(action,_idx) in getActions(column)" :key="_idx"> -->
      <!--                  <action-render></action-render> -->
      <!--                </template> -->
      <!--              </template> -->
      <!--            </template> -->
      <!--      <template v-for="(_, key) in $slots" :key="key" #[key]="scope" /> -->
    </AntTable>
    <slot name="pagination" />
  </div>
</template>

<style scoped>

</style>
