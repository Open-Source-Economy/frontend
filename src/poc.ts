export type Poc = {
  version: "0.1.0";
  name: "poc";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "payer";
          isMut: true;
          isSigner: true;
          docs: ["anyone can init"];
        },
        {
          name: "project";
          isMut: true;
          isSigner: false;
          docs: ["Allow only one ABC per project. That is why the project_token_mint is not part of the seeds."];
        },
        {
          name: "projectTokenMint";
          isMut: true;
          isSigner: true;
        },
        {
          name: "projectTokenTreasury";
          isMut: true;
          isSigner: false;
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "owner";
          type: "string";
        },
        {
          name: "repository";
          type: "string";
        },
        {
          name: "projectBump";
          type: "u8";
        },
      ];
    },
    {
      name: "setUpAbc";
      docs: [
        "Set up the Augmented Bounding Curve.",
        "",
        "For now let's implement our ABC with the simplest function possible, a content function:",
        "mint(x)   = constant_mint",
        "redeem(x) = constant_redeem",
        "",
        "x being the lamports amount parameter.",
        "Ie, the mint cost of the x th project token lamport is constant and is constant_mint.",
        "",
        "# Arguments",
        "",
        "* `constant_mint` - Q32_32 in unit quote currency lamports per project token lamport",
        "* `constant_redeem` - Q32_32 in unit quote currency lamports per project token lamport",
        "",
        "Q32_32 is a fixed point number with 32 bits for the integer part and 32 bits for the decimal part.",
        "",
        "# Not in the poc:",
        "Who has the rights to set up the parameters ? One maintainer ? Anyone with default settings ?",
        "Can they modify them later ? Yes",
      ];
      accounts: [
        {
          name: "projectAdmin";
          isMut: true;
          isSigner: true;
        },
        {
          name: "project";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quoteTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quoteTreasury";
          isMut: true;
          isSigner: false;
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."];
        },
        {
          name: "quoteAbcReserve";
          isMut: true;
          isSigner: false;
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "constantMint";
          type: "u64";
        },
        {
          name: "constantRedeem";
          type: "u64";
        },
      ];
    },
    {
      name: "mintProjectToken";
      docs: [
        "# Requirements",
        "",
        "Can only be called if the ABC is set up",
        "",
        "# Arguments",
        "",
        "* `min_project_token_amount` - the minimum project token to receive",
        "* `quote_amount` - the amount of quote currency to send",
      ];
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "project";
          isMut: false;
          isSigner: false;
        },
        {
          name: "projectTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quoteTokenMint";
          isMut: true;
          isSigner: false;
          docs: ["TODO: probably not the best practice: project.abc.clone()"];
        },
        {
          name: "quoteTreasury";
          isMut: true;
          isSigner: false;
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."];
        },
        {
          name: "quoteAbcReserve";
          isMut: true;
          isSigner: false;
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."];
        },
        {
          name: "userProjectTokenAccount";
          isMut: true;
          isSigner: false;
          docs: ["No need to force it to be an associated token account."];
        },
        {
          name: "userQuoteTokenAccount";
          isMut: true;
          isSigner: false;
          docs: ["No need to force it to be an associated token account."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "associatedTokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "minProjectTokenAmount";
          type: "u64";
        },
        {
          name: "quoteAmount";
          type: "u64";
        },
      ];
    },
    {
      name: "donate";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "project";
          isMut: false;
          isSigner: false;
        },
        {
          name: "projectTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quoteTokenMint";
          isMut: true;
          isSigner: false;
          docs: ["TODO: probably not the best practice: project.abc.clone()"];
        },
        {
          name: "projectTokenTreasury";
          isMut: true;
          isSigner: false;
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."];
        },
        {
          name: "quoteTreasury";
          isMut: true;
          isSigner: false;
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."];
        },
        {
          name: "quoteAbcReserve";
          isMut: true;
          isSigner: false;
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."];
        },
        {
          name: "userQuoteTokenAccount";
          isMut: true;
          isSigner: false;
          docs: ["No need to force it to be an associated token account."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "quoteAmount";
          type: "u64";
        },
      ];
    },
    {
      name: "redeemProjectToken";
      accounts: [
        {
          name: "user";
          isMut: true;
          isSigner: true;
        },
        {
          name: "project";
          isMut: false;
          isSigner: false;
        },
        {
          name: "projectTokenMint";
          isMut: true;
          isSigner: false;
        },
        {
          name: "quoteTokenMint";
          isMut: true;
          isSigner: false;
          docs: ["TODO: probably not the best practice: project.abc.clone()"];
        },
        {
          name: "quoteAbcReserve";
          isMut: true;
          isSigner: false;
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."];
        },
        {
          name: "userProjectTokenAccount";
          isMut: true;
          isSigner: false;
          docs: ["No need to force it to be an associated token account."];
        },
        {
          name: "userQuoteTokenAccount";
          isMut: true;
          isSigner: false;
          docs: ["No need to force it to be an associated token account."];
        },
        {
          name: "systemProgram";
          isMut: false;
          isSigner: false;
        },
        {
          name: "tokenProgram";
          isMut: false;
          isSigner: false;
        },
      ];
      args: [
        {
          name: "projectTokenAmount";
          type: "u64";
        },
        {
          name: "minQuoteAmount";
          type: "u64";
        },
      ];
    },
    {
      name: "initializeIssue";
      accounts: [];
      args: [
        {
          name: "issueNumber";
          type: "u64";
        },
      ];
    },
  ];
  accounts: [
    {
      name: "project";
      type: {
        kind: "struct";
        fields: [
          {
            name: "owner";
            type: "string";
          },
          {
            name: "repository";
            type: "string";
          },
          {
            name: "projectTokenMint";
            type: "publicKey";
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "abc";
            type: {
              option: {
                defined: "ABC";
              };
            };
          },
          {
            name: "bump";
            docs: ["Bump of the config"];
            type: {
              array: ["u8", 1];
            };
          },
        ];
      };
    },
  ];
  types: [
    {
      name: "ABC";
      type: {
        kind: "struct";
        fields: [
          {
            name: "constantMint";
            docs: ["Q32_32", "Unit: [quote / pt] quote currency lamports per project token lamport"];
            type: "u64";
          },
          {
            name: "constantRedeem";
            docs: ["Q32_32", "Unit: [quote / pt] quote currency lamports per project token lamport"];
            type: "u64";
          },
          {
            name: "quoteTokenMint";
            docs: ["The mint of the token that is used to price the project token"];
            type: "publicKey";
          },
        ];
      };
    },
  ];
  errors: [
    {
      code: 6000;
      name: "OwnerTooLong";
      msg: "The provided owner should be 50 characters long maximum.";
    },
    {
      code: 6001;
      name: "RepositoryTooLong";
      msg: "The provided repository should be 50 characters long maximum.";
    },
    {
      code: 6002;
      name: "ABCNotSetUp";
      msg: "The ABC should be initialized set up.";
    },
    {
      code: 6003;
      name: "WrongABCParams";
      msg: "The bounding curve parameters are not valid.";
    },
    {
      code: 6004;
      name: "NumberDownCast";
      msg: "Unable to down cast number";
    },
    {
      code: 6005;
      name: "DivisionByZero";
      msg: "Division by zero";
    },
    {
      code: 6006;
      name: "MinimumMintAmountNotReached";
      msg: "The minimum amount is not reached.";
    },
  ];
};

