import { h, ref, defineComponent } from 'vue';
import { useLoading } from '@/hooks';
export default defineComponent({
    name: 'App',
    setup() {
        const { loading } = useLoading();
        const title = ref('title');
        return () => <div>123= ={title}</div>;
    }
});
