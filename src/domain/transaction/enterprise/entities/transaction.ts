import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface TransactionProps {
    payerAccountId: UniqueEntityID
    merchantId: UniqueEntityID
    value: number
    transactionStatus: string
    createdAt: Date
    updatedAt?: Date
}
export class Transaction extends Entity<TransactionProps>{
    get payerAccountId(){
        return this.props.payerAccountId
    }
    get merchantId(){
        return this.props.merchantId
    }
    get value(){
        return this.props.value
    }
    get transactionStatus(){
        return this.props.transactionStatus
    }
    get createdAt(){
        return this.props.createdAt
    }
    private touch(){
        this.props.updatedAt = new Date();
    }
    set value(value: number){
        this.props.value = value
        this.touch()
    }
    set transactionStatus(content: string){
        this.props.transactionStatus = content;
        this.touch()
    }
    static create(props: Optional<TransactionProps, "createdAt"> , id?: UniqueEntityID){
        const transaction = new Transaction({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)
        return transaction
    } 
}