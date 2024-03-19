"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  AddressD: () => AddressD,
  AddressSchema: () => AddressSchema,
  CredentialD: () => CredentialD,
  CredentialSchema: () => CredentialSchema,
  MarketRedeemer: () => MarketRedeemer,
  SimpleSale: () => SimpleSale,
  lockNFT: () => lockNFT
});
module.exports = __toCommonJS(src_exports);

// src/endpoints/lockNFT.ts
var import_lucid_cardano_fork3 = require("@anastasia-labs/lucid-cardano-fork");

// src/utils.ts
var import_lucid_cardano_fork = require("@anastasia-labs/lucid-cardano-fork");
function fromAddress(address) {
  const { paymentCredential, stakeCredential } = (0, import_lucid_cardano_fork.getAddressDetails)(address);
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
var import_lucid_cardano_fork2 = require("@anastasia-labs/lucid-cardano-fork");
var CredentialSchema = import_lucid_cardano_fork2.Data.Enum([
  import_lucid_cardano_fork2.Data.Object({
    PublicKeyCredential: import_lucid_cardano_fork2.Data.Tuple([
      import_lucid_cardano_fork2.Data.Bytes({ minLength: 28, maxLength: 28 })
    ])
  }),
  import_lucid_cardano_fork2.Data.Object({
    ScriptCredential: import_lucid_cardano_fork2.Data.Tuple([
      import_lucid_cardano_fork2.Data.Bytes({ minLength: 28, maxLength: 28 })
    ])
  })
]);
var CredentialD = CredentialSchema;
var AddressSchema = import_lucid_cardano_fork2.Data.Object({
  paymentCredential: CredentialSchema,
  stakeCredential: import_lucid_cardano_fork2.Data.Nullable(
    import_lucid_cardano_fork2.Data.Enum([
      import_lucid_cardano_fork2.Data.Object({ Inline: import_lucid_cardano_fork2.Data.Tuple([CredentialSchema]) }),
      import_lucid_cardano_fork2.Data.Object({
        Pointer: import_lucid_cardano_fork2.Data.Tuple([
          import_lucid_cardano_fork2.Data.Object({
            slotNumber: import_lucid_cardano_fork2.Data.Integer(),
            transactionIndex: import_lucid_cardano_fork2.Data.Integer(),
            certificateIndex: import_lucid_cardano_fork2.Data.Integer()
          })
        ])
      })
    ])
  )
});
var AddressD = AddressSchema;
var SimpleSaleSchema = import_lucid_cardano_fork2.Data.Object({
  sellerAddress: AddressSchema,
  priceOfAsset: import_lucid_cardano_fork2.Data.Integer()
});
var SimpleSale = SimpleSaleSchema;
var MarketRedeemerSchema = import_lucid_cardano_fork2.Data.Enum([
  import_lucid_cardano_fork2.Data.Literal("PBuy"),
  import_lucid_cardano_fork2.Data.Literal("PWithdraw")
]);
var MarketRedeemer = MarketRedeemerSchema;

// src/endpoints/lockNFT.ts
var lockNFT = async (lockNFTConfig) => {
  const marketplace = {
    type: "PlutusV2",
    script: lockNFTConfig.marketPlace
  };
  const marketplaceaddr = lockNFTConfig.lucid.utils.validatorToAddress(marketplace);
  const datum = import_lucid_cardano_fork3.Data.to(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressD,
  AddressSchema,
  CredentialD,
  CredentialSchema,
  MarketRedeemer,
  SimpleSale,
  lockNFT
});
