import { registeredSketches } from "../../components/sketches/registered_sketches";

type AppPageProps = {
  params: {
    slug: string[];
  };
};

export default function AppPage({ params }: AppPageProps) {
  console.log("slug", params.slug);

  const sketchId = params.slug.join("/");

  const sketchGroup = Object.keys(registeredSketches).find((basePath) =>
    sketchId.startsWith(basePath),
  );

  if (!sketchGroup) {
    return null;
  }

  const sketchPath = Object.keys(
    registeredSketches[sketchGroup].registrations,
  ).find((sketchPath) => `${sketchGroup}/${sketchPath}`);
  if (!sketchPath) {
    return null;
  }

  const sketch = registeredSketches[sketchGroup].registrations[sketchPath];
  console.log(sketch);

  return sketch.component;
}

type ParamsT = {
  params: {
    sketchId: string;
  };
};

// // This function gets called at build time
// export async function getStaticPaths() {
//   // Get the paths we want to pre-render based on posts
//   const paths = Object.keys(registeredSketches).flatMap((basePath) =>
//     Object.keys(registeredSketches[basePath]).map((sketchPath) => ({
//       params: { sketchId: `${basePath}/${sketchPath}` },
//     })),
//   ) as ParamsT[];

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// export async function getStaticProps({
//   params,
// }: {
//   params: ParamsT["params"];
// }) {
//   // Pass post data to the page via props
//   return { props: { sketchId: params.sketchId } as AppPageProps };
// }

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
