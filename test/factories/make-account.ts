import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Account, AccountProps } from "@/domain/transaction/enterprise/entities/account";
import {faker} from "@faker-js/faker"
import { makeTransaction } from "./make-transaction";
export function makeAccount(override: Partial<AccountProps> = {}, id?: UniqueEntityID){
    const account = Account.create({
        name: faker.person.fullName(),
        cpf: "000.000.000-00",
        avaliableLimit: Number(faker.finance.amount(100,5000)),
        transactions: [],
        activeCard: false,
        ...override
    }, id)
    return account;
}