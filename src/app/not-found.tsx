import { redirect } from "next/navigation";

export default function NotFound() {
  redirect(`/explorer/${process.env.NEXT_PUBLIC_DEFAULT_SKETCH_PATH!}`);
}
