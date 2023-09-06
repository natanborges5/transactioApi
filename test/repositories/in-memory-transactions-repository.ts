import { PaginationParams } from "@/core/repositories/pagination-params";
import { TransactionRepository } from "@/domain/transaction/application/repositories/transaction-repository";
import { Transaction } from "@/domain/transaction/enterprise/entities/transaction";

export class InMemoryTransactionsRepository implements TransactionRepository {
    public items: Transaction[] = [];
    async findById(id: string){
        const transaction = this.items.find(item => item.id.toString() === id);
        if(!transaction){
            return null
        }
        return transaction
    }
    async findManyByAccountId(accountId: string, {page}: PaginationParams) {
        const answers = this.items.filter(item => item.payerAccountId.toString() === accountId).slice((page - 1) * 20, page * 20)
        return answers
    }
    async create(transaction: Transaction) {
        this.items.push(transaction);
    }
    async save(transaction: Transaction){
        const itemIndex = this.items.findIndex(item => item.id === transaction.id)
        this.items[itemIndex] = transaction
    }
    async delete(transaction: Transaction) {
        const itemIndex = this.items.findIndex(item => item.id === transaction.id)
        this.items.splice(itemIndex, 1)
    }
}