// sum.test.js
import { expect, test } from "vitest";
import { sum } from "../src/sum.js";
import {
  Assets,
  Data,
  Emulator,
  Lucid,
  fromText,
  generateSeedPhrase,
} from "@anastasia-labs/lucid-cardano-fork";
import { SimpleSale, fromAddress } from "../src/contract-schema.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

console.log("testing");

export const generateAccountSeedPhrase = async (assets: Assets) => {
  const seedPhrase = generateSeedPhrase();
  return {
    seedPhrase,
    address: await (await Lucid.new(undefined, "Custom"))
      .selectWalletFromSeed(seedPhrase)
      .wallet.address(),
    assets,
  };
};

console.log(await generateAccountSeedPhrase({ lovelace: 10_000_000n }));

test("emulator test", async () => {
  const policyid = "88dc7cd1c28d3a0c7ef4df99036c7c9688d309d91a1bb6fe4b08fee9";
  const myToken = fromText("myToken");
  const unit = policyid + myToken;
  const user1 = await generateAccountSeedPhrase({
    lovelace: 10_000_000n,
  });
  const user2 = await generateAccountSeedPhrase({
    lovelace: 30_000_000n,
    [unit]: 70n,
  });
  const emulator = new Emulator([user1, user2]);
  const lucid = await Lucid.new(emulator);

  lucid.selectWalletFromSeed(user1.seedPhrase);
  console.log(await lucid.wallet.getUtxos());

  lucid.selectWalletFromSeed(user2.seedPhrase);
  console.log(await lucid.wallet.getUtxos());

  const tx = await lucid
    .newTx()
    .payToAddress(user1.address, { lovelace: 5_000_000n, [unit]: 5n })
    .complete();
  const signedTx = await tx.sign().complete();
  const txHash = await signedTx.submit();
  console.log(txHash);

  emulator.awaitBlock(10);

  lucid.selectWalletFromSeed(user1.seedPhrase);
  console.log("user1 utxos : ", await lucid.wallet.getUtxos());

  const datum = Data.to(
    { sellerAddress: fromAddress(user2.address), priceOfAsset: 5_000_000n },
    SimpleSale
  );
  console.log("datum cbor", datum);
  console.log("user address as schema", JSON.stringify(fromAddress(user2.address)));
});
