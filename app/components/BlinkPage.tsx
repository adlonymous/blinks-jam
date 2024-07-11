"use client";
import "@dialectlabs/blinks/index.css";
import { useState, useEffect, useMemo } from "react";
import { Action, Blink, ActionsRegistry, type ActionAdapter } from "@dialectlabs/blinks";
import { useAction, useActionsRegistryInterval, useActionAdapter } from "@dialectlabs/blinks/react";

// needs to be wrapped with <WalletProvider /> and <WalletModalProvider />
export const BlinkPage = () => {
  const { adapter } = useActionAdapter(`https://api.mainnet-beta.solana.com`);

  return <ManyActions adapter={adapter} />;
};

const ManyActions = ({ adapter }: { adapter: ActionAdapter }) => {
  const apiUrls = useMemo(
    () => [
      "https://localhost:3002/api/actions/transfer-sol",
      "https://localhost:3002/api/actions/transfer-spl",
    ],
    []
  ); //include your different actions

  console.log(apiUrls);

  const [actions, setActions] = useState<(Action | null)[]>([]);

  useEffect(() => {
    const fetchActions = async () => {
      const promises = apiUrls.map((url) => Action.fetch(url).catch(() => null));
      const actions = await Promise.all(promises);

      setActions(actions.filter(Boolean) as Action[]);
    };

    fetchActions();
  }, [apiUrls]);

  // we need to update the adapter every time, since it's dependent on wallet and walletModal states
  useEffect(() => {
    actions.forEach((action) => action?.setAdapter(adapter));
  }, [actions, adapter]);

  if (actions.length > 0) {
    actions.map((action) => {
      <div key={action?.url} className="flex gap-2 z-[100]">
        <Blink
          action={action as Action}
          websiteText={new URL(action?.url.toString() as string).hostname}
        />
      </div>;
    });
    for (let i = 0; i <= actions.length; i++) {
      console.log(new URL(actions[i]?.url.toString() as string));
    }
  } else {
    return null;
  }
};
