<script >
import { useCounterStore } from '@/stores/counter'

export default defineComponent({
  setup() {
    const store = useCounterStore()
    const getCount = computed(() => store.getCount)
    const { increment } = store
    return { getCount, increment }
  },
})


  </script>
  
  <template>
    <p>Counter: {{ getCount }}</p>
    <button type="button" @click="increment">Increment</button>
  </template>