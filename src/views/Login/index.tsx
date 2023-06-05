import { defineComponent } from "vue";
type DataList = {
    title: string;
    dataIndex: string;
    key: string;
};
export default defineComponent({
    name: "login",
    setup() {
        const dataSource: DataList[] = [];
        const columns = [
            {
                title: "姓名",
                dataIndex: "name",
                key: "name",
            },
            {
                title: "年龄",
                dataIndex: "age",
                key: "age",
            },
            {
                title: "住址",
                dataIndex: "address",
                key: "address",
            },
        ];
        return () => (
            <div>
                <a-button>按钮1</a-button>
                <a-button>按钮2</a-button>
                <a-input />
                <a-table dataSource={dataSource} columns={columns} />
            </div>
        );
    },
});
