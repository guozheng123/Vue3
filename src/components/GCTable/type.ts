import internal from "stream";

export interface TABLE {
    name: string;
    age: number;
    lick?: string;
}

export interface PropsDetails {
    columns: any[];
    dataSource: any[];
}
