import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";

export interface HistoryEntry {
  word: string;
  date: Date;
}

export interface ModalProps {
  history?: HistoryEntry[];
}

export const Modal: React.FC<ModalProps> = ({ history }) => {
  let [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded-md bg-black/20 px-4 py-2 text-sm font-medium dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition text-black dark:text-white focus:not-data-focus:outline-none data-focus:outline "
      >
        Open History
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto  ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full overflow-auto h-60 max-h-screen max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0  border border-black dark:border-gray-600"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-black dark:text-gray-200"
              >
                History
              </DialogTitle>
              {history && history.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {history.map((entry, index) => (
                    <li
                      key={index}
                      className="text-sm text-black dark:text-white"
                    >
                      {entry.word} - {entry.date.toLocaleDateString()} -{" "}
                      {entry.date.toLocaleTimeString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-gray-400">
                  No history available.
                </p>
              )}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
