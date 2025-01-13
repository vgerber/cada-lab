import { registeredSketches } from "../../components/sketches/registered_sketches";

type AppPageProps = {
  params: {
    slug: string[];
  };
};

export default function AppPage({ params }: AppPageProps) {
  const sketchId = params.slug.join("/");

  const sketchGroup = Object.keys(registeredSketches).find((basePath) =>
    sketchId.startsWith(basePath),
  );

  if (!sketchGroup) {
    return null;
  }

  const sketchPath = Object.keys(
    registeredSketches[sketchGroup].registrations,
  ).find((sketchPath) => `${sketchGroup}/${sketchPath}` === sketchId);
  if (!sketchPath) {
    return null;
  }

  const sketch = registeredSketches[sketchGroup].registrations[sketchPath];

  return sketch.component;
}

type ParamsT = {
  params: {
    sketchId: string;
  };
};

export async function generateStaticParams() {
  const paths = Object.keys(registeredSketches).flatMap((basePath) =>
    Object.keys(registeredSketches[basePath].registrations).map((sketchPath) =>
      `${basePath}/${sketchPath}`.split("/"),
    ),
  );

  console.log(paths);
  return paths.map((path) => ({
    slug: path,
  }));
}
