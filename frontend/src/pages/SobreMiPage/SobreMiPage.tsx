import type { SobreMi } from "@types";

import CEO from "./CEO";
import Filosofia from "./Filosofia";

type Props = {
  sobreMi: SobreMi;
};

export default function SobreMiPage({ sobreMi }: Props) {
  return (
    <main>
      <CEO sobreMi={sobreMi} />
      <Filosofia sobreMi={sobreMi} />
    </main>
  );
}
