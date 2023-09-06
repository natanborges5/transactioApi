import { Either, right } from "@/core/either";
import { AccountRepository } from "../../repositories/account-repository";
import { NotAllowedError } from "../errors/not-allowed-error";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteAccountUseCaseRequest {
    accountId: string
}
type DeleteAccountUseCaseResponse = Either<NotAllowedError | ResourceNotFoundError, {}>
export class DeleteAccountUseCase { 
    constructor(
        private accountRepository: AccountRepository,
    ){}
    async execute({accountId}: DeleteAccountUseCaseRequest) : Promise<DeleteAccountUseCaseResponse> {
        const account = await this.accountRepository.findById(accountId);
        if(!account){
            throw new Error("Account not found")
        }
        await this.accountRepository.delete(account)
        return right({})
    }
    
}