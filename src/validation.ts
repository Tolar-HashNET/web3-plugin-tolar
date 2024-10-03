import { type HexString, validator } from "web3";

export function isTolAddressValid(address: Uint8Array | HexString): string {
  if (typeof address === "string") {
    if (!validator.isHexString(address, 25)) {
      return "Invalid Tolar address; must be hex string";
    }

    if (!address.startsWith("0x54")) {
      return "Invalid address; must start with string 0x54";
    }
  } else {
    if (address.length !== 25) {
      return "Invalid address; length must be 25 bytes long";
    }

    if (address.at(0) !== 84) {
      return "Invalid Tolar address; must start with byte 0x54";
    }
  }

  return "";
}

export function isPublicKeyValid(publicKey: Uint8Array | HexString): string {
  if (typeof publicKey === "string") {
    if (!validator.isHexString(publicKey, 64)) {
      return "Invalid public key; must be hex string with 128 hex digits";
    }
  } else {
    if (publicKey.length !== 64) {
      return "Invalid public key; must have 64 bytes";
    }
  }

  return "";
}

export function isTolHashValid(hash: Uint8Array | HexString): string {
  if (typeof hash === "string") {
    if (!validator.isHexString(hash, 32)) {
      return "Invalid hash; must be hex string with 64 digits";
    }
  } else {
    if (hash.length !== 32) {
      return "Invalid hash; length must be 32 bytes long";
    }
  }

  return "";
}

export function isTolSignatureValid(signature: Uint8Array | HexString): string {
  if (typeof signature === "string") {
    if (!validator.isHexString(signature, 65)) {
      return "Invalid signature; must be hex string with 130 digits";
    }
  } else {
    if (signature.length !== 65) {
      return "Invalid signature; length must be 65 bytes long";
    }
  }

  return "";
}
