import { Transaction } from "@/domain/transaction/enterprise/entities/transaction";
import { TransactionRepository } from "../../repositories/transaction-repository";
import { Either, right } from "@/core/either";
import { NotAllowedError } from "../errors/not-allowed-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface EditTransactionUseCaseRequest {
    transactionId: string
    transactionStatus: string
}
type EditTransactionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError ,{
    transaction: Transaction
}>
export class EditTransactionUseCase { 
    constructor(
        private transactionRepository: TransactionRepository,
    ){}
    async execute({transactionId,transactionStatus}: EditTransactionUseCaseRequest) : Promise<EditTransactionUseCaseResponse> {
        const transaction = await this.transactionRepository.findById(transactionId);
        if(!transaction){
            throw new Error("Transaction not found")
        }
        transaction.transactionStatus = transactionStatus
        await this.transactionRepository.save(transaction)
        return right({transaction})
    }
    
}