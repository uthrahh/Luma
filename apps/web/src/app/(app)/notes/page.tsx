import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { NotesClient } from "./NotesClient";

export default async function NotesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/");

  return <NotesClient userId={user.id} />;
}
