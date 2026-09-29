"use client";

import { useState } from "react";

import type { Certificate } from "@/data/work";

import { CertificateSheet } from "./CertificateSheet";
import { CertificateViewer } from "./CertificateViewer";

// A single pinned certificate that opens in the full viewer.
export function CertificateShowcase({
  certificate,
  tilt = -1.2,
}: {
  certificate: Certificate;
  tilt?: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CertificateSheet certificate={certificate} tilt={tilt} onOpen={() => setOpen(true)} />
      <CertificateViewer
        certificates={[certificate]}
        index={open ? 0 : null}
        onClose={() => setOpen(false)}
        onChange={() => {}}
      />
    </>
  );
}
