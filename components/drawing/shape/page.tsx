import { getTopics } from "../../../lib/drawing/shape/util";
import { Sketch } from "../../../lib/drawing/sketch/sketch";
import { SubTopic } from "../../../lib/routing/sub_topic";
import Navbar from "../../navbar";
import Sidebar from "../../sidebar";
import styles from "./page.module.scss";

export default function ShapePage({ sketch }: { sketch: Sketch }) {
  return (
    <>
      <div className={styles.grid_layout}>
        <div className={styles.navbar}>
          <Navbar />
        </div>
        <div className={styles.sidebar}>
          <Sidebar rootSubTopic={getTopics()} />
        </div>
        <div className={styles.body}></div>
      </div>
      <style>
        {`
                    html, body {
                        margin: 0px;
                        height: 100%;
                    }
                    #__next {
                        height: 100%;
                    }
                `}
      </style>
    </>
  );
}
