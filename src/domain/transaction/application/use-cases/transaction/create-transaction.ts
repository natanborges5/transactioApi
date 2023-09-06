import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Transaction } from "@/domain/transaction/enterprise/entities/transaction"
import { TransactionRepository } from "../../repositories/transaction-repository"
import { type } from "os"
import { Either, right } from "@/core/either"

interface CreateTransactionUseCaseRequest {
    payerAccountId: string
    merchantId: string
    value: number
    transactionStatus: string
}
type CreateTransactionUseCaseResponse = Either<null, {
    transaction: Transaction
}>
export class CreateTransactionUseCase { 
    constructor(
        private transactionRepository: TransactionRepository,
    ){}
    async execute({payerAccountId, merchantId, value, transactionStatus}: CreateTransactionUseCaseRequest) : Promise<CreateTransactionUseCaseResponse> {
        const transaction = Transaction.create({
            payerAccountId: new UniqueEntityID(payerAccountId),
            merchantId: new UniqueEntityID(merchantId),
            value,
            transactionStatus
        })
        await this.transactionRepository.create(transaction)
        return right({
            transaction
        })
    }
    
}