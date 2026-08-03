import type { ImageSlot as ImageSlotData } from "@/data/site";
import { ImageSlot } from "@/components/image-slot";

type EditableImageProps = {
  /** Image-slot path, e.g. "project.study-deck.cover". Kept for call-site
   * parity with the dev-only editable component; unused here. */
  path: string;
  image: ImageSlotData;
  priority?: boolean;
  sizes?: string;
};

/**
 * Static, read-only render of an image slot. The in-browser edit mode
 * (upload dropzone + Server Actions) only exists on the `main` branch, which
 * runs under `next dev` / Vercel — this branch builds a static export for
 * HostGator, where Server Actions can't run, so this is exactly an ImageSlot.
 */
export function EditableImage({ image, priority, sizes }: EditableImageProps) {
  return <ImageSlot image={image} priority={priority} sizes={sizes} />;
}
