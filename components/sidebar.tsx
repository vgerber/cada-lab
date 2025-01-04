import { SubTopic } from "../lib/routing/sub_topic";
import SubTopicElement from "./routing/sub_topic_element";
import styles from "./sidebar.module.scss";

export default function Sidebar({ rootSubTopic }: { rootSubTopic: SubTopic }) {
    return (
        <div className={styles.sidebar}>
            <ul className={styles.topic}>
                <SubTopicElement subTopic={rootSubTopic} />
            </ul>
        </div>
    )
}