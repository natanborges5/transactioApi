import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository";
import { GetTransactionByIdUseCase } from "./get-transaction-by-id";
import { makeTransaction } from "test/factories/make-transaction";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: GetTransactionByIdUseCase

describe("Get Transaction By Id", () => {
    beforeEach(() => {
        inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
        sut = new GetTransactionByIdUseCase(inMemoryTransactionsRepository)
    })

    it("Should be able to get a transaction by id", async () => {
        const newTransaction = makeTransaction()
        await inMemoryTransactionsRepository.create(newTransaction)
        const response = await sut.execute({
            id: newTransaction.id.toString()
        })
        expect(response.value).toBeTruthy
    })
})