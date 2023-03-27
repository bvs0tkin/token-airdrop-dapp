const BNBT_TOKEN_ADDRESS = "0xb112300e6dbbccef7817b32843bfc5e6823a8e79";
const BNBT_AIRDROP_ADDRESS = "0xd265500e4ffc64ee0935dd172b22d24b96ec0205";

const provider = new ethers.providers.Web3Provider(window.ethereum, 97);

let signer;
let tokenContract;
let airdropContract;
const tokenAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "allowances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "myBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const airdropAbi = [
  {
    inputs: [
      {
        internalType: "contract IFakeToken",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_addressArray",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amountArray",
        type: "uint256[]",
      },
    ],
    name: "airdropWithTransfer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IFakeToken",
        name: "_token",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_addressArray",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amountArray",
        type: "uint256[]",
      },
    ],
    name: "airdropWithTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

provider.send("eth_requestAccounts", []).then(() => {
  provider.listAccounts().then((accounts) => {
    signer = provider.getSigner(accounts[0]);
    //Создаем объект контракта
    tokenContract = new ethers.Contract(BNBT_TOKEN_ADDRESS, tokenAbi, signer);
    airdropContract = new ethers.Contract(
      BNBT_AIRDROP_ADDRESS,
      airdropAbi,
      signer
    );
    //   console.log(tokenContract);
    //   console.log(airdropContract);
  });
});

const allowanceButton = document.getElementById("allowanceButton");
allowanceButton.addEventListener("click", handleAllowanceClick);

const balanceButton = document.getElementById("balanceButton");
balanceButton.addEventListener("click", handleBalanceClick);

const airdropButton = document.getElementById("airdropButton");
airdropButton.addEventListener("click", handleAirdropClick);

const reqTokensButton = document.getElementById("requestTokensButton");
reqTokensButton.addEventListener("click", handleRequestTokensClick);

async function handleAllowanceClick(event) {
  event.preventDefault();
  const amount = document.getElementById("airdropAmount").value;
  console.log(amount);
  await tokenContract.approve(BNBT_AIRDROP_ADDRESS, amount);
}

async function handleBalanceClick(event) {
  event.preventDefault();
  const targetAddress = document.getElementById("addressBalance").value;
  console.log(targetAddress);
  const balance = await tokenContract.balances(targetAddress);
  alert(`Баланс ${targetAddress} равен ${balance}`);
  console.log(`Баланс ${targetAddress} равен ${balance}`);
}
async function handleAirdropClick(event) {
  event.preventDefault();
  const addressList = document.getElementById("addressList").value.split(",");
  console.log(addressList);
  const sendAmount = document.getElementById("sendAmount").value;
  const amountArray = Array(addressList.length).fill(sendAmount);
  console.log(amountArray);
  await airdropContract.airdropWithTransferFrom(
    BNBT_TOKEN_ADDRESS,
    addressList,
    amountArray
  );
}
async function handleRequestTokensClick(event) {
  event.preventDefault();
  console.log(signer);
  const addressList = [signer._address];
  console.log(addressList);
  await airdropContract.airdropWithTransferFrom(
    BNBT_TOKEN_ADDRESS,
    addressList,
    [100]
  );
}
