// export const useRecursion = (
//     list: any[],
//     key: string,
//     setKey: string,
//     getKey: string,
//     router: any
// ) => {
//     list.forEach((item) => {
//         // let item = {};
//         if (Array.isArray(item[key])) {
//             useRecursion(item[key], key, setKey, getKey, router);
//         } else {
//             item[setKey] = () => import(`@/views/${item[getKey]}/index.tsx`);
//         }
//         router.addRoute(item);
//     });
// };
