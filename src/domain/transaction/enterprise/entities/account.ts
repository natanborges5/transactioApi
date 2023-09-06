import { Entity } from "@/core/entities/entity"
import { Optional } from "@/core/types/optional"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { TransactionProps } from "./transaction"

export interface AccountProps {
    name: string
    cpf: string
    avaliableLimit: number
    transactions: TransactionProps[]
    activeCard: boolean
    createdAt: Date
    updatedAt?: Date
}
export class Account extends Entity<AccountProps>{
    get name(){
        return this.props.name
    }
    get cpf(){
        return this.props.cpf
    }
    get avaliableLimit(){
        return this.props.avaliableLimit
    }
    get transactions(){
        return this.props.transactions
    }
    get activeCard(){
        return this.props.activeCard
    }
    get createdAt(){
        return this.props.createdAt
    }
    get updatedAt(){
        return this.props.updatedAt
    }
    private touch(){
        this.props.updatedAt = new Date();
    }
    set avaliableLimit(limit: number){
        this.props.avaliableLimit = limit;
        this.touch()
    }
    set transactions(transactionsProps: TransactionProps[]){
        this.props.transactions = transactionsProps
        this.touch()
    }
    set activeCard(active: boolean){
        this.props.activeCard = active
        this.touch()
    }
    static create(props: Optional<AccountProps, "createdAt"> , id?: UniqueEntityID){
        const account = new Account({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)
        return account
    }  
}