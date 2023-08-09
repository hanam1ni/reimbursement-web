import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";

const BaseDialog = Dialog.Root;

const BaseDialogTrigger = Dialog.Trigger;

function BaseDialogContent({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[450px] max-h-[85vh] p-7 rounded-md bg-white">
        {children}
        <Dialog.Close className="absolute top-4 right-6 text-gray-700" asChild>
          <button aria-label="Close">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function BaseDialogClose({ children }: Dialog.DialogCloseProps) {
  return <Dialog.Close asChild>{children}</Dialog.Close>;
}

export { BaseDialog, BaseDialogClose, BaseDialogContent, BaseDialogTrigger };
