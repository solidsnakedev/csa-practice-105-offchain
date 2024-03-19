import * as _anastasia_labs_lucid_cardano_fork from '@anastasia-labs/lucid-cardano-fork';
import { Lucid, Data } from '@anastasia-labs/lucid-cardano-fork';

type LockNFTConfig = {
    sellerAddress: string;
    priceOfAsset: bigint;
    policyID: string;
    Token: string;
    marketPlace: string;
    lucid: Lucid;
};
declare const lockNFT: (lockNFTConfig: LockNFTConfig) => Promise<Error | _anastasia_labs_lucid_cardano_fork.TxComplete>;

declare const CredentialSchema: _anastasia_labs_lucid_cardano_fork.TUnion<(_anastasia_labs_lucid_cardano_fork.TObject<{
    PublicKeyCredential: _anastasia_labs_lucid_cardano_fork.TTuple<[_anastasia_labs_lucid_cardano_fork.TUnsafe<string>]>;
}> | _anastasia_labs_lucid_cardano_fork.TObject<{
    ScriptCredential: _anastasia_labs_lucid_cardano_fork.TTuple<[_anastasia_labs_lucid_cardano_fork.TUnsafe<string>]>;
}>)[]>;
type CredentialD = Data.Static<typeof CredentialSchema>;
declare const CredentialD: {
    PublicKeyCredential: [string];
} | {
    ScriptCredential: [string];
};
declare const AddressSchema: _anastasia_labs_lucid_cardano_fork.TObject<{
    paymentCredential: _anastasia_labs_lucid_cardano_fork.TUnion<(_anastasia_labs_lucid_cardano_fork.TObject<{
        PublicKeyCredential: _anastasia_labs_lucid_cardano_fork.TTuple<[_anastasia_labs_lucid_cardano_fork.TUnsafe<string>]>;
    }> | _anastasia_labs_lucid_cardano_fork.TObject<{
        ScriptCredential: _anastasia_labs_lucid_cardano_fork.TTuple<[_anastasia_labs_lucid_cardano_fork.TUnsafe<string>]>;
    }>)[]>;
    stakeCredential: _anastasia_labs_lucid_cardano_fork.TUnsafe<{
        Inline: [{
            PublicKeyCredential: [string];
        } | {
            ScriptCredential: [string];
        }];
    } | {
        Pointer: [{
            slotNumber: bigint;
            transactionIndex: bigint;
            certificateIndex: bigint;
        }];
    } | null>;
}>;
type AddressD = Data.Static<typeof AddressSchema>;
declare const AddressD: {
    paymentCredential: {
        PublicKeyCredential: [string];
    } | {
        ScriptCredential: [string];
    };
    stakeCredential: {
        Inline: [{
            PublicKeyCredential: [string];
        } | {
            ScriptCredential: [string];
        }];
    } | {
        Pointer: [{
            slotNumber: bigint;
            transactionIndex: bigint;
            certificateIndex: bigint;
        }];
    } | null;
};
declare const SimpleSaleSchema: _anastasia_labs_lucid_cardano_fork.TObject<{
    sellerAddress: _anastasia_labs_lucid_cardano_fork.TObject<{
        paymentCredential: _anastasia_labs_lucid_cardano_fork.TUnion<(_anastasia_labs_lucid_cardano_fork.TObject<{
            PublicKeyCredential: _anastasia_labs_lucid_cardano_fork.TTuple<[_anastasia_labs_lucid_cardano_fork.TUnsafe<string>]>;
        }> | _anastasia_labs_lucid_cardano_fork.TObject<{
            ScriptCredential: _anastasia_labs_lucid_cardano_fork.TTuple<[_anastasia_labs_lucid_cardano_fork.TUnsafe<string>]>;
        }>)[]>;
        stakeCredential: _anastasia_labs_lucid_cardano_fork.TUnsafe<{
            Inline: [{
                PublicKeyCredential: [string];
            } | {
                ScriptCredential: [string];
            }];
        } | {
            Pointer: [{
                slotNumber: bigint;
                transactionIndex: bigint;
                certificateIndex: bigint;
            }];
        } | null>;
    }>;
    priceOfAsset: _anastasia_labs_lucid_cardano_fork.TUnsafe<bigint>;
}>;
type SimpleSale = Data.Static<typeof SimpleSaleSchema>;
declare const SimpleSale: {
    sellerAddress: {
        paymentCredential: {
            PublicKeyCredential: [string];
        } | {
            ScriptCredential: [string];
        };
        stakeCredential: {
            Inline: [{
                PublicKeyCredential: [string];
            } | {
                ScriptCredential: [string];
            }];
        } | {
            Pointer: [{
                slotNumber: bigint;
                transactionIndex: bigint;
                certificateIndex: bigint;
            }];
        } | null;
    };
    priceOfAsset: bigint;
};
declare const MarketRedeemerSchema: _anastasia_labs_lucid_cardano_fork.TUnion<(_anastasia_labs_lucid_cardano_fork.TLiteral<"PBuy"> | _anastasia_labs_lucid_cardano_fork.TLiteral<"PWithdraw">)[]>;
type MarketRedeemer = Data.Static<typeof MarketRedeemerSchema>;
declare const MarketRedeemer: "PBuy" | "PWithdraw";

export { AddressD, AddressSchema, CredentialD, CredentialSchema, type LockNFTConfig, MarketRedeemer, SimpleSale, lockNFT };
