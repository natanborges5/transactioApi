import { InMemoryAccountsRepository } from "test/repositories/in-memory-accounts-repository";
import { CreateAccountUseCase } from "./create-account";
import {faker} from "@faker-js/faker"
let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: CreateAccountUseCase

describe("Create Account", () => {
    beforeEach(() => {
        inMemoryAccountsRepository = new InMemoryAccountsRepository();
        sut = new CreateAccountUseCase(inMemoryAccountsRepository)
    })

    it("Should be able to create a account", async () => {
        const result = await sut.execute({
            name: faker.finance.accountName(),
            cpf: faker.finance.accountNumber(11),
            avaliableLimit: Number(faker.finance.amount(1000, 10000)),
            transactions: [],
            activeCard: true
        })
        expect(result.isRight()).toBe(true)
        expect(inMemoryAccountsRepository.items[0]).toEqual(result.value?.account)
    })
})