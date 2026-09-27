import type { EnvironmentScene } from "@luma/types";
import type { TimeOfDay } from "@luma/utils";
import { BeachScene } from "@/components/environment/scenes/BeachScene";
import { SpaceScene } from "@/components/environment/scenes/SpaceScene";
import { RainforestScene } from "@/components/environment/scenes/RainforestScene";
import { CityScene } from "@/components/environment/scenes/CityScene";
import { FieldsScene } from "@/components/environment/scenes/FieldsScene";

const SCENES = {
  beach: BeachScene,
  space: SpaceScene,
  rainforest: RainforestScene,
  city: CityScene,
  fields: FieldsScene,
};

/**
 * A contained (non-fullscreen) render of a live environment scene, for
 * showing the real product art on the marketing site instead of a static
 * screenshot — same components the app itself uses behind the UI.
 */
export function EnvironmentPreview({
  scene,
  timeOfDay,
  className,
  reducedMotion = false,
}: {
  scene: EnvironmentScene;
  timeOfDay: TimeOfDay;
  className?: string;
  /** Small decorative thumbnails don't need live animation — set true to
   * render a single still frame instead of paying for N simultaneous
   * animated scenes on one page. */
  reducedMotion?: boolean;
}) {
  const Scene = SCENES[scene];
  return (
    <div className={className} aria-hidden="true">
      <Scene timeOfDay={timeOfDay} weather={{ rainIntensity: 0.3, cloudCover: 0.3 }} reducedMotion={reducedMotion} />
    </div>
  );
}
