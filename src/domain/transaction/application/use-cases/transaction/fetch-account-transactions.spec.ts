import { InMemoryTransactionsRepository } from "test/repositories/in-memory-transactions-repository";
import { FetchAccountTransactionsUseCase } from "./fetch-account-transactions";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { makeTransaction } from "test/factories/make-transaction";

let inMemoryTransactionsRepository: InMemoryTransactionsRepository
let sut: FetchAccountTransactionsUseCase

describe("Fetch Account transactions", () => {
    beforeEach(() => {
        inMemoryTransactionsRepository = new InMemoryTransactionsRepository();
        sut = new FetchAccountTransactionsUseCase(inMemoryTransactionsRepository)
    })

    it("Should be able to fetch account transactions", async () => {
        await inMemoryTransactionsRepository.create(makeTransaction({payerAccountId: new UniqueEntityID("account-1")}))
        await inMemoryTransactionsRepository.create(makeTransaction({payerAccountId: new UniqueEntityID("account-1")}))
        await inMemoryTransactionsRepository.create(makeTransaction({payerAccountId: new UniqueEntityID("account-1")}))

        const response = await sut.execute({
            accountId: "account-1",
            page: 1
        })
        expect(response.value?.transactions).toHaveLength(3)
    })
    it("Should be able to fetch paginated account transactions", async () => {
        for (let i = 1; i<= 22; i++){
            await inMemoryTransactionsRepository.create(makeTransaction({payerAccountId: new UniqueEntityID("account-1")}))
        }
        const response = await sut.execute({
            accountId: "account-1",
            page: 2
        })
        expect(response.value?.transactions).toHaveLength(2)
    })
})