import { useEffect } from "react";
import { supabase } from "./supabaseClient";
import TodoApp from "./TodoApp";

export default function Account({ session }) {
  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      const user = supabase.auth.user();

      let { error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Signed in with</label>
        <input id="email" type="text" value={session.user.email} disabled />
      </div>

      <div>
        <button
          className="button block"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </button>
      </div>
      <TodoApp />
    </div>
  );
}
