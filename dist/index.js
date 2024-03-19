// src/endpoints/lockNFT.ts
import { Data as Data2 } from "@anastasia-labs/lucid-cardano-fork";

// src/utils.ts
import { getAddressDetails } from "@anastasia-labs/lucid-cardano-fork";
function fromAddress(address) {
  const { paymentCredential, stakeCredential } = getAddressDetails(address);
  if (!paymentCredential)
    throw new Error("Not a valid payment address.");
  return {
    paymentCredential: paymentCredential?.type === "Key" ? {
      PublicKeyCredential: [paymentCredential.hash]
    } : { ScriptCredential: [paymentCredential.hash] },
    stakeCredential: stakeCredential ? {
      Inline: [
        stakeCredential.type === "Key" ? {
          PublicKeyCredential: [stakeCredential.hash]
        } : { ScriptCredential: [stakeCredential.hash] }
      ]
    } : null
  };
}

// src/contract-schema.ts
import {
  Data
} from "@anastasia-labs/lucid-cardano-fork";
var CredentialSchema = Data.Enum([
  Data.Object({
    PublicKeyCredential: Data.Tuple([
      Data.Bytes({ minLength: 28, maxLength: 28 })
    ])
  }),
  Data.Object({
    ScriptCredential: Data.Tuple([
      Data.Bytes({ minLength: 28, maxLength: 28 })
    ])
  })
]);
var CredentialD = CredentialSchema;
var AddressSchema = Data.Object({
  paymentCredential: CredentialSchema,
  stakeCredential: Data.Nullable(
    Data.Enum([
      Data.Object({ Inline: Data.Tuple([CredentialSchema]) }),
      Data.Object({
        Pointer: Data.Tuple([
          Data.Object({
            slotNumber: Data.Integer(),
            transactionIndex: Data.Integer(),
            certificateIndex: Data.Integer()
          })
        ])
      })
    ])
  )
});
var AddressD = AddressSchema;
var SimpleSaleSchema = Data.Object({
  sellerAddress: AddressSchema,
  priceOfAsset: Data.Integer()
});
var SimpleSale = SimpleSaleSchema;
var MarketRedeemerSchema = Data.Enum([
  Data.Literal("PBuy"),
  Data.Literal("PWithdraw")
]);
var MarketRedeemer = MarketRedeemerSchema;

// src/endpoints/lockNFT.ts
var lockNFT = async (lockNFTConfig) => {
  const marketplace = {
    type: "PlutusV2",
    script: lockNFTConfig.marketPlace
  };
  const marketplaceaddr = lockNFTConfig.lucid.utils.validatorToAddress(marketplace);
  const datum = Data2.to(
    {
      sellerAddress: fromAddress(await lockNFTConfig.lucid.wallet.address()),
      priceOfAsset: lockNFTConfig.priceOfAsset
    },
    SimpleSale
  );
  try {
    const lockNFT2 = lockNFTConfig.lucid.newTx().payToContract(marketplaceaddr, datum, {
      [lockNFTConfig.policyID + lockNFTConfig.Token]: 1n
    }).complete();
    return lockNFT2;
  } catch (error) {
    if (error instanceof Error)
      return error;
    return new Error(`${JSON.stringify(error)}`);
  }
};
export {
  AddressD,
  AddressSchema,
  CredentialD,
  CredentialSchema,
  MarketRedeemer,
  SimpleSale,
  lockNFT
};
