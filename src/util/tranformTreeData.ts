export const NestedToFlat = (data: any, moduleId: string, pid?: string) => {
    // 嵌套转平铺
    let res: any[] = [];
    for (const item of data) {
        res.push({
            id: item.id,
            label: item.label,
            description: item.description,
            bandFlag: item.bandFlag,
            moduleId,
            pid: pid || "0",
        });
        if (item.children) {
            res = res.concat(NestedToFlat(item.children, moduleId, item.id));
        }
    }
    return res;
};

// export const FlatToNested = (data: any, option?: any) => {
//     // 平铺转嵌套
//     debugger;
//     option = option || {};
//     const idProperty = option.idProperty || "id";
//     const parentProperty = option.parentProperty || "pid";
//     const childrenProperty = option.childrenProperty || "children";
//     const res = [];
//     const tmpMap = [];
//     for (const item of data) {
//         tmpMap[item[idProperty]] = item;
//         if (
//             tmpMap[item[parentProperty]] &&
//             item[idProperty] !== item[parentProperty]
//         ) {
//             if (!tmpMap[item[parentProperty]][childrenProperty]) {
//                 tmpMap[item[parentProperty]][childrenProperty] = [];
//             }
//             tmpMap[item[parentProperty]][childrenProperty].push(item);
//         } else {
//             res.push(item);
//         }
//     }
//     return res;
// };

export const FlatToNested = (arr: any[]) => {
    for (const item of arr) {
        const temp = arr.filter((i) => i.id === item.pid)[0];
        if (temp) {
            if (!temp.children) {
                temp.children = [];
            }
            temp.children.push(item);
        }
    }
    return arr.filter((item) => item.pid === "0");
}
