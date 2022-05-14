<template>
  <div>
    <table>
      <thead>
      <tr>
        <th v-for="header in headers" :key='header'> {{ header }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key='item'>
        <td v-for="field in item" :key='field'>{{ field }}</td>
        <td>
          <router-link v-show=showButton class="btn btn-primary" role="button"
                       :to="{ name: page, params: {id: item.id} }"> {{ buttonText }}
          </router-link>
        </td>
      </tr>
      </tbody>
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
    showButton: {
      type: Boolean,
    },
    buttonText: {
      type: String,
    },
    page: {
      type: String,
    },
  }
}

</script>
