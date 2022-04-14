export interface TransactionModalProps {
    onViewTransactions:Function,
    disabled:boolean,
    status: string,
    isOpen: boolean,
    closeModal: () => void,
}