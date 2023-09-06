import { InMemoryAccountsRepository } from "test/repositories/in-memory-accounts-repository";
import { DeleteAccountUseCase } from "./delete-account";
import { makeAccount } from "test/factories/make-account";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";

let inMemoryAccountsRepository: InMemoryAccountsRepository
let sut: DeleteAccountUseCase

describe("Delete Account", () => {
    beforeEach(() => {
        inMemoryAccountsRepository = new InMemoryAccountsRepository();
        sut = new DeleteAccountUseCase(inMemoryAccountsRepository)
    })

    it("Should be able to delete a account", async () => {
        const newAccount = makeAccount({}, new UniqueEntityID("account-1"))
        await inMemoryAccountsRepository.create(newAccount)
        await sut.execute({
            accountId: "account-1",
        })
        expect(inMemoryAccountsRepository.items).toHaveLength(0)
    })
})