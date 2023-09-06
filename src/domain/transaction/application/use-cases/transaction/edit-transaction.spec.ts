import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository";
import { EditTransactionUseCase } from "./edit-transaction-status";
import { makeTransaction } from "test/factories/make-transaction";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: EditTransactionUseCase

describe("Edit Transaction", () => {
    beforeEach(() => {
        inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
        sut = new EditTransactionUseCase(inMemoryTransactionsRepository)
    })

    it("Should be able to edit a transaction", async () => {
        const newTransaction = makeTransaction({
            payerAccountId: new UniqueEntityID("payer-1"),
            transactionStatus: "In progress"
        }, new UniqueEntityID("transaction-1"))
        await inMemoryTransactionsRepository.create(newTransaction)

        await sut.execute({
            transactionId: newTransaction.id.toString(),
            transactionStatus: "Canceled",
        })
        expect(inMemoryTransactionsRepository.items[0]).toMatchObject({
            transactionStatus: "Canceled",
        })
    })
})