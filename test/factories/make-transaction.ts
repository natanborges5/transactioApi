import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { Transaction, TransactionProps } from "@/domain/transaction/enterprise/entities/transaction";
import {faker} from "@faker-js/faker"
export function makeTransaction(override: Partial<TransactionProps> = {}, id?: UniqueEntityID){
    const transaction = Transaction.create({
        payerAccountId: new UniqueEntityID(),
        merchantId: new UniqueEntityID(),
        value: Number(faker.finance.amount(100,2000)),
        transactionStatus: "Processing",
        ...override
    }, id)
    return transaction;
}