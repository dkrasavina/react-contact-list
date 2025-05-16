import { createPortal } from "react-dom";
import { useRef, useEffect, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ModalProps = {
  open: boolean;
  children: ReactNode;
  setModal: (open: boolean) => void;
};

export default function Modal({ children, open, setModal }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  // return createPortal(
  //   <dialog ref={dialog} className="mt-12 w-220 h-165 mx-auto my-4 p-4 border-yellow-600 border-2 rounded-md z-100 ">
  //     {children}
  //   </dialog>,
  //   document.querySelector('#root')!
  // );
  return (
    <Dialog open={open} onOpenChange={() => setModal(false)}>
      <DialogContent className="mt-12 sm:max-w-220 max-w-220 w-220  sm:max-h-165 max-h-165 h-165 mx-auto my-4 p-4 border-yellow-600 border-2 rounded-md z-100 ">
        {children}
        <DialogHeader>
          <DialogTitle />
        </DialogHeader>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
