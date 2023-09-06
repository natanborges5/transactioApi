import { Account } from "@/domain/transaction/enterprise/entities/account"
import { AccountRepository } from "../../repositories/account-repository"
import { TransactionProps } from "@/domain/transaction/enterprise/entities/transaction"
import { Either, right } from "@/core/either"

interface CreateAccountUseCaseRequest {
    name: string
    cpf: string
    avaliableLimit: number
    transactions: TransactionProps[]
    activeCard: boolean
}
type CreateAccountUseCaseResponse = Either<null, {
    account: Account
}>
export class CreateAccountUseCase { 
    constructor(
        private accountRepository: AccountRepository,
    ){}
    async execute({name, cpf, avaliableLimit, transactions, activeCard}: CreateAccountUseCaseRequest) : Promise<CreateAccountUseCaseResponse> {
        const account = Account.create({
            name,
            cpf,
            avaliableLimit,
            transactions,
            activeCard
        })
        await this.accountRepository.create(account)
        return right({account})
        
    }
    
}