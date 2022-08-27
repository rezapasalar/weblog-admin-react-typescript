export default interface UseDeleteAndUpdate {
    isSelect: boolean,
    setIsSelect: React.Dispatch<React.SetStateAction<boolean>>,
    getIsSubmit: (value?: string) => boolean,
    deleteHandler: () => Promise<void>,
    updateHandler: () => void,
    toggleDoneHandler?: () => Promise<void>
}