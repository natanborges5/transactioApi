import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Optional } from "@/core/types/optional"

export interface AddressProps {
    accountId: UniqueEntityID
    streetName: string
    addressNumber: number
    postalCode: string
    city: string
    state: string
    createdAt: Date
    updatedAt?: Date
}
export class Address extends Entity<AddressProps> {
    get accountId(){
        return this.props.accountId;
    }
    get streetName(){
        return this.props.streetName;
    }
    get addressNumber(){
        return this.props.addressNumber;
    }
    get postalCode(){
        return this.props.postalCode;
    }
    get city(){
        return this.props.city;
    }
    get state(){
        return this.props.state;
    }
    get createdAt(){
        return this.props.createdAt;
    }
    get updatedAt(){
        return this.props.updatedAt;
    }
    private touch(){
        this.props.updatedAt = new Date();
    }
    set streetName(name: string){
        this.props.streetName = name;
        this.touch()
    }
    set addressNumber(addressNumber: number){
        this.props.addressNumber = addressNumber;
        this.touch()
    }
    set postalCode(code: string){
        this.props.postalCode = code;
        this.touch()
    }
    set city(cityName: string){
        this.props.city = cityName;
        this.touch()
    }
    set state(stateName: string){
        this.props.state = stateName;
        this.touch()
    }
    static create(props: Optional<AddressProps, "createdAt"> , id?: UniqueEntityID){
        const address = new Address({
            ...props,
            createdAt: new Date(),
        }, id)
        return address;
    } 
}