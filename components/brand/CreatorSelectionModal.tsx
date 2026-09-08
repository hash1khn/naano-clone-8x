"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { CreatorListItem } from "@/lib/api/types";
import { fill, type MarketplaceCopy } from "@/lib/i18n/brand";
import { formatEuro } from "@/lib/marketplace/format";

export function CreatorSelectionModal({
  creator,
  locale,
  copy,
  onBack,
  onClose,
}: {
  creator: CreatorListItem;
  locale: string;
  copy: MarketplaceCopy;
  onBack: () => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const price = formatEuro(creator.price_per_post, locale);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  function continueBooking() {
    try {
      sessionStorage.setItem(
        "naano.booking.creator",
        JSON.stringify({
          id: creator.id,
          slug: creator.slug,
          name: creator.name,
          price_per_post: creator.price_per_post,
        }),
      );
    } catch {
      /* ignore quota */
    }
    onClose();
    window.location.hash = "campaign-new";
  }

  if (!mounted) {
    return null;
  }

  return createPortal(
    <div className="overlay open" id="modal-negotiation" onClick={onClose}>
      <div
        className="modal"
        id="modal-negotiation-body"
        role="dialog"
        aria-modal="true"
        aria-labelledby="nn-offer-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="nn-offer-head nn-product-choice-head">
          <button type="button" className="nn-product-back" onClick={onBack} aria-label={copy.back}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span>{copy.back}</span>
          </button>
          <h2 id="nn-offer-title">{copy.selectionTitle}</h2>
          <button type="button" onClick={onClose} aria-label={copy.close}>
            ✕
          </button>
        </div>
        <div className="nn-pack-choice">
          <div className="nn-pack-product">
            <span className="nn-pack-product-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 3h8l4 4v14H7z" />
                <path d="M15 3v5h4M10 12h6M10 16h6" />
              </svg>
            </span>
            <div>
              <small>{copy.creatorRate}</small>
              <h3>{copy.singlePost}</h3>
            </div>
            <div className="nn-pack-price">
              <b>{price}</b>
              <span>{copy.standardRate}</span>
            </div>
          </div>
          <p>{copy.selectionBody}</p>
          <div className="nn-pack-actions">
            <button type="button" className="nn-pack-negotiate" onClick={continueBooking}>
              ↔ {copy.negotiate}
            </button>
            <button type="button" className="nn-pack-book" onClick={continueBooking}>
              {fill(copy.bookPrice, { price })}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
