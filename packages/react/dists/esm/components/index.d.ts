import React from "react";
import { DialogContentProps, DialogOverlayProps, DialogProps, DialogTrigger } from "@radix-ui/react-dialog";
declare function SearchContent(props: {
    cometConfig: Record<string, string>;
    APIKey: string;
    cometId: string;
} & DialogContentProps): React.JSX.Element;
declare function SearchDialogOverlay(props: DialogOverlayProps): React.JSX.Element;
declare function SearchDialog(props: DialogProps): React.JSX.Element;
export { SearchDialog, DialogTrigger as SearchDialogTrigger, SearchDialogOverlay, SearchContent, };