export const IDL: Poc = {
  version: "0.1.0",
  name: "poc",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "payer",
          isMut: true,
          isSigner: true,
          docs: ["anyone can init"],
        },
        {
          name: "project",
          isMut: true,
          isSigner: false,
          docs: ["Allow only one ABC per project. That is why the project_token_mint is not part of the seeds."],
        },
        {
          name: "projectTokenMint",
          isMut: true,
          isSigner: true,
        },
        {
          name: "projectTokenTreasury",
          isMut: true,
          isSigner: false,
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "owner",
          type: "string",
        },
        {
          name: "repository",
          type: "string",
        },
        {
          name: "projectBump",
          type: "u8",
        },
      ],
    },
    {
      name: "setUpAbc",
      docs: [
        "Set up the Augmented Bounding Curve.",
        "",
        "For now let's implement our ABC with the simplest function possible, a content function:",
        "mint(x)   = constant_mint",
        "redeem(x) = constant_redeem",
        "",
        "x being the lamports amount parameter.",
        "Ie, the mint cost of the x th project token lamport is constant and is constant_mint.",
        "",
        "# Arguments",
        "",
        "* `constant_mint` - Q32_32 in unit quote currency lamports per project token lamport",
        "* `constant_redeem` - Q32_32 in unit quote currency lamports per project token lamport",
        "",
        "Q32_32 is a fixed point number with 32 bits for the integer part and 32 bits for the decimal part.",
        "",
        "# Not in the poc:",
        "Who has the rights to set up the parameters ? One maintainer ? Anyone with default settings ?",
        "Can they modify them later ? Yes",
      ],
      accounts: [
        {
          name: "projectAdmin",
          isMut: true,
          isSigner: true,
        },
        {
          name: "project",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quoteTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quoteTreasury",
          isMut: true,
          isSigner: false,
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."],
        },
        {
          name: "quoteAbcReserve",
          isMut: true,
          isSigner: false,
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "constantMint",
          type: "u64",
        },
        {
          name: "constantRedeem",
          type: "u64",
        },
      ],
    },
    {
      name: "mintProjectToken",
      docs: [
        "# Requirements",
        "",
        "Can only be called if the ABC is set up",
        "",
        "# Arguments",
        "",
        "* `min_project_token_amount` - the minimum project token to receive",
        "* `quote_amount` - the amount of quote currency to send",
      ],
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "project",
          isMut: false,
          isSigner: false,
        },
        {
          name: "projectTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quoteTokenMint",
          isMut: true,
          isSigner: false,
          docs: ["TODO: probably not the best practice: project.abc.clone()"],
        },
        {
          name: "quoteTreasury",
          isMut: true,
          isSigner: false,
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."],
        },
        {
          name: "quoteAbcReserve",
          isMut: true,
          isSigner: false,
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."],
        },
        {
          name: "userProjectTokenAccount",
          isMut: true,
          isSigner: false,
          docs: ["No need to force it to be an associated token account."],
        },
        {
          name: "userQuoteTokenAccount",
          isMut: true,
          isSigner: false,
          docs: ["No need to force it to be an associated token account."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "associatedTokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "minProjectTokenAmount",
          type: "u64",
        },
        {
          name: "quoteAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "donate",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "project",
          isMut: false,
          isSigner: false,
        },
        {
          name: "projectTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quoteTokenMint",
          isMut: true,
          isSigner: false,
          docs: ["TODO: probably not the best practice: project.abc.clone()"],
        },
        {
          name: "projectTokenTreasury",
          isMut: true,
          isSigner: false,
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."],
        },
        {
          name: "quoteTreasury",
          isMut: true,
          isSigner: false,
          docs: ["The treasury account of the project.", "The project community can vote on how to use the funds."],
        },
        {
          name: "quoteAbcReserve",
          isMut: true,
          isSigner: false,
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."],
        },
        {
          name: "userQuoteTokenAccount",
          isMut: true,
          isSigner: false,
          docs: ["No need to force it to be an associated token account."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "quoteAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "redeemProjectToken",
      accounts: [
        {
          name: "user",
          isMut: true,
          isSigner: true,
        },
        {
          name: "project",
          isMut: false,
          isSigner: false,
        },
        {
          name: "projectTokenMint",
          isMut: true,
          isSigner: false,
        },
        {
          name: "quoteTokenMint",
          isMut: true,
          isSigner: false,
          docs: ["TODO: probably not the best practice: project.abc.clone()"],
        },
        {
          name: "quoteAbcReserve",
          isMut: true,
          isSigner: false,
          docs: ["The ABC reserve.", "Can not be touched by the project community. Is used to allow project token redeem."],
        },
        {
          name: "userProjectTokenAccount",
          isMut: true,
          isSigner: false,
          docs: ["No need to force it to be an associated token account."],
        },
        {
          name: "userQuoteTokenAccount",
          isMut: true,
          isSigner: false,
          docs: ["No need to force it to be an associated token account."],
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false,
        },
        {
          name: "tokenProgram",
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: "projectTokenAmount",
          type: "u64",
        },
        {
          name: "minQuoteAmount",
          type: "u64",
        },
      ],
    },
    {
      name: "initializeIssue",
      accounts: [],
      args: [
        {
          name: "issueNumber",
          type: "u64",
        },
      ],
    },
  ],
  accounts: [
    {
      name: "project",
      type: {
        kind: "struct",
        fields: [
          {
            name: "owner",
            type: "string",
          },
          {
            name: "repository",
            type: "string",
          },
          {
            name: "projectTokenMint",
            type: "publicKey",
          },
          {
            name: "createdAt",
            type: "i64",
          },
          {
            name: "abc",
            type: {
              option: {
                defined: "ABC",
              },
            },
          },
          {
            name: "bump",
            docs: ["Bump of the config"],
            type: {
              array: ["u8", 1],
            },
          },
        ],
      },
    },
  ],
  types: [
    {
      name: "ABC",
      type: {
        kind: "struct",
        fields: [
          {
            name: "constantMint",
            docs: ["Q32_32", "Unit: [quote / pt] quote currency lamports per project token lamport"],
            type: "u64",
          },
          {
            name: "constantRedeem",
            docs: ["Q32_32", "Unit: [quote / pt] quote currency lamports per project token lamport"],
            type: "u64",
          },
          {
            name: "quoteTokenMint",
            docs: ["The mint of the token that is used to price the project token"],
            type: "publicKey",
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 6000,
      name: "OwnerTooLong",
      msg: "The provided owner should be 50 characters long maximum.",
    },
    {
      code: 6001,
      name: "RepositoryTooLong",
      msg: "The provided repository should be 50 characters long maximum.",
    },
    {
      code: 6002,
      name: "ABCNotSetUp",
      msg: "The ABC should be initialized set up.",
    },
    {
      code: 6003,
      name: "WrongABCParams",
      msg: "The bounding curve parameters are not valid.",
    },
    {
      code: 6004,
      name: "NumberDownCast",
      msg: "Unable to down cast number",
    },
    {
      code: 6005,
      name: "DivisionByZero",
      msg: "Division by zero",
    },
    {
      code: 6006,
      name: "MinimumMintAmountNotReached",
      msg: "The minimum amount is not reached.",
    },
  ],
};
