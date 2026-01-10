import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { BrushCleaning, LineSquiggle, Save } from "lucide-react";
import SignaturePad from '../ui/signature-pad';

const SignatureModal = ({ children }: { children: React.ReactNode }) => {

    // const handleOnSave = (base64: string) => {
    //     const link = document.createElement("a");
    //     link.href = base64;
    //     link.download = "signature.png";
    //     link.click()
    // }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-black border-neutral-800 w-80">
                <DialogHeader>
                    <div className='flex gap-2'>
                        <div className='h-12 w-12 rounded-lg bg-[#27272A] flex items-center justify-center'>
                            <LineSquiggle className='text-white h-5 w-5' />
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <DialogTitle className='text-[1rem] text-neutral-200'> Company Signature</DialogTitle>
                            <DialogDescription>Draw your signature here</DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <div className='w-full'>
                    <SignaturePad
                        size="lg"
                        variant="outline"
                        penColor="hsl(var(--foreground))"
                        lineWidth={4}
                        showButtons={true}
                        saveButtonIcon={<Save />}
                    />
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}

export default SignatureModal