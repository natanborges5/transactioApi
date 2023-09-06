import { PaginationParams } from "@/core/repositories/pagination-params";
import { AccountRepository } from "@/domain/transaction/application/repositories/account-repository";
import { Account } from "@/domain/transaction/enterprise/entities/account";

export class InMemoryAccountsRepository implements AccountRepository {
    public items: Account[] = [];
    async findById(id: string){
        const account = this.items.find(item => item.id.toString() === id);
        if(!account){
            return null
        }
        return account
    }
    async create(account: Account) {
        this.items.push(account);
    }
    async save(account: Account){
        const itemIndex = this.items.findIndex(item => item.id === account.id)
        this.items[itemIndex] = account
    }
    async delete(account: Account) {
        const itemIndex = this.items.findIndex(item => item.id === account.id)
        this.items.splice(itemIndex, 1)
    }
}