import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyProfilePage from "./MyProfilePage";
import getTokenFromServer from "@/lib/getTokenFromServer";

const Profile = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/login");

  const email = session.user.email;

  const token = await getTokenFromServer();

  const [res1, res2] = await Promise.all([
    fetch(`http://localhost:5000/my-events/${encodeURIComponent(email)}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    fetch(`http://localhost:5000/my-joined-events/${encodeURIComponent(email)}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);

  const manageEvents = await res1.json();
  const joinedEvents = await res2.json();

  return (
    <MyProfilePage
      manageEvents={manageEvents}
      joinedEvents={joinedEvents}
    />
  );
};

export default Profile;