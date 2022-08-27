export default interface InitialStateSubject {
    isShowModal: boolean,
    idForUpdate?: number | null,
    filterValue: string,
    selectedRows: Array<number>,
    isSelectAll: boolean,
    pagination: {totalCount: number, pageSize: number, currentPage: number},
}