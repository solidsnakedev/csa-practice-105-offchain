import { Data, Lucid, Script } from "@anastasia-labs/lucid-cardano-fork";
import { fromAddress } from "../utils.js";
import { SimpleSale } from "../contract-schema.js";

export type LockNFTConfig = {
  sellerAddress: string;
  priceOfAsset: bigint;
  policyID: string;
  Token: string;
  marketPlace: string;
  lucid: Lucid; // user
};
export const lockNFT = async (lockNFTConfig: LockNFTConfig) => {
  const marketplace: Script = {
    type: "PlutusV2",
    script: lockNFTConfig.marketPlace,
  };
  const marketplaceaddr =
    lockNFTConfig.lucid.utils.validatorToAddress(marketplace);
  // console.log("Marketplace Address:",marketplaceaddr);
  const datum = Data.to(
    {
      sellerAddress: fromAddress(await lockNFTConfig.lucid.wallet.address()),
      priceOfAsset: lockNFTConfig.priceOfAsset,
    },
    SimpleSale
  );
  // console.log("Simplesale datum:", datum);
  // Alice locks 1_000_000 lovelace at the script address
  try {
    const lockNFT = lockNFTConfig.lucid
      .newTx()
      .payToContract(marketplaceaddr, datum, {
        [lockNFTConfig.policyID + lockNFTConfig.Token]: 1n,
      })
      .complete();
    return lockNFT;
  } catch (error) {
    // Handle the error, if returning the error in a function
    if (error instanceof Error) return error;
    return new Error(`${JSON.stringify(error)}`);
  }
};
