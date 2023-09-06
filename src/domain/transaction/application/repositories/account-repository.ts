import { Account } from "../../enterprise/entities/account"

export interface AccountRepository {
    findById(id: string): Promise<Account | null>
    create(account: Account): Promise<void>
    save(account: Account): Promise<void>
    delete(account: Account): Promise<void>
}