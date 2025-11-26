import { useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { useGitHub } from "../context/GithubContext";
import {
  WHATSAPP_STATUS_WIDTH,
  WHATSAPP_STATUS_HEIGHT,
  DOWNLOAD_PADDING,
  ORIGINAL_CONTENT_WIDTH,
  DOWNLOAD_SCALE_FACTOR,
  DOWNLOAD_QUALITY,
  DOWNLOAD_CANVAS_SCALE,
} from "../constants/ui";

interface UseDownloadEndnoteReturn {
  download: () => Promise<void>;
  isDownloading: boolean;
}

/**
 * Prepares a cloned element for screenshot capture
 */
function prepareCloneForCapture(clone: HTMLElement): void {
  // Set clone dimensions and use transform scale
  clone.style.width = `${ORIGINAL_CONTENT_WIDTH}px`;
  clone.style.height = "auto";
  clone.style.padding = "2.5rem";
  clone.style.justifyContent = "center";
  clone.style.gap = "1.5rem";
  clone.style.transform = `scale(${DOWNLOAD_SCALE_FACTOR})`;
  clone.style.transformOrigin = "center center";

  // Show signature
  const signature = clone.querySelector(
    "[data-signature='true']"
  ) as HTMLElement;
  if (signature) {
    signature.style.display = "flex";
  }

  // Hide download button if exists
  const downloadButton = clone.querySelector(
    "[data-download-button='true']"
  ) as HTMLElement;
  if (downloadButton) {
    downloadButton.style.display = "none";
  }

  // Remove margins
  const topMargin = clone.querySelector(
    "[data-top-margin='true']"
  ) as HTMLElement;
  const bottomMargin = clone.querySelector(
    "[data-bottom-margin='true']"
  ) as HTMLElement;
  if (topMargin) topMargin.style.marginTop = "0";
  if (bottomMargin) bottomMargin.style.marginBottom = "0";

  // Set CORS for images
  const images = clone.querySelectorAll("img");
  images.forEach((img) => {
    img.crossOrigin = "anonymous";
  });
}

/**
 * Creates a wrapper container for the screenshot
 */
function createScreenshotWrapper(): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.style.position = "fixed";
  wrapper.style.left = "-9999px";
  wrapper.style.top = "0";
  wrapper.style.width = `${WHATSAPP_STATUS_WIDTH}px`;
  wrapper.style.height = `${WHATSAPP_STATUS_HEIGHT}px`;
  wrapper.style.backgroundColor = "#000000";
  wrapper.style.display = "flex";
  wrapper.style.justifyContent = "center";
  wrapper.style.alignItems = "center";
  wrapper.style.padding = `${DOWNLOAD_PADDING}px`;
  wrapper.style.boxSizing = "border-box";
  wrapper.style.overflow = "hidden";
  return wrapper;
}

/**
 * Waits for all images in an element to load
 */
async function waitForImages(element: HTMLElement): Promise<void> {
  const images = element.querySelectorAll("img");
  await Promise.all(
    Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
        setTimeout(resolve, 3000);
      });
    })
  );
}

/**
 * Waits for fonts to be ready
 */
async function waitForFonts(): Promise<void> {
  if (document.fonts && document.fonts.ready) {
    await document.fonts.ready;
  }
  // Small delay for rendering
  await new Promise((resolve) => setTimeout(resolve, 200));
}

/**
 * Generates and downloads the image
 */
async function captureAndDownload(
  wrapper: HTMLElement,
  userId: string
): Promise<void> {
  const canvas = await html2canvas(wrapper, {
    width: WHATSAPP_STATUS_WIDTH,
    height: WHATSAPP_STATUS_HEIGHT,
    scale: DOWNLOAD_CANVAS_SCALE,
    backgroundColor: "#000000",
    useCORS: true,
    logging: false,
    allowTaint: false,
  });

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Failed to create blob"));
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        const year = new Date().getFullYear();
        link.download = `github-onwrap-${userId}-${year}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      },
      "image/jpeg",
      DOWNLOAD_QUALITY
    );
  });
}

/**
 * Cleans up the temporary wrapper element
 */
function cleanupWrapper(): void {
  const wrapper = document.querySelector(
    '[style*="position: fixed"][style*="-9999px"]'
  ) as HTMLElement;
  if (wrapper && wrapper.parentNode) {
    wrapper.parentNode.removeChild(wrapper);
  }
}

/**
 * Hook for downloading the EndNote slide as an image
 * Extracts the complex download logic from the component
 */
export function useDownloadEndnote(): UseDownloadEndnoteReturn {
  const [isDownloading, setIsDownloading] = useState(false);
  const { data } = useGitHub();

  const download = useCallback(async () => {
    // Find the EndNote content div
    const endNoteDiv = document.querySelector(
      "[data-endnote-content='true']"
    ) as HTMLElement;

    if (!endNoteDiv || isDownloading) return;

    setIsDownloading(true);
    let wrapper: HTMLElement | null = null;

    try {
      // Clone the element to avoid modifying the original
      const clone = endNoteDiv.cloneNode(true) as HTMLElement;

      // Create wrapper and prepare clone
      wrapper = createScreenshotWrapper();
      prepareCloneForCapture(clone);

      // Append clone to wrapper, then wrapper to body
      wrapper.appendChild(clone);
      document.body.appendChild(wrapper);

      // Wait for resources to load
      await waitForImages(clone);
      await waitForFonts();

      // Capture and download
      await captureAndDownload(wrapper, data?.userId || "wrap");
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Error generating image:", error);
      }
    } finally {
      // Clean up
      if (wrapper && wrapper.parentNode) {
        document.body.removeChild(wrapper);
      } else {
        cleanupWrapper();
      }
      setIsDownloading(false);
    }
  }, [data?.userId, isDownloading]);

  return { download, isDownloading };
}
