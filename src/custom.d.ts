type RecordItem = {
    tags: TagLabel[];
    notes: string;
    type: string;
    amount: number; // 数据类型 object | string
    createdAt?: string;  // 类 / 构造函数
}

type TagLabel = {
    id: string;
    name: string;
}

type TagListModel = {
    data: TagLabel [];
    fetch: () => TagLabel[];
    create: (name: string) => 'success' | 'duplicated'; // 联合类型
    update: (id: string, name: string) => 'success' | 'not found' | 'duplicated';
    remove: (id: string) => boolean;
    save: () => void;
}