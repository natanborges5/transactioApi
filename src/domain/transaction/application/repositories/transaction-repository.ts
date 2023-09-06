import { PaginationParams } from "@/core/repositories/pagination-params"
import { Transaction } from "../../enterprise/entities/transaction"

export interface TransactionRepository {
    findById(id: string): Promise<Transaction | null>
    findManyByAccountId(accountId: string, params: PaginationParams): Promise<Transaction[]>
    create(transaction: Transaction): Promise<void>
    save(transaction: Transaction): Promise<void>
    delete(transaction: Transaction): Promise<void>
}