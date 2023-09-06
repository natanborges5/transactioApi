import { Transaction } from "@/domain/transaction/enterprise/entities/transaction"
import { TransactionRepository } from "../../repositories/transaction-repository"
import { Either, right } from "@/core/either"
import { ResourceNotFoundError } from "../errors/resource-not-found-error"

interface GetTransactionByIdUseCaseRequest {
    id: string
}
type GetTransactionByIdUseCaseResponse = Either<ResourceNotFoundError,{
    transaction: Transaction
}>
export class GetTransactionByIdUseCase { 
    constructor(
        private transactionRepository: TransactionRepository,
    ){}
    async execute({id}: GetTransactionByIdUseCaseRequest) : Promise<GetTransactionByIdUseCaseResponse> {
        const transaction = await this.transactionRepository.findById(id)
        if(!transaction){
            throw new Error("Transaction not found")
        }
        return right({
            transaction
        })
    }
    
}