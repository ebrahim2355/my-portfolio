"use client";

import { Toaster } from "react-hot-toast";

// react-hot-toast predates React Server Components and ships no "use client"
// directive, so it needs this wrapper to be usable from the root layout.
export default function ToasterProvider() {
    return <Toaster position="bottom-right" />;
}
