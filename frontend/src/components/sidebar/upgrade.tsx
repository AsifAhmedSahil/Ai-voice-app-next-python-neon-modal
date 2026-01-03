/* eslint-disable @typescript-eslint/no-unsafe-call */
"use client";

import { Crown, Sparkles } from "lucide-react";
import { authClient } from "~/lib/auth-client";
import { Button } from "../ui/button";

const Upgrade = () => {
  const upgrade = async () => {
    await authClient.checkout({
      products: [
        "0509872e-f1ef-4cb0-8492-edc8b8de859e",
        "fd476fe1-a442-41ac-aac0-f32f7cc3b50f",
        "32ebabba-115c-4a62-8be2-42a9d510b359",
      ],
    });
  };
  return (
     <Button
      variant="outline"
      size="sm"
      className="group relative ml-2 overflow-hidden border-orange-400/50 bg-gradient-to-r from-orange-400/10 to-pink-500/10 text-orange-400 transition-all duration-300 hover:border-orange-500/70 hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
      onClick={upgrade}
    >
      <div className="flex items-center gap-2">
        <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">Upgrade</span>
        <Sparkles className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-md bg-gradient-to-r from-orange-400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  )
};

export default Upgrade;
