import { Either, right } from "@/core/either";
import { TransactionRepository } from "../../repositories/transaction-repository";
import { NotAllowedError } from "../errors/not-allowed-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteTransactionUseCaseRequest {
    payerAccountId: string
    transactionId: string
}
type DeleteTransactionUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {}>
export class DeleteTransactionUseCase { 
    constructor(
        private transactionRepository: TransactionRepository,
    ){}
    async execute({transactionId,payerAccountId}: DeleteTransactionUseCaseRequest) : Promise<DeleteTransactionUseCaseResponse> {
        const transaction = await this.transactionRepository.findById(transactionId);
        if(!transaction){
            throw new Error("Transaction not found")
        }
        if(payerAccountId !== transaction.payerAccountId.toString()) {
            throw new Error("Not allowed")
        }
        await this.transactionRepository.delete(transaction)
        return right({})
    }
    
}