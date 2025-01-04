import ShapePage from "../../components/drawing/shape/page";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Sketch } from "../../lib/drawing/sketch/sketch";
import { SubTopic } from "../../lib/routing/sub_topic";
import styles from "./index.module.scss";


export default function Shape() {
    return (
        <ShapePage sketch={new Sketch([])} />
    )
}