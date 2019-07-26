export const NestedToFlat = (data: any, moduleId: string, pid?: string) => {
    // 树状转平铺
    let res: any[] = [];
    for (const item of data) {
        res.push({
            id: item.id,
            label: item.label,
            description: item.description,
            moduleId,
            pid: pid || "0",
        });
        if (item.children) {
            res = res.concat(NestedToFlat(item.children, moduleId, item.id));
        }
    }
    return res;
}

export const FlatToNested = (data: any, option?: any) => {
    option = option || {};
    const idProperty = option.idProperty || "id";
    const nameProperty = option.nameProperty || "label";
    const descProperty = option.descProperty || "description";
    const parentProperty = option.parentProperty || "pid";
    const childrenProperty = option.childrenProperty || "children";
    const res = [];
    const tmpMap = [];
    for (const item of data) {
        tmpMap[item[idProperty]] = item;
        if (
            tmpMap[item[parentProperty]] &&
            item[idProperty] !== item[parentProperty]
        ) {
            if (!tmpMap[item[parentProperty]][childrenProperty]) {
                tmpMap[item[parentProperty]][childrenProperty] = [];
            }
            item[nameProperty] = item[nameProperty];
            item[descProperty] = item[descProperty];
            tmpMap[item[parentProperty]][childrenProperty].push(item);
        } else {
            item[nameProperty] = item[nameProperty];
            item[descProperty] = item[descProperty];
            res.push(item);
        }
    }
    return res;
}
