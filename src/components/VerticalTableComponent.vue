<template>
  <div>
    <table>
      <tr v-for='(data, index) in item' :key='data'>
        <th>{{ headers[index] }}</th>
        <td>{{ data }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'VerticalTableComponent',
  props: {
    item: {},
    headers: {},
  }
}

</script>
