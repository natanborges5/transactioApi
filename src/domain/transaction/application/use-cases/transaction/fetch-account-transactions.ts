import { Transaction } from "@/domain/transaction/enterprise/entities/transaction"
import { TransactionRepository } from "../../repositories/transaction-repository"
import { type } from "os"
import { Either, right } from "@/core/either"

interface FetchAccountTransactionsUseCaseRequest {
    accountId: string
    page: number
}
type FetchAccountTransactionsUseCaseResponse = Either<null ,{
    transactions: Transaction[]
}>
export class FetchAccountTransactionsUseCase { 
    constructor(
        private transactionRepository: TransactionRepository,
    ){}
    async execute({accountId,page}: FetchAccountTransactionsUseCaseRequest) : Promise<FetchAccountTransactionsUseCaseResponse> {
        const transactions = await this.transactionRepository.findManyByAccountId(accountId, {page})
        console.log(transactions)
        return right({
            transactions
        })
    }
    
}