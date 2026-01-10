import React from "react";
import { LineSquiggle } from "lucide-react";

const SignaturePad = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
    return (
        <div
            ref={ref}
            {...props}
            className={`h-32 w-64 rounded-lg border border-dashed flex flex-col gap-1.5 items-center justify-center hover:bg-[#18181B] transition-colors cursor-pointer ${props.className ?? ""}`}
        >
            <div className="h-10 w-10 bg-[#27272A] rounded-full flex items-center justify-center">
                <LineSquiggle className="text-white" />
            </div>
            <span className="text-neutral-200 text-sm">
                Click here to draw your signature
            </span>
        </div>
    );
});

SignaturePad.displayName = "SignaturePad";

export default SignaturePad;
