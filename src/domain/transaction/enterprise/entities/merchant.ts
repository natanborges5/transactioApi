import { Entity } from "@/core/entities/entity";
import { AccountProps } from "./account";
import { AddressProps } from "./address";
import { Optional } from "@/core/types/optional";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

export interface MerchantProps extends AccountProps{
    storeName: string
    address: AddressProps
    createdAt: Date
    updatedAt?: Date
}
export class Merchant extends Entity<MerchantProps> {
    get storeName(){
        return this.props.storeName
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
    set storeName(name: string){
        this.props.storeName = name
        this.touch()
    }
    static create(props: Optional<MerchantProps, "createdAt"> , id?: UniqueEntityID){
        const merchant = new Merchant({
            ...props,
            createdAt: props.createdAt ?? new Date(),
        }, id)
        return merchant
    } 
}