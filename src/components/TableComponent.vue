<template>
  <div>
    <table>
      <th v-for="header in headers" :key='header'> {{ header }}</th>
      <tr v-for="item in items" :key='item'>
        <td v-for="field in item" :key='field'>{{ field }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'TableComponent',
  props: {
    items: {
      type: Array,
    },
    headers: {
      type: Array,
    },
  },
}

</script>
