export const filterCategory = (data: any, cate: string) => {
    const dataFilter = data.filter((d: any) => d.category === cate);
    
    return dataFilter;
};