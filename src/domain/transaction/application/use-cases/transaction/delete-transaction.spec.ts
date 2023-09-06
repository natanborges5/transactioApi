import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository";
import { DeleteTransactionUseCase } from "./delete-transaction";
import { makeTransaction } from "test/factories/make-transaction";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: DeleteTransactionUseCase

describe("Delete Transaction", () => {
    beforeEach(() => {
        inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
        sut = new DeleteTransactionUseCase(inMemoryTransactionsRepository)
    })

    it("Should be able to delete a transaction", async () => {
        const newTransaction = makeTransaction({
            payerAccountId: new UniqueEntityID("payer-1")
        }, new UniqueEntityID("transaction-1"))
        await inMemoryTransactionsRepository.create(newTransaction)
        await sut.execute({
            transactionId: "transaction-1",
            payerAccountId: "payer-1"
        })
        expect(inMemoryTransactionsRepository.items).toHaveLength(0)
    })
    it("Should not be able to delete a transaction from another user", async () => {
        const newTransaction = makeTransaction({
            payerAccountId: new UniqueEntityID("author-1")
        }, new UniqueEntityID("transaction-1"))
        await inMemoryTransactionsRepository.create(newTransaction)
        expect(() => {
            return sut.execute({
                transactionId: "transaction-1",
                payerAccountId: "author-2"
            })
        }).rejects.toBeInstanceOf(Error)
    })
})