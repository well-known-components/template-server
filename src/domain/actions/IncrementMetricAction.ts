import { InjectByName } from "jeringa";
import { AppComponents } from "../../types";


export class IncrementMetricAction {
  constructor(
    @InjectByName('components') readonly components: AppComponents
  ) { }

  run(url: URL) {
    this.components.metrics.increment("test_ping_counter", {
      pathname: url.pathname
    })
  }
}
