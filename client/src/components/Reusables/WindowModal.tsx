// modal that passes back two function props that are the actions to be taken when an option is selected
// refer to the actionmodal in cinematch, its basically the same

import { motion } from "framer-motion";
import "../../MishaTemp.css"

export default function Windowmodal({ children, cancel }: { children: React.ReactNode; cancel: () => void; confirm: () => void}) {
  const stopClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div className="window-modal-wrapper" onClick={cancel}>
      <motion.div 
        className="window-modal"
        onClick={stopClick} 
        initial= {{
          scale: 0
        }}
        animate= {{
          scale: 1
        }}
        transition={{
          duration: .5,
          type: "spring"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
