import { h, ref, defineComponent } from 'vue';
import { useLoading } from '@/hooks';
export default defineComponent({
    name: 'App',
    setup() {
        const { loading } = useLoading();
        const a = 99999999999999999999999999999999000000000000000000099999999999999999999999999999999999999999999999999999999999999999;
        const title = ref('title');
        return () => <div>123= ={title}</div>;
    }
});
