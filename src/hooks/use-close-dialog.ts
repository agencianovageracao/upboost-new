const useDismissModal = (modalName: string) => {
    const dismiss = () => (document.querySelector(`[data-state="open"].${modalName}`) as HTMLDivElement).click()
    return {
        dismiss
    }
}

export default useDismissModal