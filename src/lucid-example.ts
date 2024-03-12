import { Blockfrost, Lucid } from "@anastasia-labs/lucid-cardano-fork";

// const lucid = await Lucid.new();
// async function -> api, server, external service
// sync function
// continue
// ....

const lucid = await Lucid.new(
  new Blockfrost("https://cardano-preprod.blockfrost.io/api/v0", "preprodOr3zZOkFc8Sqa5sp3aa9oGTb1wxulzhy"),
  "Preprod",
);

const seed = lucid.utils.generateSeedPhrase()

lucid.selectWalletFromSeed("jewel solid busy tomorrow woman magnet diagram husband shaft kingdom ritual humble mouse level equip seven swim web bid street inflict please exact desk")

const addr = await lucid.wallet.address()
console.log(addr)

const utxo = await lucid.utxosAt(addr)
console.log(utxo)
