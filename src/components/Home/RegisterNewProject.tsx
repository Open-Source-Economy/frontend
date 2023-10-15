import React, { useContext, useState } from "react";
import { ClientContext } from "../../App";
import { getRepository } from "../../functions";
import frame from "../../assets/images/Frame.png";
import { web3 } from "@project-serum/anchor";
import * as ose from "@open-source-economy/poc";

interface RegisterNewProjectProps {
  onRegisteringNewProject: () => void;
}

const RegisterNewProject: React.FC<RegisterNewProjectProps> = props => {
  const client = useContext(ClientContext);
  const walletAddress = client?.context.provider.wallet.publicKey.toString();

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [newOwner, setNewOwner] = useState("");
  const [newRepository, setNewRepository] = useState("");

  async function initialize() {
    if (client) {
      /* create the program interface combining the idl, program ID, and provider */
      try {
        setLoading(true);
        // verify that the repository exists
        await getRepository(newOwner, newRepository);

        const projectTokenKeyPair = web3.Keypair.generate();
        const params: ose.InitializeParams = await client.paramsBuilder.initialize(newOwner, newRepository, projectTokenKeyPair);
        await client.initialize(params);

        props.onRegisteringNewProject();
      } catch (e) {
        if (e instanceof Error) {
          // specific for WalletError ?
          setError(e.message);
        } else {
          console.log("Error: ", e);
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {
        <div className="px-lg-1 py-3">
          <h5 className="text-white text-center">Register Your Project</h5>
          <label htmlFor="" className="helvetica mt-4  pt-3 text-white small d-block">
            Owner
          </label>
          <input type="text" className="form-control controla text-white" required value={newOwner} onChange={e => setNewOwner(e.target.value)} />
          <label htmlFor="" className="helvetica mt-3 text-white small d-block">
            Repository
          </label>
          <input type="text" className="form-control controla text-white" required value={newRepository} onChange={e => setNewRepository(e.target.value)} />
          {error ? (
            <div className="bg__pink py-2 rounded mt-4 d-flex gap-2 align-items-center px-2">
              <img src={frame} className=" img-fluid" alt="" />
              <div className="text__red helvetica fw-600 small">The project does not exist</div>
            </div>
          ) : (
            <div className="d-block mt-0 pt-0"></div>
          )}
          <div className="d-block mt-4 pt-3">
            {(walletAddress && (
              <button onClick={initialize} className="connect__btn w-100">
                Register
              </button>
            )) || (
              <button disabled className="connect__btn w-100 bg-secondary border-0">
                Connect wallet
              </button>
            )}
          </div>
        </div>
      }
    </>
  );
};

export default RegisterNewProject;
