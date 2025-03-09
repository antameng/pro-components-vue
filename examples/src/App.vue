<script setup lang="ts">
// import { AmTable } from '@am/packages'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    type: 'default' as const,
  },
]

async function request() {
  return [
    { name: '测试数据', id: 1 },
    { name: '张三', id: 2 },
    { name: '测试数据1', id: 3 },
    { name: '测试数据2', id: 4 },
  ]
}
</script>

<template>
  <div>examples</div>
  <ComponentA />
  <AmTable
    title="表格"
    :columns="columns"
    :request="request"
    :pagination="{ pageSize: 10, current: 1 }"
  />
</template>
