import Link from "next/link";
import { SubTopic } from "../../lib/routing/sub_topic";


export default function SubTopicElement({ subTopic }: { subTopic: SubTopic }) {
    return (
        <li key={`${subTopic.getHref()}_${subTopic.name}_li`}>
            <Link href={subTopic.getHref()} key={`${subTopic.getHref()}_${subTopic.name}`}>
                <a>{subTopic.name}</a>
            </Link>
            {subTopic.subTopics.length > 0 &&
                <ul key={`${subTopic.getHref()}_${subTopic.name}_ul`}>
                    {subTopic.subTopics.map(st => <SubTopicElement key={`${st.getHref()}_${st.name}_li`} subTopic={st} />)}
                </ul>
            }
        </li>

    )
}