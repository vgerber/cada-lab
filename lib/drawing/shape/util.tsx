import { SubTopic } from "../../routing/sub_topic";


export function getTopics(): SubTopic {
    let shapeTopics = new SubTopic("Shape", "/shape", [
        new SubTopic("2D", "/2d", [
            new SubTopic("Line", "/line", []),
            new SubTopic("Circle", "/circle", []),
            new SubTopic("Rectangle", "/rect", []),
            new SubTopic("Triangle", "/triangle", []),
        ]),
        new SubTopic("3D", "/3d", [
            new SubTopic("Quad", "/quad", []),
            new SubTopic("Sphere", "/sphere", []),
            new SubTopic("Cylinder", "/cylinder", []),
            new SubTopic("Cone", "/cone", []),
        ]),
        new SubTopic("Catmull Rom Spline", "/catmull_rom_spline", [])
    ]);

    let collisionTopics = new SubTopic("Collision", "/collision", [
        new SubTopic("3D", "/3d", [
            new SubTopic("Line Point", "/line_point", []),
            new SubTopic("Mesh Offset", "/mesh_offset", []),
        ])
    ]);

    let rootTopic = new SubTopic("Algorithms", "", [shapeTopics, collisionTopics]);

    rootTopic.updateHrefBase();
    return rootTopic;
}