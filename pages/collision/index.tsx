import ShapePage from "../../components/drawing/shape/page";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import { Sketch } from "../../lib/drawing/sketch/sketch";
import { SubTopic } from "../../lib/routing/sub_topic";
import styles from "./line.module.scss";


export default function Collision() {
    return (
        <ShapePage sketch={new Sketch([])} />
    )
}