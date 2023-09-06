import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository";
import { CreateTransactionUseCase } from "./create-transaction";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: CreateTransactionUseCase

describe("Create Transaction", () => {
    beforeEach(() => {
        inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
        sut = new CreateTransactionUseCase(inMemoryTransactionsRepository)
    })

    it("Should be able to create a transaction", async () => {
        const response = await sut.execute({
            payerAccountId: "1",
            merchantId: "1",
            value: 1000,
            transactionStatus: "Processing",
        })
        expect(response.isRight()).toBe(true)
        expect(inMemoryTransactionsRepository.items[0]).toEqual(response.value?.transaction)
    })
})